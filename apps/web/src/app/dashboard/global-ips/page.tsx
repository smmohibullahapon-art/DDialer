'use client';

import React, { useState } from 'react';
import { Globe, Server, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface IPItem {
  id: string;
  country: string;
  countryCode: string;
  routeType: string;
  prefix: string;
  pricing: string;
}

const WHITE_LABEL_IPS: IPItem[] = [
  { id: 'us-01', country: 'United States (New York)', countryCode: '🇺🇸', routeType: 'Tier-1 Premium SIP Trunk DID', prefix: '+1 (212)', pricing: '$12.00 / mo' },
  { id: 'uk-01', country: 'United Kingdom (London)', countryCode: '🇬🇧', routeType: 'Direct Carrier VoIP Interconnect', prefix: '+44 (20)', pricing: '£9.50 / mo' },
  { id: 'sg-01', country: 'Singapore', countryCode: '🇸🇬', routeType: 'Enterprise Cloud IP Route', prefix: '+65', pricing: '$15.00 / mo' },
  { id: 'ca-01', country: 'Canada (Toronto)', countryCode: '🇨🇦', routeType: 'Geographic DID SIP Route', prefix: '+1 (416)', pricing: '$10.00 / mo' },
  { id: 'ae-01', country: 'United Arab Emirates (Dubai)', countryCode: '🇦🇪', routeType: 'High-Quality Business Trunk', prefix: '+971 (4)', pricing: '$25.00 / mo' },
  { id: 'bd-01', country: 'Bangladesh (Dhaka Hub)', countryCode: '🇧🇩', routeType: 'BTRC Compliant IPTSP Route', prefix: '+880 (96)', pricing: '৳ 1,200 / mo' },
];

export default function GlobalIPsPage() {
  const [activatedIPs, setActivatedIPs] = useState<string[]>(['us-01', 'bd-01']);
  const [notice, setNotice] = useState<string | null>(null);

  const handleOrderIP = (ip: IPItem) => {
    if (!activatedIPs.includes(ip.id)) {
      const updated = [...activatedIPs, ip.id];
      setActivatedIPs(updated);
      localStorage.setItem('dd_global_ips', JSON.stringify(updated));
      setNotice(`Global IP Number range ${ip.prefix} for ${ip.country} successfully provisioned on your SBC switch.`);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Global IP Numbers &amp; DIDs</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
            White-Label Carrier Gateway
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Provision enterprise virtual numbers and global SIP routes seamlessly under your own brand identity.
        </p>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#8a99ad] hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WHITE_LABEL_IPS.map((ip) => {
          const isOwned = activatedIPs.includes(ip.id);

          return (
            <div key={ip.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-white border border-white/10 flex items-center gap-1.5">
                    <span>{ip.countryCode}</span>
                    <span>{ip.country}</span>
                  </span>
                  <span className="text-sm font-bold text-[#00ff88] font-mono">{ip.pricing}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00d2ff]/10 to-[#00ff88]/10 border border-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">{ip.prefix} Number Range</h3>
                    <span className="text-[11px] text-[#00ff88] block font-mono">Route Type: {ip.routeType}</span>
                  </div>
                </div>

                <div className="text-xs text-[#8a99ad] space-y-1 font-mono">
                  <p>Protocol: <strong className="text-white">SIP Trunking / Kamailio SBC</strong></p>
                  <p>HD Audio / G.711 / Opus: <strong className="text-[#00ff88]">Supported</strong></p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {isOwned ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#00ff88] font-mono font-bold bg-[#00ff88]/10 px-3 py-1.5 rounded-xl border border-[#00ff88]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Provisioned &amp; Active</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleOrderIP(ip)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition flex items-center justify-center gap-2 font-mono shadow-lg shadow-[#00d2ff]/15"
                  >
                    <span>Provision IP Number</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}