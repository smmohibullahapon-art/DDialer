'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, MessageSquare, ArrowRight, Bot, Layers, Users, 
  Video, ShieldCheck, Server, Radio, CheckCircle2, Phone, ChevronRight, 
  Activity, Zap, Lock, Headphones, Cpu, Database, Terminal, Wifi, Globe2,
  ChevronDown, HelpCircle, Star, Shield, Building2, ZapOff, Calculator, RefreshCw
} from 'lucide-react';

export default function FuturisticLandingPage() {
  const [activeTab, setActiveTab] = useState<'voip' | 'sms' | 'ai'>('voip');
  const [packetCount, setPacketCount] = useState(1482930);
  const [activeCalls, setActiveCalls] = useState(12450);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [callMinutes, setCallMinutes] = useState<number>(50000);
  const [smsVolume, setSmsVolume] = useState<number>(20000);
  const estimatedSavings = Math.round((callMinutes * 0.015) + (smsVolume * 0.003));

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount(prev => prev + Math.floor(Math.random() * 45) + 12);
      setActiveCalls(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      q: "How fast can we deploy DDialer's Cloud Phone System?",
      a: "DDialer can be fully provisioned instantly. Tenant accounts, SIP extensions, and global virtual numbers can be configured and deployed in under 5 minutes through our automated tenant dashboard."
    },
    {
      q: "Does DDialer support custom SIP trunking and third-party carriers?",
      a: "Yes! DDialer features robust Kamailio and FreeSWITCH SBC cores that allow you to seamlessly integrate your own upstream SIP carriers, configure Least-Cost Routing (LCR), and manage custom rate decks."
    },
    {
      q: "Is DDialer suitable for white-label telecom resellers?",
      a: "Absolutely. DDialer is built from the ground up as a multi-tier enterprise white-label OS, enabling sub-resellers to manage their own sub-tenants, custom credit limits, and branded portals."
    },
    {
      q: "What security and encryption protocols are implemented?",
      a: "All voice and data transmissions are secured with TLS (Transport Layer Security) for signaling and SRTP (Secure Real-time Transport Protocol) with 256-bit encryption for media streams."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-[#8a99ad] selection:bg-[#00d2ff]/30 selection:text-white font-sans overflow-x-hidden relative">
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#00d2ff]/15 to-[#00ff88]/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <nav className="fixed top-0 inset-x-0 z-50 bg-[#070913]/85 backdrop-blur-2xl border-b border-white/10 px-6 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl shadow-lg shadow-[#00d2ff]/30 animate-pulse">
            D
          </div>
          <div>
            <span className="font-bold text-white tracking-widest text-lg font-mono">DDialer</span>
            <span className="text-[10px] text-[#00ff88] block font-mono">Business Communication Platform by Dial Dynamic Ltd</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-mono">
          <Link href="/" className="text-white font-bold transition">Home</Link>
          <Link href="/business-voip" className="hover:text-white transition">Business VoIP</Link>
          <Link href="/cloud-phone-system" className="hover:text-white transition">Cloud PBX</Link>
          <Link href="/virtual-phone-numbers" className="hover:text-white transition">Virtual Numbers</Link>
          <Link href="/sip-trunking" className="hover:text-white transition">SIP Trunking</Link>
          <Link href="/call-center" className="hover:text-white transition">Call Center</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
            Sign In
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg shadow-[#00d2ff]/20 hover:scale-105 transition">
            Launch Portal &rarr;
          </Link>
        </div>
      </nav>

      <section className="relative pt-44 pb-32 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88] shadow-inner backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span>
          <span>Kamailio &amp; FreeSWITCH SBC Clusters Online • 2026 Sovereign Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-tight">
          Enterprise Business VoIP &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#00ff88]">Cloud Phone Systems</span>
        </h1>

        <p className="text-sm sm:text-base text-[#8a99ad] max-w-2xl leading-relaxed">
          Scale international voice operations, provision global virtual numbers, deploy AI conversational agents, and route enterprise calls with ultra-low jitter through Dial Dynamic Ltd's carrier-grade telecom stack.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 font-mono text-xs">
          <Link href="/login" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-2xl shadow-[#00d2ff]/30 hover:scale-105 transition flex items-center gap-2">
            <span>Access Tenant Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/business-voip" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition">
            Explore Documentation
          </Link>
        </div>

        <div className="w-full pt-10 max-w-5xl">
          <div className="rounded-3xl bg-[#0b0f19]/90 border border-white/15 p-6 md:p-8 shadow-2xl space-y-6 text-left font-mono backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#00ff88]/80"></div>
                </div>
                <span className="text-xs text-white font-semibold">ddialer.sys // SBC_CLUSTER_NODE_01</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 animate-pulse" /> Active Sessions: {activeCalls.toLocaleString()}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[#8a99ad] border border-white/10">
                  Packets: {packetCount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button 
                onClick={() => setActiveTab('voip')}
                className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${activeTab === 'voip' ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40' : 'text-[#8a99ad] hover:text-white'}`}>
                <Phone className="w-3.5 h-3.5" /> SIP Trunking &amp; VoIP
              </button>
              <button 
                onClick={() => setActiveTab('sms')}
                className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${activeTab === 'sms' ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40' : 'text-[#8a99ad] hover:text-white'}`}>
                <MessageSquare className="w-3.5 h-3.5" /> SMPP &amp; Business SMS
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-[#8a99ad] hover:text-white'}`}>
                <Bot className="w-3.5 h-3.5" /> AI Voice &amp; Sentiment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {activeTab === 'voip' && (
                <>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Codec &amp; Transmission</span>
                    <div className="text-white font-bold text-sm">G.711u / Opus Secure</div>
                    <div className="text-[10px] text-[#00ff88]">MOS Quality: 4.8 / 5.0</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Jitter &amp; Latency</span>
                    <div className="text-white font-bold text-sm">1.8ms Average</div>
                    <div className="text-[10px] text-[#00d2ff]">Zero Packet Loss Ratio</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Encryption Protocol</span>
                    <div className="text-[#00ff88] font-bold text-sm">TLS / SRTP 256-bit</div>
                    <div className="text-[10px] text-[#8a99ad]">Session Border Controller Active</div>
                  </div>
                </>
              )}
              {activeTab === 'sms' && (
                <>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">SMPP Gateway Status</span>
                    <div className="text-white font-bold text-sm">Bind 3.4 Active (Throughput: 500 msg/s)</div>
                    <div className="text-[10px] text-[#00ff88]">Delivery Success: 99.8%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">API Endpoint</span>
                    <div className="text-white font-bold text-sm">REST API v2 / Webhooks</div>
                    <div className="text-[10px] text-[#00d2ff]">Instant DLR Confirmation</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Sender Masking</span>
                    <div className="text-[#00ff88] font-bold text-sm">Dynamic Alpha Routing</div>
                    <div className="text-[10px] text-[#8a99ad]">Global Operator Connect</div>
                  </div>
                </>
              )}
              {activeTab === 'ai' && (
                <>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Conversational IVR Engine</span>
                    <div className="text-white font-bold text-sm">Whisper Large v3 + LLM</div>
                    <div className="text-[10px] text-purple-400">Sub-second Latency Response</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Sentiment Score</span>
                    <div className="text-[#00ff88] font-bold text-sm">96.4% Positive Tone</div>
                    <div className="text-[10px] text-[#8a99ad]">Real-time Agent Coaching</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider">Call Transcription</span>
                    <div className="text-white font-bold text-sm">Automated Summarization</div>
                    <div className="text-[10px] text-[#00d2ff]">Synced to CRM Ledger</div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">99.999%</div>
            <div className="text-xs text-[#8a99ad]">Carrier-Grade SBC Uptime</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#00d2ff]">50M+</div>
            <div className="text-xs text-[#8a99ad]">Monthly Cloud VoIP Minutes</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#00ff88]">120+</div>
            <div className="text-xs text-[#8a99ad]">Global Operator &amp; SIP Routes</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-xs text-[#8a99ad]">HA Cluster Infrastructure</div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Complete Business Communication Suite</h2>
          <p className="text-xs sm:text-sm text-[#8a99ad] font-mono">Engineered for high-concurrency call centers, remote support teams, and scaling international enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Phone, title: 'Business VoIP & SIP Trunking', desc: 'High-definition internet phone systems and robust SIP trunk connectivity designed to replace legacy PBX hardware with crystal-clear audio.' },
            { icon: Globe, title: 'Virtual Phone Numbers & DIDs', desc: 'Instant local, national, and toll-free virtual business numbers across USA, UK, Canada, Australia, and international destinations.' },
            { icon: Server, title: 'Cloud Phone System & PBX', desc: 'Advanced auto attendants, multi-level IVR menus, intelligent call routing, ring groups, and custom extensions managed from the cloud.' },
            { icon: Headphones, title: 'Cloud Call Center Software', desc: 'Predictive outbound dialers, live agent monitoring, call queues, call recording, and real-time performance analytics.' },
            { icon: MessageSquare, title: 'Business SMS & Text Messaging', desc: 'Two-way business text messaging, SMPP 3.4 bulk dispatch, and automated SMS notifications to engage customers instantly.' },
            { icon: Bot, title: 'AI Voice Assistants & Analytics', desc: 'OpenAI-powered conversational IVRs, automated speech recognition, sentiment tracking, and voice interaction intelligence.' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00d2ff]/50 transition space-y-4 shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff] group-hover:scale-110 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">{item.title}</h3>
                <p className="text-xs text-[#8a99ad] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">Global Presence</span>
            <h2 className="text-3xl font-bold text-white">Instant Virtual Numbers &amp; DIDs Worldwide</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Establish local presence in over 60+ countries with instant activation and crystal-clear SIP routing.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
            {[
              { country: 'United States', code: '+1', prefix: 'Local, Toll-Free' },
              { country: 'United Kingdom', code: '+44', prefix: '020, 01, 0800' },
              { country: 'Canada', code: '+1', prefix: 'Toronto, Vancouver' },
              { country: 'Australia', code: '+61', prefix: 'Sydney, Melbourne' },
              { country: 'Singapore', code: '+65', prefix: 'Virtual DID' },
              { country: 'Bangladesh', code: '+880', prefix: 'Enterprise SIP' }
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:border-[#00d2ff] transition">
                <div className="text-white font-bold text-sm">{c.country}</div>
                <div className="text-[#00d2ff] font-mono font-semibold">{c.code}</div>
                <div className="text-[10px] text-[#8a99ad]">{c.prefix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10 bg-[#0b0f19]/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-16 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">Cost Optimization</span>
            <h2 className="text-3xl font-bold text-white">Calculate Your Monthly Telecom Savings</h2>
            <p className="text-xs text-[#8a99ad] font-mono">See how much your business saves switching to DDialer’s Least-Cost Routing (LCR) engine.</p>
          </div>

          <div className="p-8 md:p-12 rounded-3xl bg-[#0b0f19] border border-white/15 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl font-mono">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8a99ad] flex justify-between">
                  <span>Monthly Call Minutes</span>
                  <span className="text-white font-bold">{callMinutes.toLocaleString()} Min</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="500000" 
                  step="5000"
                  value={callMinutes} 
                  onChange={(e) => setCallMinutes(Number(e.target.value))}
                  className="w-full accent-[#00d2ff] bg-white/10 h-2 rounded-lg cursor-pointer" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8a99ad] flex justify-between">
                  <span>Monthly SMS Volume</span>
                  <span className="text-white font-bold">{smsVolume.toLocaleString()} SMS</span>
                </label>
                <input 
                  type="range" 
                  min="1000" 
                  max="200000" 
                  step="1000"
                  value={smsVolume} 
                  onChange={(e) => setSmsVolume(Number(e.target.value))}
                  className="w-full accent-[#00ff88] bg-white/10 h-2 rounded-lg cursor-pointer" 
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00d2ff]/10 to-[#00ff88]/10 border border-white/15 text-center space-y-4">
              <span className="text-xs text-[#8a99ad] uppercase tracking-wider">Estimated Monthly Savings</span>
              <div className="text-4xl md:text-5xl font-black text-[#00ff88]">
                ${estimatedSavings.toLocaleString()} USD
              </div>
              <p className="text-[11px] text-[#8a99ad]">Compared to legacy tier-1 carrier contracts with zero setup fees.</p>
              <Link href="/pricing" className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs shadow-lg">
                View Pricing Tiers &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">Enterprise-Grade Protection</span>
            <h2 className="text-3xl font-bold text-white">Secure, Encrypted, and Reliable Telephony Infrastructure</h2>
            <p className="text-xs text-[#8a99ad] leading-relaxed">
              DDialer is built for organizations where communication security and uptime are mission-critical. From high-security TLS/SRTP signaling encryption to multi-region server redundancy, your data remains fully protected.
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-white">
                <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                <span>256-bit SRTP Voice Encryption for Media Streams</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                <span>Automated Toll-Fraud Detection &amp; IP Blacklisting</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                <span>High-Availability (HA) Active-Passive Failover Clustering</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/15 space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white font-bold">Infrastructure Health Monitor</span>
              <span className="text-[#00ff88] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span> 100% Operational</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[#8a99ad] mb-1">
                  <span>US-East SBC Cluster</span>
                  <span className="text-[#00ff88]">0.9ms Latency</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="w-[98%] h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[#8a99ad] mb-1">
                  <span>EU-Central SIP Gateway</span>
                  <span className="text-[#00ff88]">1.2ms Latency</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="w-[95%] h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[#8a99ad] mb-1">
                  <span>AP-South SMPP Dispatch</span>
                  <span className="text-[#00ff88]">1.5ms Latency</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="w-[99%] h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">Mother Core Integration</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How DDialer Connects Your Enterprise</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Native synchronization with Dial Dynamic Ltd's billing and cloud server stacks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00d2ff]/20 text-[#00d2ff] flex items-center justify-center font-bold">01</div>
              <h4 className="text-white font-bold">Global SIP Ingestion</h4>
              <p className="text-[#8a99ad] text-[11px]">Calls arrive via global carriers and encrypted TLS/SRTP tunnels into our border controllers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center font-bold">02</div>
              <h4 className="text-white font-bold">Kamailio / LCR Engine</h4>
              <p className="text-[#8a99ad] text-[11px]">Least-cost routing algorithms instantly select the highest MOS quality and lowest cost path.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">03</div>
              <h4 className="text-white font-bold">AI &amp; PBX Processing</h4>
              <p className="text-[#8a99ad] text-[11px]">IVR queues, sentiment scoring, and auto-attendant handlers process call logic in real time.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">04</div>
              <h4 className="text-white font-bold">Instant Billing Ledger</h4>
              <p className="text-[#8a99ad] text-[11px]">CDR logs and prepaid balance deductions sync seamlessly with financial ledgers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">Got Questions?</span>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Everything you need to know about DDialer's telecom architecture and deployment.</p>
          </div>

          <div className="space-y-4 font-mono">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between text-white font-bold text-sm hover:text-[#00d2ff] transition">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-[#00d2ff]' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs text-[#8a99ad] leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 🚀 UPGRADED MODERN HOMEPAGE ENTERPRISE FOOTER               */}
      {/* ========================================================== */}
      <footer className="bg-[#05070e] text-[#8a99ad] border-t border-white/10 font-sans relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-tr from-[#00d2ff]/10 to-[#00ff88]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl shadow-lg shadow-[#00d2ff]/30">
                  D
                </div>
                <div>
                  <span className="font-bold text-white tracking-widest text-lg font-mono">DDialer</span>
                  <span className="text-[10px] text-[#00ff88] block font-mono">Business Communication Platform</span>
                </div>
              </div>

              <p className="text-xs text-[#8a99ad] leading-relaxed max-w-sm">
                Sovereign enterprise telecom platform engineered by <strong className="text-white">Dial Dynamic Ltd</strong>. Powering global VoIP, SMPP bulk messaging, AI voice bots, and carrier-grade cloud PBX infrastructure.
              </p>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88]">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span>
                <span>Global SBC Clusters 100% Operational</span>
              </div>
            </div>

            {/* Solutions Column */}
            <div className="space-y-4 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Solutions</h4>
              <ul className="space-y-2.5">
                <li><Link href="/business-voip" className="hover:text-[#00d2ff] transition flex items-center gap-1"><span>Business VoIP</span></Link></li>
                <li><Link href="/cloud-phone-system" className="hover:text-[#00d2ff] transition flex items-center gap-1"><span>Cloud PBX &amp; IVR</span></Link></li>
                <li><Link href="/virtual-phone-numbers" className="hover:text-[#00d2ff] transition flex items-center gap-1"><span>Virtual DIDs</span></Link></li>
                <li><Link href="/sip-trunking" className="hover:text-[#00d2ff] transition flex items-center gap-1"><span>SIP Trunking</span></Link></li>
                <li><Link href="/call-center" className="hover:text-[#00d2ff] transition flex items-center gap-1"><span>Call Center Software</span></Link></li>
              </ul>
            </div>

            {/* Platform & Resources */}
            <div className="space-y-4 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Platform</h4>
              <ul className="space-y-2.5">
                <li><Link href="/pricing" className="hover:text-[#00ff88] transition">Pricing Tiers</Link></li>
                <li><Link href="/reseller" className="hover:text-[#00ff88] transition">White-Label Reseller</Link></li>
                <li><Link href="/api" className="hover:text-[#00ff88] transition">Developer API</Link></li>
                <li><Link href="/security" className="hover:text-[#00ff88] transition">Security &amp; Encryption</Link></li>
                <li><Link href="/contact" className="hover:text-[#00ff88] transition">Enterprise Inquiry</Link></li>
              </ul>
            </div>

            {/* Legal & Company */}
            <div className="space-y-4 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Governance</h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="hover:text-white transition">About Dial Dynamic Ltd</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/status" className="hover:text-white transition">System Status</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Badges */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="text-[#8a99ad]">
              &copy; 2026 <strong className="text-white">DDialer OS</strong>. A product of <span className="text-[#00ff88]">Dial Dynamic Ltd</span>. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-[#8a99ad]">
              <span>TLS/SRTP 256-bit Secure</span>
              <span>Kamailio &amp; FreeSWITCH Powered</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}