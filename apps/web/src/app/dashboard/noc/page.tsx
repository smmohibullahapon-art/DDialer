'use client';

import React, { useState } from 'react';
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
  Clock,
  Radio,
  Sliders,
  Layers,
  Zap,
  TrendingUp,
  Terminal,
  Database,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface ClusterNode {
  id: string;
  name: string;
  role: 'KAMAILIO_SBC' | 'FREESWITCH_MEDIA' | 'RTP_ENGINE' | 'POSTGRES_CORE' | 'REDIS_CLUSTER' | 'AI_WHISPER';
  ipAddress: string;
  region: string;
  cpuUsage: number;
  ramUsage: number;
  activeSessions: number;
  maxCapacity: number;
  uptime: string;
  status: 'OPTIMAL' | 'DEGRADED' | 'STANDBY';
  pingMs: number;
}

interface NOCIncident {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  node: string;
  details: string;
  timestamp: string;
  acknowledged: boolean;
}

const INITIAL_NODES: ClusterNode[] = [
  {
    id: 'node-sbc-01',
    name: 'DHK-SBC-01 (Kamailio Core Primary)',
    role: 'KAMAILIO_SBC',
    ipAddress: '103.145.118.20',
    region: 'Dhaka (BDIX Core)',
    cpuUsage: 28,
    ramUsage: 42,
    activeSessions: 84,
    maxCapacity: 500,
    uptime: '48d 14h',
    status: 'OPTIMAL',
    pingMs: 4,
  },
  {
    id: 'node-sbc-02',
    name: 'DHK-SBC-02 (Kamailio Standby / Failover)',
    role: 'KAMAILIO_SBC',
    ipAddress: '103.145.118.21',
    region: 'Dhaka (BDIX Core)',
    cpuUsage: 8,
    ramUsage: 24,
    activeSessions: 0,
    maxCapacity: 500,
    uptime: '48d 14h',
    status: 'STANDBY',
    pingMs: 4,
  },
  {
    id: 'node-fs-01',
    name: 'FS-MEDIA-01 (FreeSWITCH ACD & IVR)',
    role: 'FREESWITCH_MEDIA',
    ipAddress: '103.145.118.25',
    region: 'Dhaka Zone A',
    cpuUsage: 44,
    ramUsage: 61,
    activeSessions: 48,
    maxCapacity: 200,
    uptime: '19d 08h',
    status: 'OPTIMAL',
    pingMs: 6,
  },
  {
    id: 'node-rtp-01',
    name: 'RTPENGINE-01 (Kernel Media Proxy)',
    role: 'RTP_ENGINE',
    ipAddress: '103.145.118.28',
    region: 'Dhaka Zone A',
    cpuUsage: 18,
    ramUsage: 32,
    activeSessions: 72,
    maxCapacity: 1000,
    uptime: '48d 14h',
    status: 'OPTIMAL',
    pingMs: 3,
  },
  {
    id: 'node-db-01',
    name: 'PG-TELECOM-01 (PostgreSQL Master CDR)',
    role: 'POSTGRES_CORE',
    ipAddress: '10.0.12.10',
    region: 'Internal Private VPC',
    cpuUsage: 36,
    ramUsage: 68,
    activeSessions: 142,
    maxCapacity: 1000,
    uptime: '92d 02h',
    status: 'OPTIMAL',
    pingMs: 1,
  },
  {
    id: 'node-ai-01',
    name: 'WHISPER-GPU-01 (AI Diarization Engine)',
    role: 'AI_WHISPER',
    ipAddress: '10.0.12.44',
    region: 'Internal GPU Cluster',
    cpuUsage: 62,
    ramUsage: 78,
    activeSessions: 14,
    maxCapacity: 40,
    uptime: '12d 06h',
    status: 'OPTIMAL',
    pingMs: 2,
  },
];

const INITIAL_INCIDENTS: NOCIncident[] = [
  {
    id: 'inc-901',
    severity: 'WARNING',
    title: 'Upstream Jitter Spike Detected on AmberIT Route',
    node: 'DHK-SBC-01',
    details: 'Packet delay variation exceeded 22ms on carrier interconnect. Smart LCR rerouted non-urgent calls to BTCL.',
    timestamp: 'Today 03:14 AM',
    acknowledged: true,
  },
  {
    id: 'inc-902',
    severity: 'INFO',
    title: 'Automated Database Vacuum Completed',
    node: 'PG-TELECOM-01',
    details: 'Daily indexing and CDR partitioning completed in 4.2 seconds with zero lockups.',
    timestamp: 'Today 02:00 AM',
    acknowledged: true,
  },
];

