'use client';

import React, { useState } from 'react';
import {
  Network,
  Radio,
  Server,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Clock,
  Layers,
  Search,
  Filter,
  Route,
  Percent,
  Check
} from 'lucide-react';

interface CarrierGateway {
  id: string;
  name: string;
  carrierType: 'TIER1_SBC' | 'NATIONAL_IPTSP' | 'SMPP_SMS';
  host: string;
  port: number;
  protocol: 'UDP' | 'TLS' | 'TCP';
  activeChannels: number;
  capacityLimit: number;
  cpsCurrent: number;
  cpsMax: number;
  asr: number;
  latencyMs: number;
  priority: number;
  failoverGateway: string;
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
}

interface LCRRule {
  id: string;
  destinationPrefix: string;
  destinationName: string;
  primaryGateway: string;
  secondaryGateway: string;
  pulseRate: string;
  costRateBDT: number;
  algorithm: 'LEAST_COST' | 'QUALITY_MOS' | 'ROUND_ROBIN';
  status: 'ACTIVE' | 'DISABLED';
}

const INITIAL_GATEWAYS: CarrierGateway[] = [
  {
    id: 'gw-btcl',
    name: 'BTCL National Wholesale Gateway',
    carrierType: 'TIER1_SBC',
    host: 'sbc01.national.btcl.gov.bd',
    port: 5060,
    protocol: 'UDP',
    activeChannels: 48,
    capacityLimit: 120,
    cpsCurrent: 14.2,
    cpsMax: 30,
    asr: 86.8,
    latencyMs: 12,
    priority: 1,
    failoverGateway: 'AmberIT Enterprise Gateway',
    status: 'ONLINE',
  },
  {
    id: 'gw-amber',
    name: 'AmberIT Enterprise Gateway',
    carrierType: 'NATIONAL_IPTSP',
    host: 'sbc-core.amberit.com.bd',
    port: 5060,
    protocol: 'UDP',
    activeChannels: 24,
    capacityLimit: 80,
    cpsCurrent: 8.4,
    cpsMax: 20,
    asr: 83.5,
    latencyMs: 16,
    priority: 2,
    failoverGateway: 'BracNet Core Interconnect',
    status: 'ONLINE',
  },
  {
    id: 'gw-bracnet',
    name: 'BracNet Core Interconnect',
    carrierType: 'NATIONAL_IPTSP',
    host: 'sip.bracnet.net',
    port: 5060,
    protocol: 'UDP',
    activeChannels: 6,
    capacityLimit: 50,
    cpsCurrent: 2.1,
    cpsMax: 15,
    asr: 79.2,
    latencyMs: 24,
    priority: 3,
    failoverGateway: 'None',
    status: 'STANDBY',
  },
  {
    id: 'gw-smpp',
    name: 'GP / Robi Direct SMPP Gateway',
    carrierType: 'SMPP_SMS',
    host: 'smpp.national-aggregator.bd',
    port: 2775,
    protocol: 'TCP',
    activeChannels: 85,
    capacityLimit: 250,
    cpsCurrent: 45.0,
    cpsMax: 100,
    asr: 99.4,
    latencyMs: 6,
    priority: 1,
    failoverGateway: 'Teletalk SMPP Backup',
    status: 'ONLINE',
  },
];

const INITIAL_LCR: LCRRule[] = [
  {
    id: 'lcr-1',
    destinationPrefix: '88017 / 88013 (GP)',
    destinationName: 'Grameenphone Mobile Route',
    primaryGateway: 'BTCL National Wholesale Gateway',
    secondaryGateway: 'AmberIT Enterprise Gateway',
    pulseRate: '1-Sec Pulse',
    costRateBDT: 0.42,
    algorithm: 'QUALITY_MOS',
    status: 'ACTIVE',
  },
  {
    id: 'lcr-2',
    destinationPrefix: '88018 / 88016 (Robi/Airtel)',
    destinationName: 'Robi Axiata Route',
    primaryGateway: 'AmberIT Enterprise Gateway',
    secondaryGateway: 'BTCL National Wholesale Gateway',
    pulseRate: '1-Sec Pulse',
    costRateBDT: 0.40,
    algorithm: 'LEAST_COST',
    status: 'ACTIVE',
  },
  {
    id: 'lcr-3',
    destinationPrefix: '88019 / 88014 (Banglalink)',
    destinationName: 'Banglalink Mobile Route',
    primaryGateway: 'BTCL National Wholesale Gateway',
    secondaryGateway: 'BracNet Core Interconnect',
    pulseRate: '1-Sec Pulse',
    costRateBDT: 0.41,
    algorithm: 'LEAST_COST',
    status: 'ACTIVE',
  },
  {
    id: 'lcr-4',
    destinationPrefix: '88096 (National IPTSP)',
    destinationName: 'Inter-IPTSP Peering',
    primaryGateway: 'AmberIT Enterprise Gateway',
    secondaryGateway: 'BTCL National Wholesale Gateway',
    pulseRate: '1-Sec Pulse',
    costRateBDT: 0.35,
    algorithm: 'QUALITY_MOS',
    status: 'ACTIVE',
  },
];

