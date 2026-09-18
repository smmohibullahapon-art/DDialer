'use client';
import React from 'react';
import { Users, Shield, Building } from 'lucide-react';
export default function ResellersPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-[#9d4edd]" />
          <span>Multi-Level Reseller Hierarchy</span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">Manage white-label sub-resellers, credit limits, and custom tenant pricing decks.</p>
      </div>
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="text-xs font-mono text-white">Hierarchical White-Label Control: Enabled</div>
        <p className="text-xs text-[#8a99ad]">Resellers can onboard their own customers under completely independent brand identities.</p>
      </div>
    </div>
  );
}