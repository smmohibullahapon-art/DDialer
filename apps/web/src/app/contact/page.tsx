'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#070913] text-[#8a99ad] font-sans">
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#070913]/90 backdrop-blur-2xl border-b border-white/10 px-6 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl">D</div>
          <span className="font-bold text-white font-mono text-lg">DDialer OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/features" className="hover:text-white transition">Features</Link>
          <Link href="/marketplace" className="hover:text-white transition">Marketplace</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/contact" className="text-white font-bold transition">Contact</Link>
        </div>
        <Link href="/login" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold font-mono text-xs shadow-lg">Launch Portal</Link>
      </nav>

      <section className="pt-36 pb-20 px-6 lg:px-16 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-black text-white">Get in Touch with Our Telecom Experts</h1>
          <p className="text-sm text-[#8a99ad]">Ready to launch your white-label enterprise softswitch? Send us a message.</p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-center font-mono space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#00ff88] mx-auto" />
            <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
            <p className="text-xs text-[#8a99ad]">Our enterprise solutions team will contact you within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 shadow-2xl font-mono text-xs">
            <div>
              <label className="text-[#8a99ad] block mb-2 uppercase tracking-wider">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#00d2ff]" />
            </div>
            <div>
              <label className="text-[#8a99ad] block mb-2 uppercase tracking-wider">Corporate Email</label>
              <input type="email" required placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#00d2ff]" />
            </div>
            <div>
              <label className="text-[#8a99ad] block mb-2 uppercase tracking-wider">Message / Requirements</label>
              <textarea rows={4} required placeholder="Tell us about your VoIP / SMPP infrastructure needs..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#00d2ff]"></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-xl flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Send Enterprise Inquiry</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}