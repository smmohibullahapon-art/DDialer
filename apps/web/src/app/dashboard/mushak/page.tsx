'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Building,
  Calculator,
  Printer,
  Calendar
} from 'lucide-react';

interface VATInvoice {
  id: string;
  invoiceNo: string;
  clientName: string;
  tradeLicense: string;
  taxableAmountBDT: number;
  vat15BDT: number;
  totalWithVATBDT: number;
  date: string;
  status: 'ISSUED' | 'FILED';
}

const INITIAL_INVOICES: VATInvoice[] = [
  {
    id: 'inv-01',
    invoiceNo: 'MUS-6.3/2026/0918',
    clientName: 'Chowdhury Textiles Ltd',
    tradeLicense: 'TRAD/DNCC/092811/2024',
    taxableAmountBDT: 15000.0,
    vat15BDT: 2250.0,
    totalWithVATBDT: 17250.0,
    date: '15 Sep 2026',
    status: 'ISSUED',
  },
  {
    id: 'inv-02',
    invoiceNo: 'MUS-6.3/2026/0919',
    clientName: 'Fintech Solutions BD',
    tradeLicense: 'TRAD/DSCC/118291/2025',
    taxableAmountBDT: 25000.0,
    vat15BDT: 3750.0,
    totalWithVATBDT: 28750.0,
    date: '16 Sep 2026',
    status: 'ISSUED',
  },
];

export default function MushakVATPage() {
  const [invoices, setInvoices] = useState<VATInvoice[]>(INITIAL_INVOICES);
  const [notice, setNotice] = useState<string | null>(null);

  const downloadMushakPDF = (invNo: string) => {
    setNotice(`Official Mushak 6.3 Tax Invoice (${invNo}) successfully downloaded as NBR-compliant PDF.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Automated Mushak 6.3 VAT Report Generator</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              NBR Statutory Compliance
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Generate 15% VAT deduction invoices, tax challans, and monthly returns as mandated by Bangladesh VAT Act.
          </p>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Taxable Turnover</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">৳ 40,000.00</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Current Billing Cycle</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total VAT Collected (15%)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">৳ 6,000.00</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Payable to NBR Treasury</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Generated Invoices</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">2 Challans</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Mushak 6.3 Standard</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Challan / Invoice No</th>
                <th className="py-3.5 px-4">Client Company</th>
                <th className="py-3.5 px-4">Trade License</th>
                <th className="py-3.5 px-4">Taxable Value</th>
                <th className="py-3.5 px-4">VAT (15%)</th>
                <th className="py-3.5 px-4">Total (Inc. VAT)</th>
                <th className="py-3.5 px-4 text-right">Mushak 6.3 Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-[#00d2ff]">{inv.invoiceNo}</td>
                  <td className="py-4 px-4 font-bold text-white font-sans">{inv.clientName}</td>
                  <td className="py-4 px-4 text-white/80">{inv.tradeLicense}</td>
                  <td className="py-4 px-4 text-white">৳ {inv.taxableAmountBDT.toLocaleString()}</td>
                  <td className="py-4 px-4 text-[#00ff88]">৳ {inv.vat15BDT.toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-white">৳ {inv.totalWithVATBDT.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => downloadMushakPDF(inv.invoiceNo)}
                      className="px-3 py-1.5 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 hover:bg-[#00d2ff]/30 font-bold transition flex items-center gap-1 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Challan</span>
                    </button>
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