'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, MessageSquare, ArrowRight, Bot, Layers, Users, 
  Video, ShieldCheck, Server, Radio, CheckCircle2, Phone, ChevronRight, 
  Activity, Zap, Lock, Headphones, Cpu, Database, Terminal, Wifi, Globe2,
  ChevronDown, HelpCircle, Star, Shield, Building2, ZapOff, Check, Sliders
} from 'lucide-react';

export default function CloudPhoneSystemPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is a Cloud Phone System (Cloud PBX)?",
      a: "A Cloud Phone System (Cloud PBX) replaces traditional physical PBX hardware with a fully managed, cloud-hosted telecommunications platform. It lets your team manage extensions, ring groups, IVR menus, and call routing from any web browser or IP phone."
    },
    {
      q: "How does DDialer's Cloud Phone System handle remote teams?",
      a: "DDialer connects remote employees instantly via WebRTC softphones, mobile apps, or desktop applications using a shared company dial plan and unified extension directory."
    },
    {
      q: "Can we set up custom IVR (Interactive Voice Response) menus?",
      a: "Yes! Our visual IVR studio allows you to design multi-level automated attendant menus (e.g., 'Press 1 for Sales, Press 2 for Support') with custom text-to-speech or audio file uploads."
    },
    {
      q: "What kind of redundancy and uptime is guaranteed?",
      a: "DDialer operates on high-availability Kamailio and FreeSWITCH SBC clusters with active-passive failover, guaranteeing 99.999% carrier uptime."
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
          <Link href="/cloud-phone-system" className="text-white font-bold transition">Cloud PBX</Link>
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

      {/* 2. Hero Section */}
      <section className="relative pt-44 pb-28 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88] shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00ff88]" />
          <span>Next-Gen Cloud PBX &amp; Virtual Phone System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-tight">
          Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#00ff88]">Cloud Phone System</span> &amp; PBX
        </h1>

        <p className="text-sm sm:text-base text-[#8a99ad] max-w-2xl leading-relaxed">
          Replace outdated physical telephone hardware with a high-performance, scalable cloud PBX. Manage extensions, automated IVR menus, ring groups, and real-time call flows from a unified control panel.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 font-mono text-xs">
          <Link href="/login" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-2xl shadow-[#00d2ff]/30 hover:scale-105 transition flex items-center gap-2">
            <span>Deploy Cloud PBX</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/pricing" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition">
            View Pricing Plans
          </Link>
        </div>
      </section>

      {/* 3. Cloud PBX Architecture Overview */}
      <section className="py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">Cloud PBX Infrastructure</span>
            <h2 className="text-3xl font-bold text-white">Total Control Over Your Corporate Telephony</h2>
            <p className="text-xs sm:text-sm text-[#8a99ad] leading-relaxed">
              DDialer's Cloud Phone System gives growing businesses and distributed teams enterprise-grade call management features without the headache of maintaining on-premise PBX servers.
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Instant extension provisioning for remote team members</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Multi-level IVR and automated attendant routing</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span>Zero hardware maintenance costs with 99.999% SLA</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/15 space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white font-bold">Cloud PBX Extension Status</span>
              <span className="text-[#00ff88] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span> Active</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Ext 101 - Sales Team Lead</div>
                  <span className="text-[10px] text-[#00ff88]">On Active Call (HD Audio)</span>
                </div>
                <span className="px-2 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] text-[10px]">US-East</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Ext 102 - Support Desk</div>
                  <span className="text-[10px] text-[#8a99ad]">Available / Ring Group</span>
                </div>
                <span className="px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[10px]">EU-Central</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features Grid */}
      <section className="py-28 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Advanced Cloud PBX Modules</h2>
          <p className="text-xs sm:text-sm text-[#8a99ad] font-mono">Designed to handle complex call flows and enterprise communication workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Sliders, title: 'Visual IVR Studio', desc: 'Design intelligent auto-attendant menus with multi-level touch-tone routing and custom speech prompts.' },
            { icon: Users, title: 'Ring Groups & Queues', desc: 'Distribute incoming customer calls evenly across sales and support agents with smart queue algorithms.' },
            { icon: Headphones, title: 'Call Recording & Storage', desc: 'Automatically record incoming and outgoing conversations for compliance, quality assurance, and training.' },
            { icon: Shield, title: 'Call Forwarding & Rules', desc: 'Set time-of-day routing, failover destinations, and mobile device call mirroring effortlessly.' },
            { icon: Activity, title: 'Live Wallboards & Analytics', desc: 'Track waiting queue lengths, missed calls, and agent status in real-time on live dashboards.' },
            { icon: Server, title: 'SBC & Trunk Connectivity', desc: 'Seamlessly link your remote offices or local SIP gateways with robust session border controllers.' }
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
            <h2 className="text-3xl font-bold text-white">Cloud Phone System Frequently Asked Questions</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Everything you need to know about setting up your Cloud PBX with DDialer.</p>
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