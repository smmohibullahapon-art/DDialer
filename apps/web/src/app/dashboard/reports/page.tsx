'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PhoneCall,
  MessageSquare,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  ShieldCheck,
  Activity,
  CheckCircle2,
  DollarSign,
  Radio,
  Layers,
  Sparkles
} from 'lucide-react';

interface CarrierMetric {
  carrier: string;
  type: string;
  totalSessions: number;
  asrPercent: number;
  acdSec: number;
  pddMs: number;
  mosQuality: number;
  totalSpendBDT: number;
}

const CARRIER_PERFORMANCE: CarrierMetric[] = [
  {
    carrier: 'BTCL Wholesale National SBC',
    type: 'SIP Voice',
    totalSessions: 4210,
    asrPercent: 86.4,
    acdSec: 184,
    pddMs: 420,
    mosQuality: 4.4,
    totalSpendBDT: 1894.5,
  },
  {
    carrier: 'AmberIT Enterprise Gateway',
    type: 'SIP Voice',
    totalSessions: 2150,
    asrPercent: 83.1,
    acdSec: 142,
    pddMs: 490,
    mosQuality: 4.2,
    totalSpendBDT: 1120.0,
  },
  {
    carrier: 'Robi / GP Direct SMPP 3.4',
    type: 'Bulk SMS',
    totalSessions: 14820,
    asrPercent: 99.2,
    acdSec: 0,
    pddMs: 120,
    mosQuality: 4.8,
    totalSpendBDT: 6669.0,
  },
  {
    carrier: 'BracNet Core Interconnect',
    type: 'SIP Voice',
    totalSessions: 680,
    asrPercent: 78.5,
    acdSec: 110,
    pddMs: 640,
    mosQuality: 4.0,
    totalSpendBDT: 425.0,
  },
];

const HOURLY_TRAFFIC = [
  { hour: '00:00', calls: 14, sms: 120 },
  { hour: '03:00', calls: 8, sms: 45 },
  { hour: '06:00', calls: 24, sms: 210 },
  { hour: '09:00', calls: 142, sms: 1450 },
  { hour: '12:00', calls: 285, sms: 2890 },
  { hour: '15:00', calls: 320, sms: 3410 },
  { hour: '18:00', calls: 240, sms: 2100 },
  { hour: '21:00', calls: 110, sms: 980 },
];

export default function ReportsAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'TODAY' | '7D' | '30D' | 'CUSTOM'>('TODAY');
  const [carriers] = useState<CarrierMetric[]>(CARRIER_PERFORMANCE);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Reports, Analytics & CDR Telemetry</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              BI Intelligence Core
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Aggregated telecom metrics, ASR/ACD ratios, network latency, and carrier rating reports.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            {(['TODAY', '7D', '30D'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg font-mono font-medium transition ${
                  timeRange === t
                    ? 'bg-[#00d2ff] text-[#070913] font-bold shadow'
                    : 'text-[#8a99ad] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Generating PDF Executive Report...')}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Answer-Seizure Ratio</span>
            <span className="flex items-center text-[#00ff88] text-xs font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.4%
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-white font-mono">84.2%</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block">Global Industry Target &gt; 75%</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Avg Call Duration (ACD)</span>
            <span className="flex items-center text-[#00ff88] text-xs font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14s
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-[#00d2ff] font-mono">02m 45s</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block">Total 7,040 Handled Sessions</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">SMS Delivery Rate</span>
            <span className="flex items-center text-[#00ff88] text-xs font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" /> 99.2%
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-[#9d4edd] font-mono">14,820</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block">Avg DLR Latency: 1.8s</span>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Gross Telecom Usage</span>
            <span className="flex items-center text-[#00d2ff] text-xs font-mono">
              Prepaid BDT
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-white font-mono">৳ 10,108.50</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block">1-Sec Pulse Billing Settled</span>
        </div>
      </div>

      {/* Traffic Time-Series Chart */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00d2ff]" />
              <span>Concurrent Traffic & Hourly Peak Volume</span>
            </h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Voice calls and SMS dispatch throughput across 24-hour cycles.</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#00d2ff]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]"></span>
              Voice Calls
            </span>
            <span className="flex items-center gap-1.5 text-[#9d4edd]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9d4edd]"></span>
              SMS Messages
            </span>
          </div>
        </div>

        {/* CSS Bar Chart */}
        <div className="h-48 flex items-end gap-3 pt-6 px-2">
          {HOURLY_TRAFFIC.map((item, idx) => {
            const maxVal = 3500;
            const smsHeight = (item.sms / maxVal) * 100;
            const callHeight = (item.calls / 350) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div
                    style={{ height: `${Math.max(10, callHeight)}%` }}
                    className="w-1/2 bg-[#00d2ff]/80 hover:bg-[#00d2ff] rounded-t-md transition-all duration-300"
                    title={`Calls: ${item.calls}`}
                  />
                  <div
                    style={{ height: `${Math.max(10, smsHeight)}%` }}
                    className="w-1/2 bg-[#9d4edd]/80 hover:bg-[#9d4edd] rounded-t-md transition-all duration-300"
                    title={`SMS: ${item.sms}`}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#8a99ad] mt-1">{item.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upstream Carrier Quality & Margin Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#00ff88]" />
            <h3 className="text-sm font-bold text-white">Upstream Carrier SLA & Telemetry Quality</h3>
          </div>
          <span className="text-xs text-[#8a99ad] font-mono">QoS Engine Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Carrier Trunk</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Total Sessions</th>
                <th className="py-3.5 px-4">ASR %</th>
                <th className="py-3.5 px-4">ACD</th>
                <th className="py-3.5 px-4">PDD (Latency)</th>
                <th className="py-3.5 px-4">MOS Score</th>
                <th className="py-3.5 px-4 text-right">Gross Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {carriers.map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-semibold text-white">{c.carrier}</td>
                  <td className="py-4 px-4 font-mono text-[#00d2ff]">{c.type}</td>
                  <td className="py-4 px-4 font-mono text-white">{c.totalSessions.toLocaleString()}</td>
                  <td className="py-4 px-4 font-mono">
                    <span
                      className={`font-bold ${
                        c.asrPercent >= 85 ? 'text-[#00ff88]' : c.asrPercent >= 80 ? 'text-amber-400' : 'text-rose-400'
                      }`}
                    >
                      {c.asrPercent}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-white">{c.acdSec > 0 ? `${c.acdSec}s` : '—'}</td>
                  <td className="py-4 px-4 font-mono text-white">{c.pddMs} ms</td>
                  <td className="py-4 px-4 font-mono font-bold text-[#00ff88]">{c.mosQuality} / 5.0</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-white">
                    ৳ {c.totalSpendBDT.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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