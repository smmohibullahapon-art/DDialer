'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Radio,
  CheckCircle2,
  AlertCircle,
  Activity,
  Sliders,
  DollarSign,
  ShieldCheck,
  Eye,
  FileText
} from 'lucide-react';

interface CDRRecord {
  id: string;
  sessionId: string;
  sourceCLI: string;
  destination: string;
  direction: 'INBOUND' | 'OUTBOUND';
  disposition: 'ANSWERED' | 'NO_ANSWER' | 'BUSY' | 'FAILED';
  carrierTrunk: string;
  totalDurationSec: number;
  billableDurationSec: number;
  pulseUnit: string;
  costBDT: number;
  mosScore: number;
  pddMs: number;
  timestamp: string;
}

const INITIAL_CDR: CDRRecord[] = [
  {
    id: 'cdr-901',
    sessionId: 'sess-8f3e-4b2a',
    sourceCLI: '+8801712345678',
    destination: '+8809612000000',
    direction: 'INBOUND',
    disposition: 'ANSWERED',
    carrierTrunk: 'BTCL Wholesale National',
    totalDurationSec: 192,
    billableDurationSec: 184,
    pulseUnit: '1-Sec Pulse',
    costBDT: 1.38,
    mosScore: 4.4,
    pddMs: 450,
    timestamp: 'Today 04:12:15 AM',
  },
  {
    id: 'cdr-902',
    sessionId: 'sess-9d1c-7a5f',
    sourceCLI: '+8809638112233',
    destination: '+8801911987654',
    direction: 'OUTBOUND',
    disposition: 'ANSWERED',
    carrierTrunk: 'AmberIT Enterprise SBC',
    totalDurationSec: 96,
    billableDurationSec: 92,
    pulseUnit: '1-Sec Pulse',
    costBDT: 0.69,
    mosScore: 4.2,
    pddMs: 520,
    timestamp: 'Today 03:45:22 AM',
  },
  {
    id: 'cdr-903',
    sessionId: 'sess-2c8b-3e4d',
    sourceCLI: '+8801822334455',
    destination: '+8809612000000',
    direction: 'INBOUND',
    disposition: 'NO_ANSWER',
    carrierTrunk: 'BTCL National Route',
    totalDurationSec: 25,
    billableDurationSec: 0,
    pulseUnit: '1-Sec Pulse',
    costBDT: 0.0,
    mosScore: 4.5,
    pddMs: 380,
    timestamp: 'Today 02:20:11 AM',
  },
  {
    id: 'cdr-904',
    sessionId: 'sess-4a1e-8f9c',
    sourceCLI: '+8809612000000',
    destination: '+8801677889900',
    direction: 'OUTBOUND',
    disposition: 'BUSY',
    carrierTrunk: 'AmberIT Enterprise SBC',
    totalDurationSec: 12,
    billableDurationSec: 0,
    pulseUnit: '1-Sec Pulse',
    costBDT: 0.0,
    mosScore: 4.1,
    pddMs: 610,
    timestamp: 'Yesterday 11:42:50 PM',
  },
  {
    id: 'cdr-905',
    sessionId: 'sess-7c3d-1a8e',
    sourceCLI: '+8809612000000',
    destination: '+8801700112233',
    direction: 'OUTBOUND',
    disposition: 'ANSWERED',
    carrierTrunk: 'BTCL Wholesale National',
    totalDurationSec: 245,
    billableDurationSec: 240,
    pulseUnit: '1-Sec Pulse',
    costBDT: 1.8,
    mosScore: 4.3,
    pddMs: 410,
    timestamp: 'Yesterday 10:15:08 PM',
  },
];

