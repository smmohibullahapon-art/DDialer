'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Wifi, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070e] text-[#8a99ad] border-t border-white/10 font-sans relative overflow-hidden">
      {/* Background Glow */}
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
  );
}