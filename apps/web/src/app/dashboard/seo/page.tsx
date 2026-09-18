'use client';

import React, { useState } from 'react';
import { Globe, Search, Sparkles, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export default function SEOMarkerPage() {
  const [metaTitle, setMetaTitle] = useState('DDialer - Enterprise BTRC Compliant Telecom IPTSP Platform');
  const [metaDesc, setMetaDesc] = useState('Build and scale your VoIP, SIP trunking, SMS SMPP gateway, and predictive dialer infrastructure with BTRC compliance.');
  const [keywords, setKeywords] = useState('IPTSP software, BTRC compliance billing, Kamailio SBC, VoIP switch, FreeSWITCH server, SIP trunking Bangladesh');
  const [notice, setNotice] = useState<string | null>(null);

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('Google ranking keywords, Meta tags, and Robots.txt updated successfully.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Google Ranking Keywords &amp; SEO Engine</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
            Organic Search Optimizer
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Configure Google ranking keywords, meta descriptions, sitemaps, and OpenGraph social preview tags.
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

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
        <form onSubmit={handleSaveSEO} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SEO Meta Title (Google SERP)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Meta Description (160 Chars Max)</label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff] font-sans"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Google Ranking Keywords (Comma Separated)</label>
            <textarea
              rows={3}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg shadow-[#00d2ff]/20 hover:brightness-110 transition"
            >
              Deploy SEO &amp; Keywords
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}