export default function NOCMonitoringPage() {
  const [nodes, setNodes] = useState<ClusterNode[]>(INITIAL_NODES);
  const [incidents, setIncidents] = useState<NOCIncident[]>(INITIAL_INCIDENTS);
  const [activeTab, setActiveTab] = useState<'NODES' | 'INCIDENTS' | 'METRICS'>('NODES');
  const [refreshNotice, setRefreshNotice] = useState<string | null>(null);

  const handleRefresh = () => {
    setRefreshNotice('All cluster nodes polled via Kamailio RPC & FreeSWITCH ESL (RTT < 5ms).');
    setTimeout(() => setRefreshNotice(null), 3000);
  };

  const acknowledgeIncident = (id: string) => {
    setIncidents(
      incidents.map((inc) => (inc.id === id ? { ...inc, acknowledged: true } : inc))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>NOC Monitoring &amp; System Health</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              Cluster 99.98% SLA
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Real-time Kamailio SBC signaling, FreeSWITCH RTP proxies, database clusters, and carrier telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Poll Telemetry</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
            <span>BDIX Interconnect Live</span>
          </div>
        </div>
      </div>

      {/* Telemetry Refresh Feedback Banner */}
      {refreshNotice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{refreshNotice}</span>
          </div>
          <button onClick={() => setRefreshNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Cluster Status</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">All Green</h3>
            <span className="text-[11px] text-[#00ff88]">6/6 Nodes Healthy</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Concurrent RTP Sessions</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {nodes.reduce((acc, n) => acc + n.activeSessions, 0)} Streams
            </h3>
            <span className="text-[11px] text-[#8a99ad]">Cap: 2,740</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Internal Bus Latency</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">2.8 ms</h3>
            <span className="text-[11px] text-[#00ff88]">Zero Packet Loss</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Failover State</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">Automated</h3>
            <span className="text-[11px] text-[#00d2ff]">Keepalived VRRP Active</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('NODES')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'NODES'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Cluster Infrastructure Nodes ({nodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('INCIDENTS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'INCIDENTS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Telemetry Alarms &amp; Incidents ({incidents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('METRICS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'METRICS'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>SBC Signaling &amp; ESL Engine Telemetry</span>
        </button>
      </div>

      {/* View 1: Nodes Grid */}
      {activeTab === 'NODES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{node.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 inline-block mt-1">
                      {node.role}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      node.status === 'OPTIMAL'
                        ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1 animate-pulse"></span>
                    {node.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/90">{node.ipAddress}</span>
                  <span className="text-[#8a99ad]">{node.region}</span>
                </div>

                {/* Resource Sliders */}
                <div className="space-y-2 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-[#8a99ad]">CPU Load</span>
                      <span className="text-white font-bold">{node.cpuUsage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full ${
                          node.cpuUsage > 75 ? 'bg-rose-500' : node.cpuUsage > 50 ? 'bg-amber-400' : 'bg-[#00ff88]'
                        }`}
                        style={{ width: `${node.cpuUsage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-[#8a99ad]">RAM Memory</span>
                      <span className="text-white font-bold">{node.ramUsage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00d2ff] to-[#9d4edd]"
                        style={{ width: `${node.ramUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-[11px] font-mono">
                <div>
                  <span className="text-[#8a99ad] block">Sessions</span>
                  <span className="text-white font-bold">{node.activeSessions}</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">RTT Ping</span>
                  <span className="text-[#00ff88] font-bold">{node.pingMs} ms</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">Uptime</span>
                  <span className="text-[#00d2ff] font-bold">{node.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Incidents List */}
      {activeTab === 'INCIDENTS' && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">NOC Alarm Feed &amp; Incident Log</h3>
            <span className="text-xs text-[#8a99ad] font-mono">Auto-Triage Active</span>
          </div>

          <div className="divide-y divide-white/5 text-xs">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : inc.severity === 'WARNING'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/30'
                      }`}
                    >
                      {inc.severity}
                    </span>
                    <h4 className="text-xs font-bold text-white">{inc.title}</h4>
                    <span className="text-[10px] font-mono text-[#8a99ad]">({inc.node})</span>
                  </div>
                  <p className="text-xs text-[#8a99ad]">{inc.details}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                  <span className="text-[#8a99ad]">{inc.timestamp}</span>
                  {inc.acknowledged ? (
                    <span className="text-[#00ff88] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Acknowledged
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeIncident(inc.id)}
                      className="px-2.5 py-1 rounded bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 hover:bg-[#00d2ff]/30 transition text-[11px]"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Signaling & ESL Telemetry */}
      {activeTab === 'METRICS' && (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Kamailio RPC &amp; FreeSWITCH ESL Core Diagnostics</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Real-time internal protocol sockets for signaling orchestration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#070913] border border-white/10 font-mono text-xs space-y-2">
              <span className="text-[#00d2ff] font-bold block">// Kamailio JSON-RPC Diagnostics</span>
              <pre className="text-[11px] text-white/90 leading-relaxed overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "result": {
    "core.uptime": "48d 14h 22m",
    "sl.replied_total": 482910,
    "tm.active_transactions": 28,
    "rtpengine.active_streams": 72,
    "kamailio.memory_free_bytes": 1073741824
  }
}`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-[#070913] border border-white/10 font-mono text-xs space-y-2">
              <span className="text-[#00ff88] font-bold block">// FreeSWITCH ESL Socket Heartbeat</span>
              <pre className="text-[11px] text-white/90 leading-relaxed overflow-x-auto">
{`Event-Name: HEARTBEAT
Core-UUID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
FreeSWITCH-Version: 1.10.10
Uptime-msec: 1670400000
Session-Count: 48
Max-Sessions: 200
Session-Per-Sec: 14.5
Idle-CPU: 56.0%`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}