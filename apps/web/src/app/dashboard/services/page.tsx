'use client';

import React, { useState } from 'react';
import { Sparkles, MessageSquare, Radio, Sliders, CheckCircle2, AlertCircle, ArrowRight, Wallet } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  priceNum: number;
  priceLabel: string;
  icon: any;
  route: string;
}

const AVAILABLE_SERVICES: ServiceItem[] = [
  {
    id: 'sentiment',
    name: 'AI Sentiment Analysis Engine',
    category: 'Artificial Intelligence',
    description: 'Real-time customer emotion and sentiment tracking during active calls.',
    priceNum: 5000,
    priceLabel: '৳ 5,000 / month',
    icon: Sparkles,
    route: '/dashboard/sentiment'
  },
  {
    id: 'sms-gateway',
    name: 'Bulk SMS & SMPP Gateway',
    category: 'Messaging',
    description: 'High-throughput enterprise SMS dispatch with delivery reports.',
    priceNum: 3000,
    priceLabel: '৳ 3,000 / month',
    icon: MessageSquare,
    route: '/dashboard/sms-gateway'
  },
  {
    id: 'wallboard',
    name: 'Real-Time Call Center Wallboard',
    category: 'Call Center',
    description: 'Live queue monitoring, agent status, and ACD metrics dashboard.',
    priceNum: 4000,
    priceLabel: '৳ 4,000 / month',
    icon: Radio,
    route: '/dashboard/wallboard'
  },
  {
    id: 'ivr',
    name: 'Advanced IVR Studio & Voice Menus',
    category: 'Telephony',
    description: 'Drag-and-drop interactive voice response builder for automated flows.',
    priceNum: 6000,
    priceLabel: '৳ 6,000 / month',
    icon: Sliders,
    route: '/dashboard/ivr'
  },
];

export default function CustomerServicesPage() {
  const [walletBalance, setWalletBalance] = useState<number>(14820);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load approved services from localStorage
  const [approvedServices, setApprovedServices] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dd_approved_services');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleOrderAndPay = (srv: ServiceItem) => {
    setError(null);
    setNotice(null);

    if (walletBalance < srv.priceNum) {
      setError(`Insufficient wallet balance! You need ${srv.priceLabel}, but your balance is ৳ ${walletBalance}. Please recharge first.`);
      return;
    }

    // Deduct balance
    const newBalance = walletBalance - srv.priceNum;
    setWalletBalance(newBalance);

    // Auto-approve or send for admin approval workflow
    const updated = [...approvedServices, srv.id];
    setApprovedServices(updated);
    localStorage.setItem('dd_approved_services', JSON.stringify(updated));

    setNotice(`Success! ৳ ${srv.priceNum} deducted from your wallet. Service "${srv.name}" is now approved and active in your portal.`);
    
    // Simulate SMS and Email notification dispatch
    console.log(`[SMS & Email Notification Dispatched] Service ${srv.name} activated for Sayed (DialDynamic). Admin notified.`);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>AI &amp; Telecom Service Marketplace</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
            Prepaid Deduction &amp; Auto-Activation
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Select and subscribe to enterprise telecom modules. Service fees are automatically deducted from your prepaid wallet balance upon ordering.
        </p>
      </div>

      {/* Wallet Banner */}
      <div className="p-4 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-[#00ff88]">
          <Wallet className="w-4 h-4" />
          <span>Available Prepaid Wallet Balance: <strong>৳ {walletBalance.toLocaleString()}.00</strong></span>
        </div>
        <span className="text-white/70">Instant Settlement Gateway</span>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#8a99ad] hover:text-white">Dismiss</button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-300 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AVAILABLE_SERVICES.map((srv) => {
          const Icon = srv.icon;
          const isActive = approvedServices.includes(srv.id);

          return (
            <div key={srv.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20">
                    {srv.category}
                  </span>
                  <span className="text-sm font-bold text-[#00ff88] font-mono">{srv.priceLabel}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00d2ff]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">{srv.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-[#8a99ad] leading-relaxed">{srv.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {isActive ? (
                  <div className="w-full flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#00ff88] font-mono font-bold bg-[#00ff88]/10 px-3 py-1.5 rounded-xl border border-[#00ff88]/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active in Your Portal</span>
                    </span>
                    <a
                      href={srv.route}
                      className="text-xs text-[#00d2ff] font-bold hover:underline font-mono"
                    >
                      Open Module &rarr;
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOrderAndPay(srv)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition flex items-center justify-center gap-2 font-mono shadow-lg shadow-[#00d2ff]/15"
                  >
                    <span>Order &amp; Deduct from Balance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}