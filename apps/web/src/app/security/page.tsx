'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, MessageSquare, ArrowRight, Bot, Layers, Users, 
  Video, ShieldCheck, Server, Radio, CheckCircle2, Phone, ChevronRight, 
  Activity, Zap, Lock, Headphones, Cpu, Database, Terminal, Wifi, Globe2,
  ChevronDown, HelpCircle, Star, Shield, Building2, ZapOff, Check, Mail, MapPin, Send
} from 'lucide-react';
import LiveChatWidget from '@/components/chat/LiveChatWidget';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/contact" className="text-white font-bold transition">Contact</Link>
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
      <section className="relative pt-44 pb-16 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00ff88] shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00ff88]" />
          <span>24/7 Enterprise Support &amp; Inquiry Desk</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-tight">
          Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#00ff88]">Dial Dynamic Ltd</span>
        </h1>

        <p className="text-sm sm:text-base text-[#8a99ad] max-w-2xl leading-relaxed">
          Have questions about our enterprise telecom infrastructure, white-label reseller programs, or custom SIP trunking? Our engineering team is ready to assist you.
        </p>
      </section>

      {/* 3. Contact Form & Details Grid */}
      <section className="py-12 pb-28 px-6 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/15 space-y-6 shadow-2xl font-mono text-xs">
            <h3 className="text-white font-bold text-base font-sans">Global Enterprise Headquarters</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white font-bold block">Dial Dynamic Ltd</span>
                  <span className="text-[#8a99ad] text-[11px] leading-relaxed block mt-1">Level 4, Tech Tower, Gulshan Avenue, Dhaka, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white font-bold block">Phone Numbers (Local &amp; International)</span>
                  <span className="text-[#8a99ad] text-[11px] block mt-0.5">Local: +880 9612-345678</span>
                  <span className="text-[#8a99ad] text-[11px] block">International: +1 (800) 555-DIAL</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white font-bold block">Email Address</span>
                  <span className="text-[#8a99ad] text-[11px]">support@ddialer.xyz / admin@dialdynamic.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00d2ff]/10 to-[#00ff88]/10 border border-white/15 space-y-3 font-mono text-xs">
            <span className="text-white font-bold block text-sm">Need Instant Assistance?</span>
            <p className="text-[#8a99ad] leading-relaxed text-[11px]">
              Click the floating live chat widget at the bottom right corner of your screen to instantly connect with our 24/7 AI and human support desk.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 md:p-10 rounded-3xl bg-[#0b0f19] border border-white/15 shadow-2xl font-mono text-xs">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white font-sans">Inquiry Received Successfully</h3>
              <p className="text-xs text-[#8a99ad] max-w-sm mx-auto">
                Thank you for reaching out to Dial Dynamic Ltd. Our enterprise engineering team will contact you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-white font-sans border-b border-white/10 pb-4">Send an Enterprise Inquiry</h3>
              
              <div className="space-y-2">
                <label className="text-[#8a99ad] block">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d2ff] transition" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#8a99ad] block">Corporate Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@enterprise.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d2ff] transition" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#8a99ad] block">Company Name</label>
                <input 
                  type="text" 
                  placeholder="Dial Dynamic Ltd Partner" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d2ff] transition" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#8a99ad] block">Message / Requirements</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe your VoIP, SIP Trunking, or Reseller requirements..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d2ff] transition resize-none" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2">
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </section>

      {/* Floating Live Chat Widget */}
      <LiveChatWidget />

      {/* 4. Modern Enterprise Footer */}
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