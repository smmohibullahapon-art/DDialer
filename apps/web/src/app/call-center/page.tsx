'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, MessageSquare, ArrowRight, Bot, Layers, Users, 
  Video, ShieldCheck, Server, Radio, CheckCircle2, Phone, ChevronRight, 
  Activity, Zap, Lock, Headphones, Cpu, Database, Terminal, Wifi, Globe2,
  ChevronDown, HelpCircle, Star, Shield, Building2, ZapOff, Check, PhoneCall
} from 'lucide-react';

export default function CallCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is cloud-based Call Center Software?",
      a: "Cloud-based Call Center Software enables your support and sales agents to handle high-volume inbound and outbound phone queues entirely via web browsers or IP softphones without any physical hardware requirements."
    },
    {
      q: "Does DDialer support predictive and progressive dialing?",
      a: "Yes! DDialer includes automated predictive dialers designed to maximize agent talk-time by filtering out busy signals, voicemails, and disconnected numbers."
    },
    {
      q: "Can supervisors monitor live agent calls?",
      a: "Absolutely. Supervisors can use live call whispering, barging, and silent monitoring features to train agents and ensure top-tier customer satisfaction."
    },
    {
      q: "How does real-time analytics work for call centers?",
      a: "Our real-time wallboards display key metrics like average handle time (AHT), queue wait lengths, drop rates, and agent status instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-[#8a99ad] selection:bg-[#00d2ff]/30 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Background Glow Nodes */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#00d2ff]/15 to-[#00ff88]/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 1. Global Enterprise Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#070913]/85 backdrop-blur-2xl border-b border-white/10 px-6 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl shadow-lg shadow-[#00d2ff]/30 animate-pulse">
              D
            </div>
            <div>
              <span className="font-bold text-white tracking-widest text-lg font-mono">DDialer</span>
              <span className="text-[10px] text-[#00ff88] block font-mono">Business Communication Platform by Dial Dynamic Ltd</span>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-mono">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/business-voip" className="hover:text-white transition">Business VoIP</Link>
          <Link href="/cloud-phone-system" className="hover:text-white transition">Cloud PBX</Link>
          <Link href="/virtual-phone-numbers" className="hover:text-white transition">Virtual Numbers</Link>
          <Link href="/sip-trunking" className="hover:text-white transition">SIP Trunking</Link>
          <Link href="/call-center" className="text-white font-bold transition">Call Center</Link>
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

      {/* 2. Hero Section */}
      <section className="relative pt-44 pb-28 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88] shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00ff88]" />
          <span>Next-Gen Cloud Call Center Software &amp; Predictive Dialers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-tight">
          Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#00ff88]">Call Center Software</span>
        </h1>

        <p className="text-sm sm:text-base text-[#8a99ad] max-w-2xl leading-relaxed">
          Empower your support and sales teams with predictive outbound dialing, live agent monitoring, real-time wallboards, and crystal-clear voice queues powered by Dial Dynamic Ltd.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 font-mono text-xs">
          <Link href="/login" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-2xl shadow-[#00d2ff]/30 hover:scale-105 transition flex items-center gap-2">
            <span>Launch Call Center OS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/pricing" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition">
            View Pricing Plans
          </Link>
        </div>
      </section>

      {/* 3. Call Center Telemetry Overview */}
      <section className="py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">High Concurrency</span>
            <h2 className="text-3xl font-bold text-white">Supercharge Agent Productivity &amp; Customer Satisfaction</h2>
            <p className="text-xs sm:text-sm text-[#8a99ad] leading-relaxed">
              DDialer's Call Center Software combines predictive outbound dialing, intelligent inbound queues, and AI-powered sentiment analysis into one unified browser-based softphone interface.
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Predictive dialer increases agent talk-time by up to 300%</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Live supervisor monitoring, whispering, and call barging</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Real-time wallboards tracking agent metrics and queue loads</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/15 space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white font-bold">Live Call Center Wallboard</span>
              <span className="text-[#00ff88] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span> Live Stream</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#8a99ad]">Active Agents</span>
                <div className="text-white font-bold text-lg">42 Online</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#8a99ad]">Queue Wait Time</span>
                <div className="text-[#00d2ff] font-bold text-lg">00:14 Sec</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#8a99ad]">Calls Handled Today</span>
                <div className="text-[#00ff88] font-bold text-lg">3,892 Calls</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#8a99ad]">CSAT Score</span>
                <div className="text-white font-bold text-lg">98.2%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features Grid */}
      <section className="py-28 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Call Center Feature Suite</h2>
          <p className="text-xs sm:text-sm text-[#8a99ad] font-mono">Advanced toolsets engineered for high-performance inbound and outbound campaigns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Predictive Outbound Dialer', desc: 'Automates outbound calling algorithms to connect agents only with live human voice answers.' },
            { icon: Headphones, title: 'Inbound Smart Queues', desc: 'Route incoming support calls based on skills, priority tiers, or VIP customer status.' },
            { icon: Radio, title: 'Real-Time Wallboards', desc: 'Display live queue metrics, service levels, and agent availability on big screens.' },
            { icon: ShieldCheck, title: 'Supervisor Coaching', desc: 'Whisper advice to agents during active calls or barge into conversations when necessary.' },
            { icon: Bot, title: 'AI Sentiment & Speech Analysis', desc: 'Monitor customer emotion and sentiment scoring in real-time during live calls.' },
            { icon: Database, title: 'CRM & Webhook Sync', desc: 'Instantly log call dispositions, recordings, and lead notes into your favorite CRM platforms.' }
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

      {/* 5. Frequently Asked Questions */}
      <section className="py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">FAQ</span>
            <h2 className="text-3xl font-bold text-white">Call Center Software Frequently Asked Questions</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Everything you need to know about setting up your call center operations with DDialer.</p>
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

      {/* 6. Modern Enterprise Footer */}
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