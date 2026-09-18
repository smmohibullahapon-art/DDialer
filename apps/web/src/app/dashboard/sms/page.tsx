'use client';

import React, { useState } from 'react';
import {
  MessageSquareText,
  Send,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Search,
  Sparkles,
  Layers,
  Tag,
  Radio,
  Download,
  Filter,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SMSCampaign {
  id: string;
  title: string;
  senderId: string;
  routeType: 'MASKING' | 'NON_MASKING';
  totalRecipients: number;
  delivered: number;
  failed: number;
  deliveryRate: number;
  costBDT: number;
  status: 'COMPLETED' | 'DISPATCHING' | 'SCHEDULED';
  dispatchedAt: string;
}

interface SMSTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
}

const INITIAL_CAMPAIGNS: SMSCampaign[] = [
  {
    id: 'sms-cmp-01',
    title: 'Eid Flash Sale Promo Broadcast',
    senderId: 'DDialer',
    routeType: 'MASKING',
    totalRecipients: 4250,
    delivered: 4218,
    failed: 32,
    deliveryRate: 99.2,
    costBDT: 1912.5,
    status: 'COMPLETED',
    dispatchedAt: 'Yesterday 06:30 PM',
  },
  {
    id: 'sms-cmp-02',
    title: 'Prepaid Wallet Low Balance Alert',
    senderId: 'DDialerAlert',
    routeType: 'MASKING',
    totalRecipients: 180,
    delivered: 180,
    failed: 0,
    deliveryRate: 100.0,
    costBDT: 81.0,
    status: 'COMPLETED',
    dispatchedAt: 'Today 02:15 AM',
  },
  {
    id: 'sms-cmp-03',
    title: 'Q4 National Inbound Lead Follow-up',
    senderId: '+8809612000000',
    routeType: 'NON_MASKING',
    totalRecipients: 1540,
    delivered: 1220,
    failed: 12,
    deliveryRate: 98.4,
    costBDT: 431.2,
    status: 'DISPATCHING',
    dispatchedAt: 'Today 04:30 AM',
  },
];

const TEMPLATES: SMSTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Transactional OTP / Verification',
    category: 'Security',
    content: 'Your DDialer verification code is {{otp}}. Valid for 5 minutes. Do not share this PIN.',
  },
  {
    id: 'tpl-2',
    name: 'Payment & Deposit Confirmation',
    category: 'Billing',
    content: 'Dear {{name}}, we received ৳ {{amount}} for DDialer SIP Services. Current balance: ৳ {{balance}}.',
  },
  {
    id: 'tpl-3',
    name: 'Missed Call Notification',
    category: 'Telecom',
    content: 'Assalamu Alaikum {{name}}, our executive tried calling you regarding your inquiry. Please call back at +8809612000000.',
  },
];

