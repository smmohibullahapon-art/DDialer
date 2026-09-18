'use client';

import React, { useState } from 'react';
import {
  Wallet,
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Sliders,
  ArrowRight,
  Calculator
} from 'lucide-react';

interface LedgerRecord {
  id: string;
  callId: string;
  tenantName: string;
  durationSec: number;
  ratePerMinBDT: number;
  vatBDT: number;
  totalCostBDT: number;
  timestamp: string;
}

const INITIAL_LEDGER: LedgerRecord[] = [
  {
    id: 'led-01',
    callId: 'call-901842',
    tenantName: 'Chowdhury Textiles Ltd',
    durationSec: 145,
    ratePerMinBDT: 0.45,
    vatBDT: 0.05,
    totalCostBDT: 1.14,
    timestamp: 'Today 04:12 AM',
  },
  {
    id: 'led-02',
    callId: 'call-901843',
    tenantName: 'Fintech Solutions BD',
    durationSec: 320,
    ratePerMinBDT: 0.42,
    vatBDT: 0.11,
    totalCostBDT: 2.35,
    timestamp: 'Today 04:10 AM',
  },
  {
    id: 'led-03',
    callId: 'call-901844',
    tenantName: 'Apex Logistics Freight',
    durationSec: 65,
    ratePerMinBDT: 0.44,
    vatBDT: 0.02,
    totalCostBDT: 0.50,
    timestamp: 'Today 03:55 AM',
  },
];

export default function CDRLedgerPage() {
  const [ledgers, setLedgers] = useState<LedgerRecord[]>(INITIAL_LEDGER);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Billing CDR Cost Ledger &amp; Rating Engine</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              1-Second Pulse Rating
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Audit real-time call rating calculations, VAT deductions (Mushak 6.3), and prepaid ledger debits.
          </p>
        </div>
      </div>

      {/* Ledger KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Debited Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">৳ 4,820.50</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Real-time Settlement</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total VAT (Mushak 6.3)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">৳ 723.10</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">15% Statutory Levy</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Rated Call Volume</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">3,491 Calls</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Zero Discrepancy</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Pulse Granularity</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">1 Second</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Precise Metering</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Recent Rated Call Ledger Entries</h3>
          <span className="text-xs text-[#8a99ad] font-mono">FreeSWITCH CDR Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Call ID</th>
                <th className="py-3.5 px-4">Tenant Company</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Rate / Min</th>
                <th className="py-3.5 px-4">VAT (15%)</th>
                <th className="py-3.5 px-4">Total Cost</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {ledgers.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-[#00d2ff]">{item.callId}</td>
                  <td className="py-4 px-4 text-white font-sans">{item.tenantName}</td>
                  <td className="py-4 px-4 text-white/90">{item.durationSec}s</td>
                  <td className="py-4 px-4 text-white/90">৳ {item.ratePerMinBDT.toFixed(2)}</td>
                  <td className="py-4 px-4 text-white/80">৳ {item.vatBDT.toFixed(2)}</td>
                  <td className="py-4 px-4 font-bold text-[#00ff88]">৳ {item.totalCostBDT.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right text-[#8a99ad]">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}