'use client';

import React, { useState } from 'react';
import {
  Webhook,
  Plus,
  Radio,
  CheckCircle2,
  Trash2,
  Send,
  Lock,
  Globe,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secretKey: string;
  successRate: number;
  status: 'ACTIVE' | 'PAUSED';
  lastDispatched: string;
}

const INITIAL_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: 'wh-01',
    url: 'https://api.chowdhurytextiles.com/telecom/webhooks',
    events: ['call.ended', 'recording.ready', 'sms.delivered'],
    secretKey: 'whsec_99182049182049182',
    successRate: 99.8,
    status: 'ACTIVE',
    lastDispatched: '4 mins ago',
  },
  {
    id: 'wh-02',
    url: 'https://fintechbd.com/api/v1/sip-events',
    events: ['call.started', 'call.ended'],
    secretKey: 'whsec_48192048192048192',
    successRate: 100.0,
    status: 'ACTIVE',
    lastDispatched: '18 mins ago',
  },
];

export default function WebhooksManagerPage() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(INITIAL_WEBHOOKS);
  const [notice, setNotice] = useState<string | null>(null);

  const testWebhook = (url: string) => {
    setNotice(`Test event payload (call.ended) successfully dispatched to ${url} (HTTP 200 OK).`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Real-Time Webhooks &amp; Event Subscriptions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Postback Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Configure HTTP postback endpoints for real-time call telemetry, CDR delivery, and AI transcription triggers.
          </p>
        </div>

        <button
          onClick={() => alert('New Webhook endpoint wizard initialized.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Webhook Endpoint</span>
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

      {/* Webhooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {webhooks.map((wh) => (
          <div
            key={wh.id}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 inline-block mb-1">
                    {wh.id}
                  </span>
                  <h3 className="text-xs font-bold text-white font-mono break-all">{wh.url}</h3>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                  {wh.status}
                </span>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-mono text-[#8a99ad] block">Subscribed Events:</span>
                <div className="flex flex-wrap gap-1.5">
                  {wh.events.map((ev, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-white border border-white/10 text-[10px] font-mono">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#070913] border border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#8a99ad] truncate">Secret: {wh.secretKey}</span>
                <span className="text-[#00ff88] font-bold shrink-0 ml-2">{wh.successRate}% Success</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-[#8a99ad]">Last: {wh.lastDispatched}</span>
              <button
                onClick={() => testWebhook(wh.url)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 hover:bg-[#00d2ff]/30 transition text-[11px] font-bold"
              >
                <Send className="w-3 h-3" />
                <span>Test Ping</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}