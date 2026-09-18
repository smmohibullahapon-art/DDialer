'use client';

import React, { useState } from 'react';
import {
  Code2,
  Key,
  Webhook,
  Copy,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Eye,
  EyeOff,
  Terminal,
  ExternalLink,
  Trash2,
  Clock,
  AlertTriangle,
  Send,
  Radio,
  FileCode2,
  Check
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  prefix: string;
  secret: string;
  role: 'FULL_ACCESS' | 'READ_ONLY' | 'SMS_DISPATCH_ONLY';
  created: string;
  lastUsed: string;
  status: 'ACTIVE' | 'REVOKED';
}

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: 'HEALTHY' | 'FAILING';
  lastDelivery: string;
  successRate: number;
}

const INITIAL_KEYS: APIKey[] = [
  {
    id: 'key-1',
    name: 'Production Core Backend Relay',
    prefix: 'dd_live_9a8f...',
    secret: 'dd_live_9a8f12c34b5e67890123456789abcdef0123',
    role: 'FULL_ACCESS',
    created: '10 Aug 2026',
    lastUsed: '4 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'key-2',
    name: 'E-Commerce OTP Dispatch Worker',
    prefix: 'dd_live_4b7c...',
    secret: 'dd_live_4b7c33e89a1b2c3d4e5f6a7b8c9d0e1f2a3b',
    role: 'SMS_DISPATCH_ONLY',
    created: '22 Aug 2026',
    lastUsed: '12 mins ago',
    status: 'ACTIVE',
  },
  {
    id: 'key-3',
    name: 'BI / Metabase Read-Only Analytics',
    prefix: 'dd_live_1d2e...',
    secret: 'dd_live_1d2e55f67a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    role: 'READ_ONLY',
    created: '01 Sep 2026',
    lastUsed: '2 hours ago',
    status: 'ACTIVE',
  },
];

const INITIAL_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: 'wh-1',
    url: 'https://api.dialdynamic.com/webhooks/call-events',
    events: ['call.initiated', 'call.answered', 'call.completed', 'call.recording.ready'],
    status: 'HEALTHY',
    lastDelivery: '2 mins ago (200 OK)',
    successRate: 99.98,
  },
  {
    id: 'wh-2',
    url: 'https://api.dialdynamic.com/webhooks/sms-dlr',
    events: ['sms.submitted', 'sms.delivered', 'sms.failed'],
    status: 'HEALTHY',
    lastDelivery: '14 mins ago (200 OK)',
    successRate: 100.0,
  },
  {
    id: 'wh-3',
    url: 'https://crm.clientcorp.com/api/v1/inbound-voice',
    events: ['ivr.dtmf.collected', 'queue.agent.assigned'],
    status: 'HEALTHY',
    lastDelivery: '1 hour ago (200 OK)',
    successRate: 98.4,
  },
];

