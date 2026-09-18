'use client';

import React, { useState } from 'react';
import {
  Send,
  Play,
  Pause,
  Plus,
  Users,
  PhoneCall,
  PhoneForwarded,
  Activity,
  Sliders,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  Tag,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

interface OutboundCampaign {
  id: string;
  name: string;
  mode: 'PREDICTIVE' | 'POWER' | 'PREVIEW';
  callerId: string;
  assignedQueue: string;
  totalLeads: number;
  contacted: number;
  connected: number;
  connectRate: number;
  pacingRatio: number;
  status: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  createdAt: string;
}

interface DispositionRule {
  id: string;
  label: string;
  action: 'RETRY_LATER' | 'DND' | 'CREATE_DEAL' | 'CLOSE';
  retryIntervalMins?: number;
  color: string;
}

const INITIAL_CAMPAIGNS: OutboundCampaign[] = [
  {
    id: 'cmp-01',
    name: 'Enterprise Cloud PBX Q3 Outbound Outreach',
    mode: 'PREDICTIVE',
    callerId: '+8809612000000',
    assignedQueue: 'Sales & BD SIP',
    totalLeads: 2500,
    contacted: 1420,
    connected: 1080,
    connectRate: 76.1,
    pacingRatio: 1.8,
    status: 'RUNNING',
    createdAt: 'Today 09:30 AM',
  },
  {
    id: 'cmp-02',
    name: 'Renewal & Payment Follow-Up Voice Broadcast',
    mode: 'POWER',
    callerId: '+8809638112233',
    assignedQueue: 'Billing & Account Verification',
    totalLeads: 850,
    contacted: 620,
    connected: 540,
    connectRate: 87.0,
    pacingRatio: 1.2,
    status: 'RUNNING',
    createdAt: 'Today 10:15 AM',
  },
  {
    id: 'cmp-03',
    name: 'High-Value VIP Lead Discovery',
    mode: 'PREVIEW',
    callerId: '+880800123456',
    assignedQueue: 'Enterprise NOC',
    totalLeads: 120,
    contacted: 95,
    connected: 84,
    connectRate: 88.4,
    pacingRatio: 1.0,
    status: 'PAUSED',
    createdAt: 'Yesterday 04:00 PM',
  },
];

const DISPOSITIONS: DispositionRule[] = [
  { id: 'disp-1', label: 'Interested / Demo Scheduled', action: 'CREATE_DEAL', color: 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/30' },
  { id: 'disp-2', label: 'Busy / Callback Requested', action: 'RETRY_LATER', retryIntervalMins: 60, color: 'text-[#00d2ff] bg-[#00d2ff]/10 border-[#00d2ff]/30' },
  { id: 'disp-3', label: 'No Answer / Voicemail', action: 'RETRY_LATER', retryIntervalMins: 120, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  { id: 'disp-4', label: 'Not Interested / Do Not Call', action: 'DND', color: 'text-rose-400 bg-rose-400/10 border-rose-400/30' },
];

export default function DialerCampaignsPage() {
  const [campaigns, setCampaigns] = useState<OutboundCampaign[]>(INITIAL_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState<'CAMPAIGNS' | 'DISPOSITIONS'>('CAMPAIGNS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id ? { ...c, status: c.status === 'RUNNING' ? 'PAUSED' : 'RUNNING' } : c
      )
    );
  };

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.callerId.includes(search) ||
      c.assignedQueue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Dialer & Outbound Campaigns</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Auto Pacing Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Predictive, power, and preview dialer campaigns with automated agent distribution.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Outbound Campaign</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Campaigns</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">
              {campaigns.filter((c) => c.status === 'RUNNING').length} / {campaigns.length}
            </h3>
            <span className="text-[11px] text-[#00ff88]">Live Channels Firing</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average Connect Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">81.5%</h3>
            <span className="text-[11px] text-[#00d2ff]">Target &gt; 70%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Dialer Drop Rate (SLA)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">1.8%</h3>
            <span className="text-[11px] text-[#00ff88]">BTRC Cap &lt; 3%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Contacted Leads</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">2,135</h3>
            <span className="text-[11px] text-[#8a99ad]">Across 3,470 Records</span>
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
          <Send className="w-4 h-4" />
          <span>Outbound Campaigns ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DISPOSITIONS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'DISPOSITIONS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Call Disposition & Retry Rules</span>
        </button>
      </div>

      {/* View 1: Active Campaigns List */}
      {activeTab === 'CAMPAIGNS' && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns, CLI, or queue..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCampaigns.map((c) => {
              const progressPct = Math.round((c.contacted / c.totalLeads) * 100);
              return (
                <div key={c.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white line-clamp-1">{c.name}</h3>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 inline-block mt-1">
                          {c.mode} DIALER
                        </span>
                      </div>

                      <button
                        onClick={() => toggleCampaignStatus(c.id)}
                        className={`p-2 rounded-xl border text-xs font-bold transition shrink-0 ${
                          c.status === 'RUNNING'
                            ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30 hover:bg-[#00ff88]/20'
                            : 'bg-white/5 text-[#8a99ad] border-white/10 hover:text-white'
                        }`}
                        title={c.status === 'RUNNING' ? 'Pause Campaign' : 'Resume Campaign'}
                      >
                        {c.status === 'RUNNING' ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#070913] border border-white/5 space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#8a99ad]">
                        <span>Outbound CLI:</span>
                        <span className="text-white font-bold">{c.callerId}</span>
                      </div>
                      <div className="flex justify-between text-[#8a99ad]">
                        <span>Queue Target:</span>
                        <span className="text-[#00d2ff]">{c.assignedQueue}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#8a99ad]">Leads Progress</span>
                        <span className="font-mono text-white font-bold">{progressPct}% ({c.contacted}/{c.totalLeads})</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88]" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-[11px]">
                    <div>
                      <span className="text-[#8a99ad] block">Connect Rate</span>
                      <span className="font-mono font-bold text-[#00ff88]">{c.connectRate}%</span>
                    </div>
                    <div>
                      <span className="text-[#8a99ad] block">Pacing Ratio</span>
                      <span className="font-mono font-bold text-white">{c.pacingRatio}x / Agent</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Disposition Rules */}
      {activeTab === 'DISPOSITIONS' && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Call Wrap-Up & Automated Retry Rules</h3>
            <span className="text-xs text-[#8a99ad] font-mono">Workflow Trigger Active</span>
          </div>

          <div className="divide-y divide-white/5 text-xs">
            {DISPOSITIONS.map((disp) => (
              <div key={disp.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${disp.color}`}>
                    {disp.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#8a99ad]">
                  <span>Action: <strong className="text-white">{disp.action}</strong></span>
                  {disp.retryIntervalMins && (
                    <span>Auto-Retry: in {disp.retryIntervalMins} mins</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-[#00d2ff]" />
                <span>Create Outbound Dialer Campaign</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8a99ad] hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                alert('Campaign successfully launched into active dialing queue!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 SME Telephony Upgrade"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Dialer Algorithm</label>
                  <select className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none">
                    <option value="PREDICTIVE">Predictive Dialer (Auto-Drop)</option>
                    <option value="POWER">Power Dialer (1-by-1 Pacing)</option>
                    <option value="PREVIEW">Preview Dialer (Agent Click)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Outbound DID (CLI)</label>
                  <select className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                    <option value="+8809612000000">+8809612000000 (Primary)</option>
                    <option value="+8809638112233">+8809638112233 (AmberIT)</option>
                    <option value="+880800123456">+880800123456 (Toll-Free)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#8a99ad] font-mono">
                Predictive algorithms dynamically balance line drops according to agent queue availability.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
              >
                Launch Campaign
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}