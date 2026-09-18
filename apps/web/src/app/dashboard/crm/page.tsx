'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
  Mail,
  Building,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  CheckCircle2,
  FileText,
  Send,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Filter,
  DollarSign,
  UserCheck
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'CALL' | 'SMS' | 'NOTE' | 'AI_INSIGHT' | 'DEAL';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
  badge?: string;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  metadata?: {
    duration?: string;
    direction?: 'INBOUND' | 'OUTBOUND';
    cost?: string;
  };
}

interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  stage: 'CUSTOMER' | 'LEAD' | 'OPPORTUNITY' | 'VIP';
  totalSpendBDT: number;
  totalCalls: number;
  totalSMS: number;
  lastActive: string;
  timeline: TimelineEvent[];
}

const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'ct-01',
    name: 'Rahim Chowdhury',
    company: 'Chowdhury Textiles & Garments Ltd',
    phone: '+8801712345678',
    email: 'rahim@chowdhurytextiles.com',
    stage: 'VIP',
    totalSpendBDT: 48500,
    totalCalls: 34,
    totalSMS: 820,
    lastActive: '12 mins ago',
    timeline: [
      {
        id: 'ev-1',
        type: 'CALL',
        title: 'Inbound SIP Consultation Call',
        description: 'Customer verified 20 concurrent SIP channel top-up of ৳ 15,000. Expressed high satisfaction with 14ms latency.',
        timestamp: 'Today 04:12 AM',
        agent: 'Tasnim Munni',
        sentiment: 'POSITIVE',
        metadata: { duration: '03m 04s', direction: 'INBOUND', cost: '৳ 1.38' }
      },
      {
        id: 'ev-2',
        type: 'AI_INSIGHT',
        title: 'AI Whisper Action Extracted',
        description: 'Assigned DID +8809612000000. Customer agreed to receive automated BTRC billing receipts via WhatsApp.',
        timestamp: 'Today 04:15 AM',
        badge: 'Whisper LLM'
      },
      {
        id: 'ev-3',
        type: 'SMS',
        title: 'Masked Transactional SMS Dispatched',
        description: 'Dear Customer, your DDialer Prepaid top-up of BDT 15,000 is successful. Balance: BDT 15,000.',
        timestamp: 'Today 04:16 AM',
        metadata: { cost: '৳ 0.45' }
      },
      {
        id: 'ev-4',
        type: 'NOTE',
        title: 'Internal Account Note Added',
        description: 'Enterprise VIP tier SLA applies. Route future calls directly to Senior Account Executive pool without IVR wait.',
        timestamp: 'Yesterday 02:40 PM',
        agent: 'Mahfuzur Rahman'
      }
    ]
  },
  {
    id: 'ct-02',
    name: 'Farhana Yasmin',
    company: 'Fintech Solutions BD',
    phone: '+8801677889900',
    email: 'farhana@fintechbd.io',
    stage: 'CUSTOMER',
    totalSpendBDT: 21400,
    totalCalls: 18,
    totalSMS: 4250,
    lastActive: '2 hours ago',
    timeline: [
      {
        id: 'ev-5',
        type: 'SMS',
        title: 'Promotional Bulk SMS Broadcast',
        description: 'Eid Flash Campaign broadcast sent via direct Robi/GP SMPP Gateway.',
        timestamp: 'Yesterday 06:30 PM',
        metadata: { cost: '৳ 1,912.50' }
      },
      {
        id: 'ev-6',
        type: 'CALL',
        title: 'Outbound Verification Call',
        description: 'Follow-up regarding DLR delivery receipt query. Route successfully verified.',
        timestamp: 'Yesterday 11:20 AM',
        agent: 'Farhana Sultana',
        sentiment: 'NEUTRAL',
        metadata: { duration: '01m 45s', direction: 'OUTBOUND', cost: '৳ 0.79' }
      }
    ]
  },
  {
    id: 'ct-03',
    name: 'Tanvir Ahmed',
    company: 'Apex Logistics & Freight',
    phone: '+8801822334455',
    email: 'tanvir@apexlogistics.com.bd',
    stage: 'LEAD',
    totalSpendBDT: 0,
    totalCalls: 4,
    totalSMS: 12,
    lastActive: '1 day ago',
    timeline: [
      {
        id: 'ev-7',
        type: 'CALL',
        title: 'Initial Discovery Inbound Call',
        description: 'Customer inquired about 0800 Toll-free enterprise pricing and softphone integration.',
        timestamp: 'Yesterday 03:15 PM',
        agent: 'Support Pool',
        sentiment: 'POSITIVE',
        metadata: { duration: '04m 10s', direction: 'INBOUND', cost: '৳ 1.88' }
      }
    ]
  }
];

