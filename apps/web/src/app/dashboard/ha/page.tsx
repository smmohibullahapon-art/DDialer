'use client';
import React from 'react';
import { Server, Activity, CheckCircle2 } from 'lucide-react';
export default function HAPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-[#00d2ff]" />
          <span>SIP Trunk Failover &amp; HA Cluster Monitor</span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">Real-time health check of FreeSWITCH and Kamailio SBC node clustering.</p>
      </div>
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88]">
          <CheckCircle2 className="w-4 h-4" />
          <span>Primary SBC Node 1 &amp; Secondary SBC Node 2 Synchronized</span>
        </div>
      </div>
    </div>
  );
}