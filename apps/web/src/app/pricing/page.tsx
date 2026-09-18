'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, MessageSquare, ArrowRight, Bot, Layers, Users, 
  Video, ShieldCheck, Server, Radio, CheckCircle2, Phone, ChevronRight, 
  Activity, Zap, Lock, Headphones, Cpu, Database, Terminal, Wifi, Globe2,
  ChevronDown, HelpCircle, Star, Shield, Building2, ZapOff, Check
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are there any setup fees or long-term contracts?",
      a: "No setup fees and zero long-term contracts. DDialer operates on a transparent prepaid and pay-as-you-go billing model where you can upgrade, downgrade, or cancel at any time."
    },
    {
      q: "Can I connect my own upstream SIP carriers and rate decks?",
      a: "Yes! All enterprise and carrier tiers allow you to bind your own SIP trunks, configure Least-Cost Routing (LCR), and manage custom rate decks for your sub-tenants."
    },
    {
      q: "Is white-label branding included in the plans?",
      a: "White-label custom domain branding, custom logos, and independent client portals are fully supported on our Professional and Enterprise tiers."
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept credit/debit cards, cryptocurrency (USDT/BTC), bank wire transfers, and local payment gateways integrated with our automated billing ledger."
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
          <Link href="/call-center" className="hover:text-white transition">Call Center</Link>
          <Link href="/pricing" className="text-white font-bold transition">Pricing</Link>
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
      <section className="relative pt-44 pb-20 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88] shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00ff88]" />
          <span>Transparent Enterprise Pricing &amp; Carrier Plans</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-tight">
          Flexible Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#00ff88]">Every Scale</span>
        </h1>

        <p className="text-sm sm:text-base text-[#8a99ad] max-w-2xl leading-relaxed">
          Choose a powerful cloud communication package engineered by Dial Dynamic Ltd. No hidden fees, instant deployment, and zero setup charges.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-xl font-bold transition ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] shadow-lg' : 'text-[#8a99ad] hover:text-white'}`}>
            Monthly Billing
          </button>
          <button 
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] shadow-lg' : 'text-[#8a99ad] hover:text-white'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-[#070913] text-[#00ff88] text-[9px]">Save 20%</span>
          </button>
        </div>
      </section>

      {/* 3. Pricing Cards Grid */}
      <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 text-[#8a99ad] border border-white/10">Starter VoIP</span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">${billingCycle === 'annual' ? '39' : '49'}</span>
                <span className="text-xs text-[#8a99ad]">/ month</span>
              </div>
              <p className="text-xs text-[#8a99ad] leading-relaxed">Ideal for small businesses and remote teams launching professional cloud telephony.</p>
              
              <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Up to 15 SIP Extensions</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>2 Virtual Phone Numbers (DIDs)</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>G.711 / Opus HD Audio</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Standard TLS/SRTP Security</span></div>
              </div>
            </div>

            <Link href="/login" className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold font-mono text-xs hover:bg-white/10 transition text-center block">
              Get Started
            </Link>
          </div>

          {/* Professional Plan (Highlighted) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#00d2ff]/10 to-transparent border-2 border-[#00d2ff] space-y-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-black text-[10px] font-mono shadow-lg">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40">Professional PBX</span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">${billingCycle === 'annual' ? '119' : '149'}</span>
                <span className="text-xs text-[#8a99ad]">/ month</span>
              </div>
              <p className="text-xs text-[#8a99ad] leading-relaxed">Built for growing call centers and enterprises requiring advanced IVR and AI features.</p>
              
              <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Unlimited SIP Extensions</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>10 Virtual Numbers (DIDs)</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Visual IVR Studio &amp; Queues</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>AI Sentiment Analysis Bot</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Real-Time Wallboards</span></div>
              </div>
            </div>

            <Link href="/login" className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold font-mono text-xs shadow-lg hover:scale-105 transition text-center block">
              Deploy Professional
            </Link>
          </div>

          {/* Enterprise Carrier Tier */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">Enterprise &amp; Reseller</span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">${billingCycle === 'annual' ? '319' : '399'}</span>
                <span className="text-xs text-[#8a99ad]">/ month</span>
              </div>
              <p className="text-xs text-[#8a99ad] leading-relaxed">Sovereign infrastructure for telecom operators, wholesale carriers, and white-label resellers.</p>
              
              <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Multi-Tenant Reseller Hierarchy</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Unlimited DIDs &amp; SMPP Binds</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Custom White-Label Branding</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>Dedicated Kamailio SBC Cluster</span></div>
                <div className="flex items-center gap-3 text-white"><Check className="w-4 h-4 text-[#00ff88]" /><span>24/7 Priority HA Monitoring</span></div>
              </div>
            </div>

            <Link href="/login" className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold font-mono text-xs hover:bg-white/10 transition text-center block">
              Contact Carrier Team
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">FAQ</span>
            <h2 className="text-3xl font-bold text-white">Pricing Frequently Asked Questions</h2>
            <p className="text-xs text-[#8a99ad] font-mono">Everything you need to know about billing, payment terms, and carrier plans.</p>
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

      {/* 5. Modern Enterprise Footer */}
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