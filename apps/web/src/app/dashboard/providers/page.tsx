'use client';

import React, { useState } from 'react';
import {
  Server,
  Radio,
  ShieldCheck,
  Zap,
  Activity,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Settings2,
  Sliders,
  DollarSign,
  ArrowUpDown
} from 'lucide-react';

interface CarrierProvider {
  id: string;
  name: string;
  type: 'SIP_TRUNK' | 'SMS_SMPP' | 'DID_GATEWAY';
  endpoint: string;
  priority: number;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  latencyMs: number;
  channelsActive: number;
  channelLimit: number;
  costRate: string;
  failoverRoute: string;
}

const INITIAL_PROVIDERS: CarrierProvider[] = [
  {
    id: 'prv-1',
    name: 'BTCL Wholesale National Gateway',
    type: 'SIP_TRUNK',
    endpoint: 'sip.btcl.com.bd:5060',
    priority: 1,
    health: 'HEALTHY',
    latencyMs: 14,
    channelsActive: 24,
    channelLimit: 60,
    costRate: '৳ 0.28 / min',
    failoverRoute: 'AmberIT Enterprise SBC',
  },
  {
    id: 'prv-2',
    name: 'AmberIT Enterprise SBC',
    type: 'SIP_TRUNK',
    endpoint: 'sbc01.amberit.com.bd:5060',
    priority: 2,
    health: 'HEALTHY',
    latencyMs: 18,
    channelsActive: 12,
    channelLimit: 40,
    costRate: '৳ 0.32 / min',
    failoverRoute: 'BracNet Core',
  },
  {
    id: 'prv-3',
    name: 'Robi / GP Direct SMPP Gateway',
    type: 'SMS_SMPP',
    endpoint: 'smpp.carrierbd.net:2775',
    priority: 1,
    health: 'HEALTHY',
    latencyMs: 32,
    channelsActive: 180,
    channelLimit: 500,
    costRate: '৳ 0.22 / SMS',
    failoverRoute: 'Teletalk Aggregator',
  },
  {
    id: 'prv-4',
    name: 'BracNet IP Telephony Interconnect',
    type: 'DID_GATEWAY',
    endpoint: 'voice-gw.bracnet.net:5060',
    priority: 3,
    health: 'DEGRADED',
    latencyMs: 86,
    channelsActive: 2,
    channelLimit: 20,
    costRate: '৳ 0.35 / min',
    failoverRoute: 'BTCL Wholesale National Gateway',
  },
];

export default function ProviderManagementPage() {
  const [providers, setProviders] = useState<CarrierProvider[]>(INITIAL_PROVIDERS);
  const [routingAlgorithm, setRoutingAlgorithm] = useState<'LEAST_COST' | 'QUALITY_ASR' | 'ROUND_ROBIN'>('QUALITY_ASR');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Carriers & Provider Gateways</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Layer 4 Abstraction
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Upstream telecom carrier routing, SMPP links, and real-time trunk failovers.
          </p>
        </div>

        <button
          onClick={() => alert('Add carrier gateway dialog ready.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Upstream Carrier</span>
        </button>
      </div>

      {/* Smart Routing Configuration Bar */}
      <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#9d4edd]/10 border border-[#9d4edd]/30 text-[#9d4edd]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white uppercase tracking-wider block">Smart Routing Engine Policy</span>
            <span className="text-[#8a99ad]">Automatic failover triggered when jitter exceeds 50ms or ASR drops below 80%[cite: 5].</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8a99ad] uppercase font-bold text-[10px]">Algorithm:</span>
          <select
            value={routingAlgorithm}
            onChange={(e) => setRoutingAlgorithm(e.target.value as typeof routingAlgorithm)}
            className="bg-[#070913] border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none"
          >
            <option value="QUALITY_ASR">Highest ASR & Lowest Jitter (Quality)</option>
            <option value="LEAST_COST">Least Cost Routing (LCR / Margin)</option>
            <option value="ROUND_ROBIN">Even Round Robin Load Balancing</option>
          </select>
        </div>
      </div>

      {/* Carrier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {providers.map((p) => (
          <div key={p.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{p.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10">
                    Priority #{p.priority}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#8a99ad] mt-1">{p.endpoint}</p>
              </div>

              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  p.health === 'HEALTHY'
                    ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {p.health}
              </span>
            </div>

            {/* Carrier Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px]">
              <div>
                <span className="text-[#8a99ad] block">ICMP Latency</span>
                <span className="font-mono font-bold text-white">{p.latencyMs} ms</span>
              </div>
              <div>
                <span className="text-[#8a99ad] block">Channels In Use</span>
                <span className="font-mono font-bold text-[#00d2ff]">
                  {p.channelsActive} / {p.channelLimit}
                </span>
              </div>
              <div>
                <span className="text-[#8a99ad] block">Carrier Cost</span>
                <span className="font-mono font-bold text-[#00ff88]">{p.costRate}</span>
              </div>
            </div>

            {/* Failover Subtext */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5 text-[#8a99ad]">
              <span>Secondary Failover: <strong className="text-white">{p.failoverRoute}</strong></span>
              <button
                onClick={() => alert(`Ping test initiated to ${p.endpoint}...`)}
                className="hover:text-white transition underline"
              >
                Test Connectivity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}