export default function BulkSMSPage() {
  const [campaigns, setCampaigns] = useState<SMSCampaign[]>(INITIAL_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState<'CAMPAIGNS' | 'COMPOSE' | 'TEMPLATES'>('CAMPAIGNS');

  // Compose State
  const [senderId, setSenderId] = useState('DDialer (Masking)');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');

  // Character calculation
  const charCount = message.length;
  const isUnicode = /[^\u0000-\u007f]/.test(message);
  const maxCharsPerPart = isUnicode ? 70 : 160;
  const parts = Math.max(1, Math.ceil(charCount / maxCharsPerPart) || 1);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !recipients) return;

    const recipientList = recipients.split(/[\n,]+/).filter((r) => r.trim().length > 0);
    const count = recipientList.length;

    const newCampaign: SMSCampaign = {
      id: `sms-cmp-${Date.now().toString().slice(-4)}`,
      title: `Direct Broadcast (${count} Contacts)`,
      senderId: senderId.includes('Masking') ? 'DDialer' : '+8809612000000',
      routeType: senderId.includes('Masking') ? 'MASKING' : 'NON_MASKING',
      totalRecipients: count,
      delivered: count,
      failed: 0,
      deliveryRate: 100.0,
      costBDT: count * (senderId.includes('Masking') ? 0.45 : 0.28) * parts,
      status: 'COMPLETED',
      dispatchedAt: 'Just Now',
    };

    setCampaigns([newCampaign, ...campaigns]);
    setActiveTab('CAMPAIGNS');
    setMessage('');
    setRecipients('');
    alert(`Broadcast submitted: ${count} recipients via ${senderId} across ${parts} SMS parts.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Bulk SMS & Multi-Channel Messaging</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              SMPP v3.4 Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            BTRC-compliant alphanumeric sender IDs, Unicode support, and carrier delivery receipts.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('COMPOSE')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
          <span>Compose New Broadcast</span>
        </button>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">SMS Dispatched Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">5,970 Parts</h3>
            <span className="text-[11px] text-[#00ff88]">SMPP 3.4 Live</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Delivery Success (DLR)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">99.1%</h3>
            <span className="text-[11px] text-[#00ff88]">Avg Latency: 1.8s</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Masking CLIs</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">2 Senders</h3>
            <span className="text-[11px] text-[#00d2ff]">BTRC Verified</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">SMS Cost Spend</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">৳ 2,424.70</h3>
            <span className="text-[11px] text-[#8a99ad]">Prepaid Settled</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('CAMPAIGNS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'CAMPAIGNS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Broadcast Campaigns ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COMPOSE')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'COMPOSE'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Fast SMS Dispatcher</span>
        </button>

        <button
          onClick={() => setActiveTab('TEMPLATES')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'TEMPLATES'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Dynamic Templates ({TEMPLATES.length})</span>
        </button>
      </div>

      {/* View 1: Broadcast Campaigns List */}
      {activeTab === 'CAMPAIGNS' && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Dispatched SMS Outbox</h3>
            <span className="text-xs text-[#8a99ad] font-mono">DLR Handshake Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#8a99ad]">
              <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
                <tr>
                  <th className="py-3.5 px-4">Campaign Title</th>
                  <th className="py-3.5 px-4">Sender ID</th>
                  <th className="py-3.5 px-4">Recipients</th>
                  <th className="py-3.5 px-4">Delivered</th>
                  <th className="py-3.5 px-4">Delivery SLA</th>
                  <th className="py-3.5 px-4">Cost (BDT)</th>
                  <th className="py-3.5 px-4">Dispatched At</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4 font-semibold text-white">{c.title}</td>
                    <td className="py-4 px-4 font-mono text-[#00d2ff]">{c.senderId}</td>
                    <td className="py-4 px-4 font-mono text-white">{c.totalRecipients.toLocaleString()}</td>
                    <td className="py-4 px-4 font-mono text-[#00ff88]">{c.delivered.toLocaleString()}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#00ff88]">{c.deliveryRate}%</td>
                    <td className="py-4 px-4 font-mono text-white">৳ {c.costBDT.toFixed(2)}</td>
                    <td className="py-4 px-4 text-[#8a99ad] font-mono">{c.dispatchedAt}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Compose Broadcast */}
      {activeTab === 'COMPOSE' && (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 max-w-3xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white">Instant SMS Campaign Dispatcher</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Dispatches SMS directly to GP, Robi, Banglalink, and Teletalk gateways.</p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">
                Approved Sender CLI (Masking / Non-Masking)
              </label>
              <select
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                className="w-full bg-[#070913] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              >
                <option value="DDialer (Masking)">DDialer — Alphanumeric Masking (৳ 0.45/part)</option>
                <option value="DDialerAlert (Masking)">DDialerAlert — Alphanumeric Masking (৳ 0.45/part)</option>
                <option value="+8809612000000 (Non-Masking)">+8809612000000 — Numeric DID (৳ 0.28/part)</option>
              </select>
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">
                Recipients (Comma or line separated +880 Numbers)
              </label>
              <textarea
                rows={3}
                required
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="+8801712345678, +8801911987654..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[#8a99ad] font-medium uppercase tracking-wider">Message Content</label>
                <span className="text-[11px] font-mono text-[#00d2ff]">
                  {charCount} Chars • {parts} Part(s) {isUnicode ? '(Unicode / Bangla)' : '(GSM 7-bit)'}
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your SMS message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Broadcast Now</span>
            </button>
          </form>
        </div>
      )}

      {/* View 3: SMS Templates */}
      {activeTab === 'TEMPLATES' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{tpl.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10">
                    {tpl.category}
                  </span>
                </div>
                <p className="text-xs text-[#8a99ad] mt-3 font-mono bg-[#070913] p-3 rounded-xl border border-white/5 leading-relaxed">
                  "{tpl.content}"
                </p>
              </div>

              <button
                onClick={() => {
                  setMessage(tpl.content);
                  setActiveTab('COMPOSE');
                }}
                className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-medium text-xs transition"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}