export default function CallHistoryCDRPage() {
  const [cdrList, setCdrList] = useState<CDRRecord[]>(INITIAL_CDR);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<CDRRecord | null>(null);

  const formatSec = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredCDR = cdrList.filter((r) => {
    const matchesSearch =
      r.sourceCLI.includes(search) ||
      r.destination.includes(search) ||
      r.sessionId.includes(search) ||
      r.carrierTrunk.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || r.disposition === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Call History & Call Detail Records (CDR)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              SIP Billing Ledger
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Complete carrier call records, 1-second pulse rating, QoS MOS score, and exportable ledger.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full CDR ledger to CSV format...')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export CDR CSV</span>
        </button>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Billable Minutes</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">8,538 Min</h3>
            <span className="text-[11px] text-[#00ff88]">1-Sec Pulse</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Answer-Seizure Ratio (ASR)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">82.4%</h3>
            <span className="text-[11px] text-[#00ff88]">High Quality</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Avg Post-Dial Delay (PDD)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">465 ms</h3>
            <span className="text-[11px] text-[#00d2ff]">Fast Setup</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average Voice MOS Quality</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">4.32 / 5.0</h3>
            <span className="text-[11px] text-[#00ff88]">Opus HD Audio</span>
          </div>
        </div>
      </div>

      {/* CDR Filter and Search Deck */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by CLI, destination, session ID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          <div className="flex gap-1.5 text-xs">
            {['ALL', 'ANSWERED', 'NO_ANSWER', 'BUSY'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl border font-medium transition ${
                  statusFilter === st
                    ? 'bg-[#00d2ff]/15 border-[#00d2ff]/40 text-[#00d2ff]'
                    : 'bg-white/5 border-white/5 text-[#8a99ad] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* CDR Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Session UUID</th>
                <th className="py-3.5 px-4">Caller CLI</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Trunk Route</th>
                <th className="py-3.5 px-4">Duration (Billable)</th>
                <th className="py-3.5 px-4">Cost (BDT)</th>
                <th className="py-3.5 px-4">MOS / PDD</th>
                <th className="py-3.5 px-4">Disposition</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredCDR.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-[#00d2ff]">{r.sessionId}</td>
                  <td className="py-4 px-4 font-mono text-white">
                    <div className="flex items-center gap-1.5">
                      {r.direction === 'INBOUND' ? (
                        <PhoneIncoming className="w-3.5 h-3.5 text-[#00ff88]" />
                      ) : (
                        <PhoneOutgoing className="w-3.5 h-3.5 text-[#00d2ff]" />
                      )}
                      <span>{r.sourceCLI}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-white/90">{r.destination}</td>
                  <td className="py-4 px-4 text-white/80">{r.carrierTrunk}</td>
                  <td className="py-4 px-4 font-mono text-white">
                    {formatSec(r.billableDurationSec)}
                    <span className="text-[10px] text-[#8a99ad] block">Total: {formatSec(r.totalDurationSec)}</span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {r.costBDT > 0 ? `৳ ${r.costBDT.toFixed(2)}` : '৳ 0.00'}
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <span className="text-[#00ff88] font-bold">{r.mosScore}</span>
                    <span className="text-[10px] text-[#8a99ad] block">{r.pddMs}ms PDD</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        r.disposition === 'ANSWERED'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                          : r.disposition === 'BUSY'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {r.disposition}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRecord(r)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                      title="Inspect Signaling & QoS"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Session Deep-Dive Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00d2ff]" />
                  <span>CDR Session Details</span>
                </h3>
                <span className="text-[11px] font-mono text-[#00d2ff]">{selectedRecord.sessionId}</span>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="text-[#8a99ad] hover:text-white text-xs">
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex justify-between text-[#8a99ad]">
                  <span>Caller CLI:</span>
                  <span className="text-white font-bold">{selectedRecord.sourceCLI}</span>
                </div>
                <div className="flex justify-between text-[#8a99ad]">
                  <span>Destination:</span>
                  <span className="text-white font-bold">{selectedRecord.destination}</span>
                </div>
                <div className="flex justify-between text-[#8a99ad]">
                  <span>Trunk Carrier:</span>
                  <span className="text-[#00ff88]">{selectedRecord.carrierTrunk}</span>
                </div>
                <div className="flex justify-between text-[#8a99ad]">
                  <span>Timestamp:</span>
                  <span className="text-white">{selectedRecord.timestamp}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#8a99ad] block">Billable Duration</span>
                  <span className="text-base font-bold text-white mt-1 block">
                    {formatSec(selectedRecord.billableDurationSec)} ({selectedRecord.pulseUnit})
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#8a99ad] block">Charged Cost</span>
                  <span className="text-base font-bold text-[#00ff88] mt-1 block">
                    ৳ {selectedRecord.costBDT.toFixed(2)} BDT
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-white space-y-1">
                <span className="font-bold block">Signaling Handshake & QoS:</span>
                <span className="text-[11px] text-[#8a99ad] block">
                  SIP 200 OK • Codec Opus (48kHz) • Latency 14ms • Jitter 1.2ms • 0% Packet Loss
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}