'use client';

import React, { useState } from 'react';
import {
  Key,
  Plus,
  ShieldCheck,
  Copy,
  Trash2,
  CheckCircle2,
  Lock,
  Terminal,
  RefreshCw,
  Globe
} from 'lucide-react';

interface APIKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  scope: string;
  createdAt: string;
  lastUsed: string;
}

const INITIAL_KEYS: APIKeyItem[] = [
  {
    id: 'key-01',
    name: 'Production CRM Integration Key',
    keyPrefix: 'dd_live_99182049...',
    scope: 'Full Access (Calls, SMS, DIDs)',
    createdAt: '10 Jan 2026',
    lastUsed: '2 mins ago',
  },
  {
    id: 'key-02',
    name: 'Mobile App Softphone SDK Key',
    keyPrefix: 'dd_live_48192038...',
    scope: 'WebRTC SIP & Diarization',
    createdAt: '01 Feb 2026',
    lastUsed: '14 mins ago',
  },
];

export default function APIKeysManagerPage() {
  const [keys, setKeys] = useState<APIKeyItem[]>(INITIAL_KEYS);
  const [notice, setNotice] = useState<string | null>(null);

  const generateNewKey = () => {
    const newKey: APIKeyItem = {
      id: `key-${Date.now().toString().slice(-4)}`,
      name: 'New Production Integration Key',
      keyPrefix: `dd_live_${Math.floor(10000000 + Math.random() * 90000000)}...`,
      scope: 'Standard Read/Write',
      createdAt: 'Just Now',
      lastUsed: 'Never',
    };
    setKeys([newKey, ...keys]);
    setNotice('New API access token generated successfully. Copy it securely.');
    setTimeout(() => setNotice(null), 3500);
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
    setNotice('API key revoked successfully.');
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>API Keys &amp; Developer Credentials</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              OAuth2 &amp; Bearer Tokens
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Generate and manage secure API access tokens for programmatic telephony control and CRM integrations.
          </p>
        </div>

        <button
          onClick={generateNewKey}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Generate New Key</span>
        </button>
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

      {/* Keys Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Key Name</th>
                <th className="py-3.5 px-4">Token Prefix</th>
                <th className="py-3.5 px-4">Permission Scope</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4">Last Used</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans">{k.name}</td>
                  <td className="py-4 px-4 text-[#00d2ff]">{k.keyPrefix}</td>
                  <td className="py-4 px-4 text-white/90">{k.scope}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{k.createdAt}</td>
                  <td className="py-4 px-4 text-[#00ff88]">{k.lastUsed}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => deleteKey(k.id)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-rose-400 hover:bg-rose-500/20 transition"
                      title="Revoke Key"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}