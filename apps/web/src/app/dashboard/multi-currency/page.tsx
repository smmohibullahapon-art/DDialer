'use client';

import React, { useState } from 'react';
import {
  Globe,
  DollarSign,
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sliders
} from 'lucide-react';

interface GlobalAccount {
  id: string;
  carrierName: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT';
  balance: number;
  exchangeRateToUSD: number;
  status: 'ACTIVE' | 'SETTLEMENT';
}

const INITIAL_GLOBAL_ACCOUNTS: GlobalAccount[] = [
  {
    id: 'gc-01',
    carrierName: 'SingTel Wholesale VoIP',
    currency: 'USD',
    balance: 4500.0,
    exchangeRateToUSD: 1.0,
    status: 'ACTIVE',
  },
  {
    id: 'gc-02',
    carrierName: 'Vodafone Carrier Services',
    currency: 'EUR',
    balance: 3200.0,
    exchangeRateToUSD: 1.08,
    status: 'ACTIVE',
  },
  {
    id: 'gc-03',
    carrierName: 'BDIX National Interconnect',
    currency: 'BDT',
    balance: 150000.0,
    exchangeRateToUSD: 0.0083,
    status: 'ACTIVE',
  },
];

export default function MultiCurrencyBillingPage() {
  const [accounts, setAccounts] = useState<GlobalAccount[]>(INITIAL_GLOBAL_ACCOUNTS);
  const [notice, setNotice] = useState<string | null>(null);

  const syncRates = () => {
    setNotice('Live foreign exchange (Forex) rates synchronized with international banking feeds.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Multi-Currency &amp; Global Wholesale Billing</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              USD / EUR / BDT Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Manage multi-currency carrier accounts, real-time FX rate conversions, and international wholesale billing ledgers.
          </p>
        </div>

        <button
          onClick={syncRates}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          <span>Sync Live FX Rates</span>
        </button>
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

      {/* Accounts Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Global Carrier Name</th>
                <th className="py-3.5 px-4">Currency</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">USD Equivalent Rate</th>
                <th className="py-3.5 px-4 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans">{acc.carrierName}</td>
                  <td className="py-4 px-4 text-[#00d2ff] font-bold">{acc.currency}</td>
                  <td className="py-4 px-4 text-[#00ff88] font-bold">
                    {acc.currency === 'USD' && '$'}
                    {acc.currency === 'EUR' && '€'}
                    {acc.currency === 'BDT' && '৳ '}
                    {acc.balance.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-white/80">{acc.exchangeRateToUSD}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 text-[10px] font-bold uppercase">
                      {acc.status}
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