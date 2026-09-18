'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
  Send,
  PhoneCall,
  User,
  ShieldCheck,
  Tag,
  Radio,
  FileText,
  Paperclip,
  TrendingUp,
  Headphones
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketCode: string;
  subject: string;
  category: 'SIP_TRUNK' | 'SMS_SMPP' | 'BILLING' | 'DID_NUMBER' | 'GENERAL';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_ON_CLIENT' | 'RESOLVED';
  assignedAgent: string;
  customerName: string;
  customerCompany: string;
  createdAt: string;
  lastReply: string;
  messages: {
    sender: 'CUSTOMER' | 'AGENT';
    name: string;
    timestamp: string;
    text: string;
  }[];
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 't-101',
    ticketCode: 'TICK-9082',
    subject: 'AmberIT Backup Route Latency Spike during Campaign',
    category: 'SIP_TRUNK',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedAgent: 'Mahfuzur Rahman (NOC)',
    customerName: 'Rahim Chowdhury',
    customerCompany: 'Chowdhury Textiles Ltd',
    createdAt: 'Today 03:15 AM',
    lastReply: '14 mins ago',
    messages: [
      {
        sender: 'CUSTOMER',
        name: 'Rahim Chowdhury',
        timestamp: '03:15 AM',
        text: 'During our 3:00 AM broadcast, we noticed packet delay exceeding 80ms on AmberIT backup route. Could you inspect whether the failover switch triggered properly?',
      },
      {
        sender: 'AGENT',
        name: 'Mahfuzur Rahman',
        timestamp: '03:28 AM',
        text: 'Assalamu Alaikum Rahim. Our NOC telemetry detected the jitter on SBC-02 and our Smart Routing engine rerouted your priority traffic to the BTCL National route seamlessly. We are investigating the upstream peering with AmberIT.',
      },
    ],
  },
  {
    id: 't-102',
    ticketCode: 'TICK-9081',
    subject: 'BTRC Masking Approval for Sender ID "DDialerOffer"',
    category: 'SMS_SMPP',
    priority: 'MEDIUM',
    status: 'WAITING_ON_CLIENT',
    assignedAgent: 'Tasnim Munni',
    customerName: 'Farhana Yasmin',
    customerCompany: 'Fintech Solutions BD',
    createdAt: 'Yesterday 04:30 PM',
    lastReply: '2 hours ago',
    messages: [
      {
        sender: 'CUSTOMER',
        name: 'Farhana Yasmin',
        timestamp: 'Yesterday 04:30 PM',
        text: 'We submitted our trade license copy for a new alphanumeric masking ID. What is the current verification timeline?',
      },
      {
        sender: 'AGENT',
        name: 'Tasnim Munni',
        timestamp: 'Yesterday 05:10 PM',
        text: 'We forwarded the paperwork to Teletalk and GP regulatory desks. Please upload your updated TIN certificate in the portal to complete BTRC KYC.',
      },
    ],
  },
  {
    id: 't-103',
    ticketCode: 'TICK-9079',
    subject: 'Prepaid Wallet Top-Up VAT Invoice Download issue',
    category: 'BILLING',
    priority: 'LOW',
    status: 'RESOLVED',
    assignedAgent: 'Support Billing Pool',
    customerName: 'Tanvir Ahmed',
    customerCompany: 'Apex Logistics BD',
    createdAt: '15 Sep 2026',
    lastReply: '1 day ago',
    messages: [
      {
        sender: 'CUSTOMER',
        name: 'Tanvir Ahmed',
        timestamp: '15 Sep 10:00 AM',
        text: 'I completed a deposit of BDT 15,000 via bKash but the automated VAT challan PDF was not attached to my email.',
      },
      {
        sender: 'AGENT',
        name: 'Billing Bot',
        timestamp: '15 Sep 10:05 AM',
        text: 'The BTRC-compliant 15% Mushak-6.3 VAT receipt has been re-generated and sent to tanvir@apexlogistics.com.bd. Ticket closed.',
      },
    ],
  },
];