export default function DeveloperAPIPage() {
  const [keys, setKeys] = useState<APIKey[]>(INITIAL_KEYS);
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(INITIAL_WEBHOOKS);
  const [activeTab, setActiveTab] = useState<'KEYS' | 'WEBHOOKS' | 'DOCS'>('KEYS');
  const [showSecretMap, setShowSecretMap] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleShowSecret = (id: string) => {
    setShowSecretMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Developer APIs & Webhook Subscriptions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              REST v1 &amp; OpenAPI
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Programmatic control for Outbound SIP calls, Bulk SMS, AI speech transcripts, and webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
          <span className="text-xs text-[#00ff88] font-mono">mTLS &amp; HMAC-SHA256 Signed</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active API Keys</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">{keys.length} Tokens</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Scope-Enforced</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Daily API Volume</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">148.2k Req</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Rate Limit: 500 RPS</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Webhook Delivery SLA</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">99.98%</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Avg Latency: 42ms</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">API Auth Failures</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">0.00%</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Zero Intrusion Alerts</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('KEYS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'KEYS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Access Keys ({keys.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('WEBHOOKS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'WEBHOOKS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Webhook className="w-4 h-4" />
          <span>Webhook Endpoints ({webhooks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DOCS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'DOCS'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>cURL &amp; SDK Quickstart</span>
        </button>
      </div>

      {/* View 1: API Keys List */}
      {activeTab === 'KEYS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Production Access Tokens</h3>
            <button
              onClick={() => alert('Generate API Key modal ready.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Generate New Token</span>
            </button>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#8a99ad]">
                <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
                  <tr>
                    <th className="py-3.5 px-4">Token Name</th>
                    <th className="py-3.5 px-4">Scope / Role</th>
                    <th className="py-3.5 px-4">Secret Key</th>
                    <th className="py-3.5 px-4">Created</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {keys.map((k) => (
                    <tr key={k.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4 font-sans font-semibold text-white">{k.name}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] text-[10px] border border-white/10">
                          {k.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white/90">
                            {showSecretMap[k.id] ? k.secret : k.prefix}
                          </span>
                          <button
                            onClick={() => toggleShowSecret(k.id)}
                            className="p-1 text-[#8a99ad] hover:text-white transition"
                            title={showSecretMap[k.id] ? 'Hide Secret' : 'Reveal Secret'}
                          >
                            {showSecretMap[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(k.secret, k.id)}
                            className="p-1 text-[#8a99ad] hover:text-white transition"
                            title="Copy Key"
                          >
                            {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#8a99ad]">{k.created}</td>
                      <td className="py-4 px-4 text-[#00ff88]">{k.lastUsed}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => alert(`Revoked key: ${k.name}`)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                          title="Revoke Token"
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
      )}

      {/* View 2: Webhooks List */}
      {activeTab === 'WEBHOOKS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Event Delivery Endpoints</h3>
            <button
              onClick={() => alert('Register Webhook modal ready.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Register Webhook</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold uppercase">
                      {wh.status}
                    </span>
                    <button
                      onClick={() => alert(`Test ping dispatched to ${wh.url}`)}
                      className="text-xs text-[#00d2ff] hover:underline"
                    >
                      Send Test Ping
                    </button>
                  </div>

                  <p className="text-xs font-mono font-bold text-white break-all">{wh.url}</p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#8a99ad] uppercase tracking-wider block font-bold">Subscribed Events</span>
                    <div className="flex flex-wrap gap-1.5">
                      {wh.events.map((ev, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/90 border border-white/10">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#8a99ad] flex justify-between">
                  <span>Last: {wh.lastDelivery}</span>
                  <span className="text-[#00ff88] font-bold">{wh.successRate}% SLA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: cURL and SDK Quickstart */}
      {activeTab === 'DOCS' && (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Telephony &amp; SMS API Quickstart</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Use your secret token in the Authorization Bearer header.</p>
          </div>

          <div className="space-y-4">
            {/* cURL Call */}
            <div className="p-4 rounded-2xl bg-[#070913] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#8a99ad] border-b border-white/10 pb-2">
                <span>1. Initiate Outbound Call (cURL)</span>
                <button
                  onClick={() => alert('cURL command copied!')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-[11px] text-[#00d2ff] leading-relaxed overflow-x-auto">
{`curl -X POST https://api.ddialer.xyz/v1/voice/calls \\
  -H "Authorization: Bearer dd_live_9a8f12c34b5e67890123456789abcdef0123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "callerId": "+8809612000000",
    "destination": "+8801712345678",
    "record": true,
    "transcribe": true,
    "webhookUrl": "https://api.yourdomain.com/callbacks"
  }'`}
              </pre>
            </div>

            {/* cURL SMS */}
            <div className="p-4 rounded-2xl bg-[#070913] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#8a99ad] border-b border-white/10 pb-2">
                <span>2. Dispatch Masking SMS (cURL)</span>
                <button
                  onClick={() => alert('cURL command copied!')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-[11px] text-[#00ff88] leading-relaxed overflow-x-auto">
{`curl -X POST https://api.ddialer.xyz/v1/sms/send \\
  -H "Authorization: Bearer dd_live_9a8f12c34b5e67890123456789abcdef0123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "senderId": "DDialer",
    "recipient": "+8801712345678",
    "message": "Your verification code is 482910. Valid for 5 mins."
  }'`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}