export default function ContactsCRMPage() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [selectedContact, setSelectedContact] = useState<Contact>(INITIAL_CONTACTS[0]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [quickNote, setQuickNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNote.trim()) return;

    const newEvent: TimelineEvent = {
      id: `ev-${Date.now()}`,
      type: 'NOTE',
      title: 'Agent Timeline Note',
      description: quickNote,
      timestamp: 'Just Now',
      agent: 'Tasnim Munni'
    };

    const updatedContact = {
      ...selectedContact,
      timeline: [newEvent, ...selectedContact.timeline]
    };

    setSelectedContact(updatedContact);
    setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
    setQuickNote('');
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesStage = stageFilter === 'ALL' || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Contacts & Omnichannel CRM</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Unified Timeline
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            End-to-end customer profiles, call logs, SMS threads, and AI-driven lifecycle tracking.
          </p>
        </div>

        <button
          onClick={() => alert('Add Contact modal initialized.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Contact / Lead</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total CRM Directory</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">{contacts.length} Profiles</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">100% Telecom Sync</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Enterprise VIP Tier</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {contacts.filter((c) => c.stage === 'VIP').length} Accounts
            </h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">High Priority Route</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Pipeline Leads</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">
              {contacts.filter((c) => c.stage === 'LEAD').length} In Follow-Up
            </h3>
          </div>
          <span className="text-[11px] text-[#9d4edd] mt-1 block font-mono">DDialer Flow Active</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Directory LTV Value</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              ৳ {contacts.reduce((acc, c) => acc + c.totalSpendBDT, 0).toLocaleString()}
            </h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">BTRC BDT Ledger</span>
        </div>
      </div>

      {/* Main CRM Grid: Left Directory + Right Omnichannel Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Contacts Directory */}
        <div className="lg:col-span-4 rounded-3xl bg-white/[0.03] border border-white/10 p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, or phone..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
            {['ALL', 'VIP', 'CUSTOMER', 'LEAD'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-2.5 py-1 rounded-lg border font-mono transition ${
                  stageFilter === st
                    ? 'bg-[#00d2ff]/15 border-[#00d2ff]/40 text-[#00d2ff]'
                    : 'bg-white/5 border-white/5 text-[#8a99ad] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                  selectedContact.id === contact.id
                    ? 'bg-white/[0.08] border-[#00d2ff]/40 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white line-clamp-1">{contact.name}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      contact.stage === 'VIP'
                        ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                        : contact.stage === 'CUSTOMER'
                        ? 'bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30'
                        : 'bg-[#9d4edd]/10 text-[#9d4edd] border border-[#9d4edd]/30'
                    }`}
                  >
                    {contact.stage}
                  </span>
                </div>

                <p className="text-[11px] text-[#8a99ad] mt-0.5 line-clamp-1">{contact.company}</p>
                <p className="text-xs font-mono text-[#00d2ff] mt-1">{contact.phone}</p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-[#8a99ad] font-mono">
                  <span>Spend: ৳ {contact.totalSpendBDT.toLocaleString()}</span>
                  <span>{contact.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Customer Profile & Interactive Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Header Card */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00d2ff]/20 to-[#9d4edd]/20 border border-white/10 flex items-center justify-center font-bold text-lg text-white font-mono">
                  {selectedContact.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-bold text-white">{selectedContact.name}</h2>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                      {selectedContact.stage}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8a99ad] mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {selectedContact.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[#00d2ff]">
                      <Phone className="w-3.5 h-3.5" />
                      {selectedContact.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Dialing ${selectedContact.phone} via WebRTC softphone...`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/20 font-bold text-xs transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Softphone</span>
                </button>

                <button
                  onClick={() => alert(`Opening SMS composer for ${selectedContact.phone}...`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send SMS</span>
                </button>
              </div>
            </div>

            {/* Quick Lifetime Metrics */}
            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-[#070913] border border-white/5">
                <span className="text-[10px] text-[#8a99ad] block uppercase">Lifetime Spend</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  ৳ {selectedContact.totalSpendBDT.toLocaleString()} BDT
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#070913] border border-white/5">
                <span className="text-[10px] text-[#8a99ad] block uppercase">Voice Calls</span>
                <span className="text-sm font-bold text-[#00d2ff] mt-0.5 block">
                  {selectedContact.totalCalls} Sessions
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#070913] border border-white/5">
                <span className="text-[10px] text-[#8a99ad] block uppercase">SMS Dispatches</span>
                <span className="text-sm font-bold text-[#9d4edd] mt-0.5 block">
                  {selectedContact.totalSMS} Parts
                </span>
              </div>
            </div>

            {/* Add Internal Timeline Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Log a call note, follow-up, or CRM update..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Log Note</span>
              </button>
            </form>
          </div>

          {/* Omnichannel Interaction Timeline */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00d2ff]" />
                <span>Omnichannel Communication History</span>
              </h3>
              <span className="text-xs text-[#8a99ad] font-mono">BTRC 90-Day Retention</span>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
              {selectedContact.timeline.map((event) => (
                <div key={event.id} className="relative flex items-start gap-4 pl-1">
                  {/* Event Marker */}
                  <div className="w-7 h-7 rounded-full bg-[#070913] border border-white/20 flex items-center justify-center shrink-0 z-10 text-xs">
                    {event.type === 'CALL' && <PhoneIncoming className="w-3.5 h-3.5 text-[#00ff88]" />}
                    {event.type === 'SMS' && <MessageSquare className="w-3.5 h-3.5 text-[#00d2ff]" />}
                    {event.type === 'AI_INSIGHT' && <Sparkles className="w-3.5 h-3.5 text-[#9d4edd]" />}
                    {event.type === 'NOTE' && <FileText className="w-3.5 h-3.5 text-amber-400" />}
                  </div>

                  {/* Event Content Box */}
                  <div className="flex-1 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-white/15 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{event.title}</span>
                        {event.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9d4edd]/10 text-[#9d4edd] border border-[#9d4edd]/30">
                            {event.badge}
                          </span>
                        )}
                        {event.sentiment && (
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              event.sentiment === 'POSITIVE'
                                ? 'bg-[#00ff88]/10 text-[#00ff88]'
                                : 'bg-white/5 text-[#8a99ad]'
                            }`}
                          >
                            {event.sentiment}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#8a99ad]">{event.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#8a99ad] leading-relaxed">{event.description}</p>

                    {(event.agent || event.metadata) && (
                      <div className="flex items-center gap-3 pt-2 mt-2 border-t border-white/5 text-[10px] font-mono text-[#8a99ad]">
                        {event.agent && <span>Agent: <strong className="text-white">{event.agent}</strong></span>}
                        {event.metadata?.duration && <span>Duration: <strong className="text-white">{event.metadata.duration}</strong></span>}
                        {event.metadata?.cost && <span>Cost: <strong className="text-[#00ff88]">{event.metadata.cost}</strong></span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}