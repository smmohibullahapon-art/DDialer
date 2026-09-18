'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, Globe, DollarSign, Activity, Users, Shield, Server, 
  ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, Terminal, LogOut, Settings, Bell
} from 'lucide-react';

export default function CustomerDashboard() {
  const [activeCalls, setActiveCalls] = useState(3);
  const [walletBalance, setWalletBalance] = useState(245.80);
  const [packetLatency, setPacketLatency] = useState(1.4);

  // Simulate real-time telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketLatency(prev => Number((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#070913] text-[#8a99ad] selection:bg-[#00d2ff]/30 selection:text-white font-sans flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0b0f19] border-r border-white/10 hidden lg:flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl shadow-lg shadow-[#00d2ff]/30">
              D
            </div>
            <div>
              <span className="font-bold text-white tracking-widest text-lg font-mono">DDialer</span>
              <span className="text-[10px] text-[#00ff88] block font-mono">Client Portal v2.0</span>
            </div>
          </div>

          <nav className="space-y-2 font-mono text-xs">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-bold">
              <Activity className="w-4 h-4" /> Overview &amp; Stats
            </Link>
            <Link href="/dashboard/extensions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#8a99ad] hover:text-white transition">
              <Users className="w-4 h-4" /> SIP Extensions
            </Link>
            <Link href="/dashboard/numbers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#8a99ad] hover:text-white transition">
              <Globe className="w-4 h-4" /> Virtual DIDs
            </Link>
            <Link href="/dashboard/cdr" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#8a99ad] hover:text-white transition">
              <Phone className="w-4 h-4" /> Call Logs (CDR)
            </Link>
            <Link href="/dashboard/billing" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#8a99ad] hover:text-white transition">
              <DollarSign className="w-4 h-4" /> Wallet &amp; Billing
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 font-mono text-xs space-y-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-[#8a99ad] block">Logged in as:</span>
            <span className="text-white font-bold block truncate">tenant@enterprise.com</span>
          </div>
          <Link href="/" className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-[#070913]/85 backdrop-blur-2xl border-b border-white/10 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span> SBC Node 01 Online
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <span className="text-[#8a99ad]">Balance:</span>
              <span className="text-[#00ff88] font-bold text-sm">${walletBalance.toFixed(2)} USD</span>
              <Link href="/dashboard/billing" className="px-2.5 py-1 rounded bg-[#00d2ff] text-[#070913] font-bold hover:scale-105 transition">
                + Top Up
              </Link>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-[#00d2ff]/10 via-[#0b0f19] to-[#00ff88]/10 border border-white/15 shadow-2xl font-mono">
            <div className="space-y-2">
              <span className="text-xs text-[#00ff88] px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30">Tenant Dashboard OS</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">Welcome back, Enterprise Admin</h1>
              <p className="text-xs text-[#8a99ad]">Your Kamailio &amp; FreeSWITCH cloud PBX cluster is operating at peak performance.</p>
            </div>
            <Link href="/dashboard/numbers" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs shadow-lg hover:scale-105 transition">
              + Buy New Virtual DID
            </Link>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-[#8a99ad]">
                <span className="text-xs">Active SIP Calls</span>
                <Phone className="w-4 h-4 text-[#00d2ff]" />
              </div>
              <div className="text-3xl font-black text-white">{activeCalls} Channels</div>
              <span className="text-[10px] text-[#00ff88]">Zero jitter detected</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-[#8a99ad]">
                <span className="text-xs">Active Extensions</span>
                <Users className="w-4 h-4 text-[#00ff88]" />
              </div>
              <div className="text-3xl font-black text-white">12 / 15</div>
              <span className="text-[10px] text-[#8a99ad]">Extensions registered</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-[#8a99ad]">
                <span className="text-xs">SBC Latency</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-black text-white">{packetLatency} ms</div>
              <span className="text-[10px] text-[#00ff88]">Global backbone optimal</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-[#8a99ad]">
                <span className="text-xs">Assigned DIDs</span>
                <Globe className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white">4 Numbers</div>
              <span className="text-[10px] text-[#8a99ad]">USA, UK &amp; Canada</span>
            </div>
          </div>

          {/* SIP Credentials & Recent Call Logs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono">
            
            {/* SIP Credentials Box */}
            <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-white font-bold text-sm font-sans flex items-center gap-2">
                <Server className="w-4 h-4 text-[#00d2ff]" /> SIP Trunk Credentials
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#8a99ad]">SIP Server / Domain</span>
                  <div className="text-white font-bold">sip.ddialer.xyz</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#8a99ad]">Port (TLS / UDP)</span>
                  <div className="text-[#00ff88] font-bold">5061 (TLS Secure) / 5060</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#8a99ad]">Tenant Username</span>
                  <div className="text-white font-bold">tenant_9921</div>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition">
                Reset SIP Password
              </button>
            </div>

            {/* Recent Live Call Activity */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-sm font-sans flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#00ff88]" /> Recent Call Activity (CDR)
                </h3>
                <Link href="/dashboard/cdr" className="text-xs text-[#00d2ff] hover:underline">View All &rarr;</Link>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { type: 'outbound', number: '+1 (415) 555-0199', duration: '03:42 min', cost: '$0.045', status: 'Completed' },
                  { type: 'inbound', number: '+44 20 7946 0912', duration: '01:15 min', cost: '$0.018', status: 'Completed' },
                  { type: 'outbound', number: '+1 (212) 555-8392', duration: '05:20 min', cost: '$0.062', status: 'Completed' },
                ].map((call, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${call.type === 'outbound' ? 'bg-[#00d2ff]/10 text-[#00d2ff]' : 'bg-[#00ff88]/10 text-[#00ff88]'}`}>
                        {call.type === 'outbound' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-white font-bold">{call.number}</div>
                        <span className="text-[10px] text-[#8a99ad]">Duration: {call.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{call.cost}</div>
                      <span className="text-[10px] text-[#00ff88]">{call.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}