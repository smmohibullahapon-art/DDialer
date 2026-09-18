'use client';

import React, { useState } from 'react';
import { Wallet, CreditCard, CheckCircle2, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

export default function WalletRechargePage() {
  const [amount, setAmount] = useState('5000');
  const [gateway, setGateway] = useState<'BKASH' | 'SSLCOMMERZ' | 'STRIPE'>('BKASH');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(`Successfully initiated payment of ৳ ${amount} via ${gateway}. Wallet credited instantly.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Instant Wallet Recharge &amp; Gateway</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono">
            Automated Settlement
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Top-up your prepaid telecom balance securely using bKash, SSLCommerz, or international credit cards.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-[#8a99ad] hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Recharge Card */}
      <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#8a99ad] block font-mono">Current Balance</span>
              <span className="text-lg font-bold text-white font-mono">৳ 14,820.50</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#00d2ff] bg-[#00d2ff]/10 px-3 py-1.5 rounded-xl border border-[#00d2ff]/30">
            Auto-Credit Active
          </span>
        </div>

        <form onSubmit={handleRecharge} className="space-y-6 font-mono text-xs">
          <div>
            <label className="text-[#8a99ad] block mb-2 uppercase tracking-wider">Select Payment Gateway</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setGateway('BKASH')}
                className={`p-4 rounded-2xl border font-bold flex flex-col items-center gap-2 transition ${
                  gateway === 'BKASH'
                    ? 'bg-pink-500/10 border-pink-500 text-pink-400 shadow-lg shadow-pink-500/10'
                    : 'bg-white/5 border-white/10 text-[#8a99ad] hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>bKash / Nagad</span>
              </button>

              <button
                type="button"
                onClick={() => setGateway('SSLCOMMERZ')}
                className={`p-4 rounded-2xl border font-bold flex flex-col items-center gap-2 transition ${
                  gateway === 'SSLCOMMERZ'
                    ? 'bg-[#00d2ff]/10 border-[#00d2ff] text-[#00d2ff] shadow-lg shadow-[#00d2ff]/10'
                    : 'bg-white/5 border-white/10 text-[#8a99ad] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>SSLCommerz</span>
              </button>

              <button
                type="button"
                onClick={() => setGateway('STRIPE')}
                className={`p-4 rounded-2xl border font-bold flex flex-col items-center gap-2 transition ${
                  gateway === 'STRIPE'
                    ? 'bg-[#9d4edd]/10 border-[#9d4edd] text-[#9d4edd] shadow-lg shadow-[#9d4edd]/10'
                    : 'bg-white/5 border-white/10 text-[#8a99ad] hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Stripe (USD/EUR)</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[#8a99ad] block mb-2 uppercase tracking-wider">Enter Top-Up Amount (BDT / USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">৳</span>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white font-bold text-sm focus:outline-none focus:border-[#00ff88]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-xl shadow-[#00d2ff]/20"
          >
            <span>Proceed to Secure Checkout ({gateway})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}