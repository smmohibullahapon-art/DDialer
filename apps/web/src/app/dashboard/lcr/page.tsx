'use client';
import React from 'react';
import { Layers, DollarSign, TrendingUp } from 'lucide-react';
export default function LCRPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-[#00ff88]" />
          <span>Least-Cost Routing (LCR) &amp; Rate Deck</span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">Automated upstream carrier cost optimization and real-time margin simulator.</p>
      </div>
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="text-xs font-mono text-[#00d2ff]">Active Routing Engine: Kamailio LCR Module v5.8</div>
        <p className="text-xs text-[#8a99ad]">Dynamically routes outbound calls via the cheapest and highest MOS quality carrier route.</p>
      </div>
    </div>
  );
}