export default function CarrierGatewaysPage() {
  const [gateways, setGateways] = useState<CarrierGateway[]>(INITIAL_GATEWAYS);
  const [lcrRules, setLcrRules] = useState<LCRRule[]>(INITIAL_LCR);
  const [activeTab, setActiveTab] = useState<'GATEWAYS' | 'LCR_ROUTING'>('GATEWAYS');
  const [pingNotice, setPingNotice] = useState<string | null>(null);

  const handlePing = (gwName: string) => {
    setPingNotice(`SIP OPTIONS ping dispatched to ${gwName} (Response: 200 OK, RTT: 14ms).`);
    setTimeout(() => setPingNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Carrier Gateways &amp; LCR Engine</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              BDIX Tier-1 Interconnect
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Dynamic Least-Cost-Routing (LCR), carrier SBC session border controllers, and SIP OPTIONS health checks.
          </p>
        </div>

        <button
          onClick={() => alert('New Gateway Provisioning wizard initiated.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Provision Carrier SBC</span>
        </button>
      </div>

      {/* Ping Feedback Banner */}
      {pingNotice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{pingNotice}</span>
          </div>
          <button onClick={() => setPingNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Gateways Online</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              {gateways.filter((g) => g.status === 'ONLINE').length} / {gateways.length}
            </h3>
            <span className="text-[11px] text-[#00ff88]">All BDIX Peered</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Active CPS</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {gateways.reduce((acc, g) => acc + g.cpsCurrent, 0).toFixed(1)} CPS
            </h3>
            <span className="text-[11px] text-[#8a99ad]">Cap: 165 CPS</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average Carrier ASR</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">87.2%</h3>
            <span className="text-[11px] text-[#00ff88]">High Quality</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">LCR Auto Failover</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">Enabled</h3>
            <span className="text-[11px] text-[#00d2ff]">Sub-50ms Reroute</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('GATEWAYS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'GATEWAYS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Configured Gateways ({gateways.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('LCR_ROUTING')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'LCR_ROUTING'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Route className="w-4 h-4" />
          <span>Dynamic LCR Prefix Routing Rules ({lcrRules.length})</span>
        </button>
      </div>

      {/* View 1: Gateways Grid */}
      {activeTab === 'GATEWAYS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gateways.map((gw) => (
            <div
              key={gw.id}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{gw.name}</span>
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 inline-block mt-1">
                      {gw.carrierType} • Priority {gw.priority}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      gw.status === 'ONLINE'
                        ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1 animate-pulse"></span>
                    {gw.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/90 truncate">
                    {gw.host}:{gw.port} ({gw.protocol})
                  </span>
                  <button
                    onClick={() => handlePing(gw.name)}
                    className="text-[#00d2ff] hover:underline text-[11px] ml-2 shrink-0 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Ping</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#8a99ad]">Channel Load</span>
                    <span className="text-white font-bold">
                      {gw.activeChannels} / {gw.capacityLimit} ({Math.round((gw.activeChannels / gw.capacityLimit) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88]"
                      style={{ width: `${(gw.activeChannels / gw.capacityLimit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-[11px] font-mono">
                <div>
                  <span className="text-[#8a99ad] block">Current CPS</span>
                  <span className="text-white font-bold">{gw.cpsCurrent} / {gw.cpsMax}</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">ASR Score</span>
                  <span className="text-[#00ff88] font-bold">{gw.asr}%</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">BDIX Ping</span>
                  <span className="text-[#00d2ff] font-bold">{gw.latencyMs} ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: LCR Prefix Rules */}
      {activeTab === 'LCR_ROUTING' && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Dynamic Least-Cost-Routing (LCR) Rules</h3>
              <p className="text-xs text-[#8a99ad] mt-0.5">Automated BTRC rate card matching and real-time carrier switching.</p>
            </div>
            <button
              onClick={() => alert('Add LCR Rule dialog initialized.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Prefix Rule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#8a99ad]">
              <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
                <tr>
                  <th className="py-3.5 px-4">Destination Prefix</th>
                  <th className="py-3.5 px-4">Primary Route</th>
                  <th className="py-3.5 px-4">Failover Route</th>
                  <th className="py-3.5 px-4">Cost (BDT)</th>
                  <th className="py-3.5 px-4">Algorithm</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-mono">
                {lcrRules.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4">
                      <span className="font-bold text-white block">{r.destinationPrefix}</span>
                      <span className="text-[10px] text-[#8a99ad] font-sans">{r.destinationName}</span>
                    </td>
                    <td className="py-4 px-4 text-[#00d2ff] font-semibold">{r.primaryGateway}</td>
                    <td className="py-4 px-4 text-white/80">{r.secondaryGateway}</td>
                    <td className="py-4 px-4 font-bold text-[#00ff88]">
                      ৳ {r.costRateBDT.toFixed(2)}/min ({r.pulseRate})
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-white border border-white/10 text-[10px]">
                        {r.algorithm}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}