export default function SupportDeskPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket>(INITIAL_TICKETS[0]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [replyText, setReplyText] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New ticket state
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<'SIP_TRUNK' | 'SMS_SMPP' | 'BILLING' | 'DID_NUMBER'>('SIP_TRUNK');
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [newDesc, setNewDesc] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      sender: 'AGENT' as const,
      name: 'Tasnim Munni (You)',
      timestamp: 'Just Now',
      text: replyText.trim(),
    };

    const updated = {
      ...selectedTicket,
      lastReply: 'Just now',
      messages: [...selectedTicket.messages, newMessage],
    };

    setSelectedTicket(updated);
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
    setReplyText('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDesc.trim()) return;

    const newTicket: SupportTicket = {
      id: `t-${Date.now().toString().slice(-4)}`,
      ticketCode: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      category: newCategory,
      priority: newPriority,
      status: 'OPEN',
      assignedAgent: 'Unassigned NOC Queue',
      customerName: 'Self (Admin)',
      customerCompany: 'Dial Dynamic Ltd',
      createdAt: 'Just Now',
      lastReply: 'Just Now',
      messages: [
        {
          sender: 'CUSTOMER',
          name: 'Tasnim Munni',
          timestamp: 'Just Now',
          text: newDesc,
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicket(newTicket);
    setIsNewModalOpen(false);
    setNewSubject('');
    setNewDesc('');
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketCode.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customerCompany.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Live Support &amp; Helpdesk</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              24/7 NOC Desk
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Enterprise ticketing for upstream SIP trunks, SMS SMPP queues, billing inquiries, and live chat.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Open Support Ticket</span>
        </button>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Open Tickets</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              {tickets.filter((t) => t.status !== 'RESOLVED').length} Active
            </h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">0 Critical Outages</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Avg First Response</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">4m 12s</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">SLA Target &lt; 15 mins</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">NOC Engineers Online</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">5 Engineers</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Tier-1 &amp; Tier-2 Roster</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Resolution SLA</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">98.9%</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Within 2-Hour Window</span>
        </div>
      </div>

      {/* Main Grid: Ticket List (Left) + Conversation Thread (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Ticket Feed */}
        <div className="lg:col-span-5 rounded-3xl bg-white/[0.03] border border-white/10 p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, subject, customer..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'WAITING_ON_CLIENT', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg border font-mono whitespace-nowrap transition ${
                  statusFilter === st
                    ? 'bg-[#00d2ff]/15 border-[#00d2ff]/40 text-[#00d2ff]'
                    : 'bg-white/5 border-white/5 text-[#8a99ad] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Ticket Items */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                  selectedTicket.id === t.id
                    ? 'bg-white/[0.08] border-[#00d2ff]/40 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00d2ff]">{t.ticketCode}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      t.priority === 'CRITICAL'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : t.priority === 'HIGH'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{t.subject}</h4>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-[#8a99ad] font-mono">
                  <span>{t.customerCompany}</span>
                  <span>{t.lastReply}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Ticket Conversation Thread */}
        <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col h-[680px] overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#00d2ff]">{selectedTicket.ticketCode}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white border border-white/10">
                    {selectedTicket.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      selectedTicket.status === 'RESOLVED'
                        ? 'bg-[#00ff88]/10 text-[#00ff88]'
                        : selectedTicket.status === 'IN_PROGRESS'
                        ? 'bg-[#00d2ff]/10 text-[#00d2ff]'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{selectedTicket.subject}</h3>
              </div>

              <div className="text-right text-[11px] text-[#8a99ad] font-mono shrink-0">
                <span>Assigned: <strong className="text-white">{selectedTicket.assignedAgent}</strong></span>
              </div>
            </div>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {selectedTicket.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'AGENT' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-[#8a99ad]">
                  <span className="font-bold text-white">{m.name}</span>
                  <span>• {m.timestamp}</span>
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-lg leading-relaxed ${
                    m.sender === 'AGENT'
                      ? 'bg-gradient-to-r from-[#00d2ff]/20 to-[#00ff88]/20 border border-[#00d2ff]/30 text-white'
                      : 'bg-white/5 border border-white/10 text-white/90'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Reply Input Box */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official NOC reply or troubleshooting update..."
                className="w-full bg-[#070913] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#8a99ad] font-mono">
                  Replies are instantly forwarded to the customer email &amp; webhook.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5 shadow-lg shadow-[#00d2ff]/20"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-[#00d2ff]" />
                <span>Open Telecom Incident Ticket</span>
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-[#8a99ad] hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. SIP Trunk Registration Timeout"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as typeof newCategory)}
                    className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="SIP_TRUNK">SIP Trunk &amp; VoIP</option>
                    <option value="SMS_SMPP">SMS Gateway &amp; DLR</option>
                    <option value="BILLING">Billing &amp; bKash Top-up</option>
                    <option value="DID_NUMBER">DID Number &amp; Toll-Free</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as typeof newPriority)}
                    className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="CRITICAL">Critical (Service Down)</option>
                    <option value="HIGH">High (Degraded QoS)</option>
                    <option value="MEDIUM">Medium (General Query)</option>
                    <option value="LOW">Low (Enhancement)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">
                  Incident Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe the issue, timestamps, error codes, or affected numbers..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
              >
                Submit Incident Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}