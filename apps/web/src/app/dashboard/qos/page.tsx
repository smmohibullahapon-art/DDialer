'use client';

import React, { useState } from 'react';
import {
  Activity,
  Radio,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Server,
  BarChart2
} from 'lucide-react';

interface QoSRecord {
  id: string;
  callId: string;
  codec: string;
  mosScore: number;
  packetLoss: number;
  jitterMs: number;
  rttMs: number;
  gateway: string;
  status: 'EXCELLENT' | 'GOOD' | 'POOR';
  timestamp: string;
}

const INITIAL_QOS: QoSRecord[] = [
  {
    id: 'qos-1',
    callId: 'call-901842',
    codec: 'Opus 48kHz',
    mosScore: 4.5,
    packetLoss: 0.1,
    jitterMs: 4,
    rttMs: 12,
    gateway: 'BTCL Wholesale National SBC',
    status: 'EXCELLENT',
    timestamp: 'Today 04:12 AM',
  },
  {
    id: 'qos-2',
    callId: 'call-901843',
    codec: 'G.711a (PCMA)',
    mosScore: 4.2,
    packetLoss: 0.4,
    jitterMs: 8,
    rttMs: 16,
    gateway: 'AmberIT Enterprise Gateway',
    status: 'GOOD',
    timestamp: 'Today 04:10 AM',
  },
  {
    id: 'qos-3',
    callId: 'call-901844',
    codec: 'G.729',
    mosScore: 3.4,
    packetLoss: 2.1,
    jitterMs: 24,
    rttMs: 55,
    gateway: 'BracNet Core Interconnect',
    status: 'POOR',
    timestamp: 'Today 03:55 AM',
  },
];

export default function QoSAnalyticsPage() {
  const [qosRecords, setQosRecords] = useState<QoSRecord[]>(INITIAL_QOS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Quality of Service (QoS) &amp; MOS Analytics</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              RTCP Telemetry Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Monitor voice call quality metrics, Mean Opinion Score (MOS), packet jitter, and network latency across trunks.
          </p>
        </div>
      </div>

      {/* Top QoS KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average MOS Score</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">4.38 / 5.0</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">High Voice Clarity</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average Packet Loss</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">0.25%</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">BDIX Optimized Network</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average Jitter</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">6.4 ms</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Sub-10ms Target</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Network RTT Latency</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">14.2 ms</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Direct Interconnect</span>
        </div>
      </div>

      {/* QoS Records Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Recent Call QoS Telemetry Log</h3>
          <span className="text-xs text-[#8a99ad] font-mono">RTCP Stream Analysis</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Call ID</th>
                <th className="py-3.5 px-4">Codec</th>
                <th className="py-3.5 px-4">MOS Score</th>
                <th className="py-3.5 px-4">Packet Loss</th>
                <th className="py-3.5 px-4">Jitter</th>
                <th className="py-3.5 px-4">RTT Delay</th>
                <th className="py-3.5 px-4">Gateway</th>
                <th className="py-3.5 px-4 text-right">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {qosRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-[#00d2ff]">{rec.callId}</td>
                  <td className="py-4 px-4 text-white">{rec.codec}</td>
                  <td className="py-4 px-4 font-bold text-[#00ff88]">{rec.mosScore} / 5.0</td>
                  <td className="py-4 px-4 text-white/90">{rec.packetLoss}%</td>
                  <td className="py-4 px-4 text-white/90">{rec.jitterMs} ms</td>
                  <td className="py-4 px-4 text-white/90">{rec.rttMs} ms</td>
                  <td className="py-4 px-4 text-white/80">{rec.gateway}</td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        rec.status === 'EXCELLENT'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                          : rec.status === 'GOOD'
                          ? 'bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}