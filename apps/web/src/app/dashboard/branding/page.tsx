'use client';

import React, { useState } from 'react';
import { Image, Upload, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export default function CompanyBrandingPage() {
  const [companyName, setCompanyName] = useState('DDialer Enterprise IPTSP');
  const [brandTagline, setBrandTagline] = useState('Next-Gen Telecom OS');
  const [notice, setNotice] = useState<string | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('Company branding, logos, and header icons updated successfully across portal.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Company Logo &amp; White-Label Branding</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono">
            White-Label Suite
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Upload custom company logos, favicons, and set white-label platform names for client tenant portals.
        </p>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
        <form onSubmit={handleUpdate} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Company Brand Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Platform Tagline</label>
            <input
              type="text"
              value={brandTagline}
              onChange={(e) => setBrandTagline(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Upload Enterprise Logo (PNG / SVG)</label>
            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center space-y-2 hover:border-[#00d2ff]/50 transition cursor-pointer">
              <Upload className="w-8 h-8 text-[#00d2ff] mx-auto" />
              <p className="text-white text-xs font-sans">Drag and drop your company logo here, or browse files</p>
              <span className="text-[10px] text-[#8a99ad] block">Recommended size: 250 x 60 pixels (Transparent background)</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg shadow-[#00d2ff]/20 hover:brightness-110 transition"
            >
              Save Brand Identity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}