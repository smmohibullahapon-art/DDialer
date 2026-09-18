'use client';

import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  DollarSign,
  Building,
  RefreshCw,
  Search,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';

interface LedgerTransaction {
  id: string;
  transactionRef: string;
  type: 'TOPUP' | 'CALL_DEBIT' | 'SMS_DEBIT' | 'VAT_DEDUCTION';
  channel?: 'bKash' | 'Nagad' | 'Visa / Mastercard' | 'Bank Transfer';
  amountBDT: number;
  balanceAfterBDT: number;
  status: 'SUCCESS' | 'PENDING';
  timestamp: string;
}

const INITIAL_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: 'tx-01',
    transactionRef: 'BKASH-M-982142',
    type: 'TOPUP',
    channel: 'bKash',
    amountBDT: 15000.0,
    balanceAfterBDT: 15000.0,
    status: 'SUCCESS',
    timestamp: 'Today 03:10 AM',
  },
  {
    id: 'tx-02',
    transactionRef: 'SIP-CALL-8f3e',
    type: 'CALL_DEBIT',
    amountBDT: -1.38,
    balanceAfterBDT: 14998.62,
    status: 'SUCCESS',
    timestamp: 'Today 04:12 AM',
  },
  {
    id: 'tx-03',
    transactionRef: 'SMS-SMPP-4250',
    type: 'SMS_DEBIT',
    amountBDT: -1912.50,
    balanceAfterBDT: 13086.12,
    status: 'SUCCESS',
    timestamp: 'Yesterday 06:30 PM',
  },
  {
    id: 'tx-04',
    transactionRef: 'VAT-MUSAK-6.3',
    type: 'VAT_DEDUCTION',
    amountBDT: -225.0,
    balanceAfterBDT: 12861.12,
    status: 'SUCCESS',
    timestamp: 'Yesterday 10:00 AM',
  },
];

export default function BillingWalletPage() {
  const [walletBalance, setWalletBalance] = useState(12861.12);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>(INITIAL_TRANSACTIONS);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('10000');
  const [paymentChannel, setPaymentChannel] = useState<'bKash' | 'Nagad' | 'Visa / Mastercard' | 'Bank Transfer'>('bKash');

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;

    const newBalance = walletBalance + amt;
    const newTx: LedgerTransaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      transactionRef: `${paymentChannel.toUpperCase().replace(/\s+/g, '_')}-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'TOPUP',
      channel: paymentChannel,
      amountBDT: amt,
      balanceAfterBDT: newBalance,
      status: 'SUCCESS',
      timestamp: 'Just Now',
    };

    setWalletBalance(newBalance);
    setTransactions([newTx, ...transactions]);
    setIsTopUpModalOpen(false);
    setTopUpAmount('10000');
    alert(`Successfully deposited ৳ ${amt.toLocaleString()} BDT via ${paymentChannel}!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Billing, Wallet &amp; Ledger Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              Prepaid BDT Ledger
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Real-time wallet top-ups, bKash/Nagad gateway simulation, 1-second pulse rating debits, and VAT invoicing.
          </p>
        </div>

        <button
          onClick={() => setIsTopUpModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Top-Up Prepaid Wallet</span>
        </button>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88]">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted BTRC Prepaid Ledger Account</span>
          </div>
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider block">Available Wallet Balance</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-extrabold text-white font-mono">
              ৳ {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <span className="text-xs text-[#00ff88] font-mono">BDT</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
          >
            Deposit Funds
          </button>
          <button
            onClick={() => alert('Generating Mushak 6.3 VAT Certificate...')}
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs transition"
          >
            Download VAT Challan
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Deposited Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">৳ 15,000</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">bKash Merchant Instant</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Voice &amp; SMS Spend Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">৳ 1,913.88</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">1-Sec Pulse Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">BTRC VAT Withheld (15%)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">৳ 225.00</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Mushak-6.3 Settled</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Auto-Recharge Policy</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">Active (&lt; ৳ 500)</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Saved Visa card ending 4092</span>
        </div>
      </div>

      {/* Ledger Transaction History */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Immutable Ledger &amp; Transaction History</h3>
          <span className="text-xs text-[#8a99ad] font-mono">Real-Time Audit Trail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Transaction Reference</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Payment Channel</th>
                <th className="py-3.5 px-4">Amount (BDT)</th>
                <th className="py-3.5 px-4">Balance After</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-[#00d2ff]">{tx.transactionRef}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] border ${
                        tx.type === 'TOPUP'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                          : 'bg-white/5 text-white border-white/10'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/90">{tx.channel || 'System Auto'}</td>
                  <td className={`py-4 px-4 font-bold ${tx.amountBDT > 0 ? 'text-[#00ff88]' : 'text-rose-400'}`}>
                    {tx.amountBDT > 0 ? `+ ৳ ${tx.amountBDT.toFixed(2)}` : `- ৳ ${Math.abs(tx.amountBDT).toFixed(2)}`}
                  </td>
                  <td className="py-4 px-4 text-white font-bold">৳ {tx.balanceAfterBDT.toFixed(2)}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{tx.timestamp}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top-Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#00ff88]" />
                <span>Deposit Prepaid Funds</span>
              </h3>
              <button onClick={() => setIsTopUpModalOpen(false)} className="text-[#8a99ad] hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Select Gateway</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['bKash', 'Nagad', 'Visa / Mastercard', 'Bank Transfer'] as const).map((ch) => (
                    <button
                      type="button"
                      key={ch}
                      onClick={() => setPaymentChannel(ch)}
                      className={`p-3 rounded-xl border font-bold text-left transition ${
                        paymentChannel === ch
                          ? 'bg-[#00d2ff]/15 border-[#00d2ff] text-[#00d2ff]'
                          : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Amount (BDT)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white font-mono font-bold">৳</span>
                  <input
                    type="number"
                    required
                    min="500"
                    step="100"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#8a99ad] font-mono">
                Instant deposit via {paymentChannel} gateway with zero transaction surcharge.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
              >
                Proceed to Secure Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}