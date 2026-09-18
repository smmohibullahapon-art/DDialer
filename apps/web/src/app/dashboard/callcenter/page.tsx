'use client';

import React, { useState } from 'react';
import {
  Headphones,
  Users,
  PhoneCall,
  PhoneForwarded,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Plus,
  Volume2,
  Mic,
  AlertCircle,
  Radio,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  PauseCircle
} from 'lucide-react';

interface CallQueue {
  id: string;
  name: string;
  extension: string;
  strategy: 'ROUND_ROBIN' | 'LEAST_RECENT' | 'RING_ALL';
  waitingCalls: number;
  longestWaitSec: number;
  agentsOnline: number;
  slaPercent: number;
  avgHandlingSec: number;
  status: 'OPTIMAL' | 'CONGESTED';
}

interface AgentLiveState {
  id: string;
  name: string;
  extension: string;
  assignedQueue: string;
  status: 'IN_CALL' | 'READY' | 'WRAP_UP' | 'BREAK';
  activeCaller?: string;
  callDurationSec?: number;
  callsHandledToday: number;
}

const INITIAL_QUEUES: CallQueue[] = [
  {
    id: 'q-sales',
    name: 'National Enterprise Sales Ring',
    extension: '8001',
    strategy: 'ROUND_ROBIN',
    waitingCalls: 3,
    longestWaitSec: 42,
    agentsOnline: 6,
    slaPercent: 94.2,
    avgHandlingSec: 195,
    status: 'OPTIMAL',
  },
  {
    id: 'q-support',
    name: 'Tier-1 Technical Support & NOC',
    extension: '8002',
    strategy: 'LEAST_RECENT',
    waitingCalls: 8,
    longestWaitSec: 148,
    agentsOnline: 5,
    slaPercent: 82.5,
    avgHandlingSec: 320,
    status: 'CONGESTED',
  },
  {
    id: 'q-billing',
    name: 'Prepaid Wallet & bKash Settlements',
    extension: '8003',
    strategy: 'RING_ALL',
    waitingCalls: 0,
    longestWaitSec: 0,
    agentsOnline: 4,
    slaPercent: 98.7,
    avgHandlingSec: 110,
    status: 'OPTIMAL',
  },
];

const INITIAL_AGENTS: AgentLiveState[] = [
  {
    id: 'ag-01',
    name: 'Tasnim Munni',
    extension: '1001',
    assignedQueue: 'National Enterprise Sales Ring',
    status: 'IN_CALL',
    activeCaller: '+8801712345678',
    callDurationSec: 184,
    callsHandledToday: 38,
  },
  {
    id: 'ag-02',
    name: 'Mahfuzur Rahman',
    extension: '1002',
    assignedQueue: 'Tier-1 Technical Support & NOC',
    status: 'IN_CALL',
    activeCaller: '+8801911987654',
    callDurationSec: 92,
    callsHandledToday: 44,
  },
  {
    id: 'ag-03',
    name: 'Farhana Sultana',
    extension: '1003',
    assignedQueue: 'Prepaid Wallet & bKash Settlements',
    status: 'READY',
    callsHandledToday: 29,
  },
  {
    id: 'ag-04',
    name: 'Tanvir Ahmed',
    extension: '1004',
    assignedQueue: 'National Enterprise Sales Ring',
    status: 'WRAP_UP',
    callsHandledToday: 31,
  },
  {
    id: 'ag-05',
    name: 'Nusrat Jahan',
    extension: '1005',
    assignedQueue: 'Tier-1 Technical Support & NOC',
    status: 'BREAK',
    callsHandledToday: 22,
  },
];

export default function CallCenterPage() {
  const [queues] = useState<CallQueue[]>(INITIAL_QUEUES);
  const [agents, setAgents] = useState<AgentLiveState[]>(INITIAL_AGENTS);
  const [activeTab, setActiveTab] = useState<'QUEUES' | 'AGENTS' | 'IVR'>('QUEUES');
  const [supervisorNotice, setSupervisorNotice] = useState<string | null>(null);

  const formatSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerSupervisorAction = (action: 'LISTEN' | 'WHISPER' | 'BARGE', agentExt: string) => {
    setSupervisorNotice(`Supervisor ${action} mode initiated on Ext ${agentExt} via WebRTC RTP Media bridge.`);
    setTimeout(() => setSupervisorNotice(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Call Center & Inbound Queues</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              NOC ACD Core
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Real-time automated call distribution (ACD), agent states, and supervisor barge controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse"></span>
          <span className="text-xs text-[#00ff88] font-mono">ACD FreeSWITCH Engine Live</span>
        </div>
      </div>

      {/* Supervisor Notification Banner */}
      {supervisorNotice && (
        <div className="p-4 rounded-2xl bg-[#9d4edd]/15 border border-[#9d4edd]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#9d4edd]" />
            <span>{supervisorNotice}</span>
          </div>
          <button onClick={() => setSupervisorNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Waiting Calls</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-white font-mono">
              {queues.reduce((acc, q) => acc + q.waitingCalls, 0)} Calls
            </h3>
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block font-mono">Longest Wait: 02m 28s</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Agents Staffed</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-[#00d2ff] font-mono">{agents.length} Online</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">
            {agents.filter((a) => a.status === 'IN_CALL').length} On Call • {agents.filter((a) => a.status === 'READY').length} Ready
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Service Level (SLA)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-[#00ff88] font-mono">91.8%</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">&lt; 30s Answer Target</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Avg Handling Time (AHT)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-extrabold text-[#9d4edd] font-mono">03m 15s</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Total Handled: 164</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('QUEUES')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'QUEUES'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Active Inbound Queues ({queues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('AGENTS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'AGENTS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Live Agent Roster & Supervision ({agents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('IVR')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'IVR'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <PhoneForwarded className="w-4 h-4" />
          <span>IVR Routing Topology</span>
        </button>
      </div>

      {/* View 1: Queues Grid */}
      {activeTab === 'QUEUES' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {queues.map((q) => (
            <div key={q.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{q.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 inline-block mt-1">
                    Ext {q.extension} • {q.strategy}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    q.status === 'OPTIMAL'
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {q.status}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#070913] border border-white/5 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[#8a99ad] text-[10px] block">Waiting Calls</span>
                  <span className="text-xl font-bold text-white">{q.waitingCalls}</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] text-[10px] block">Longest Wait</span>
                  <span className="text-xl font-bold text-amber-400">{formatSec(q.longestWaitSec)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                <div>
                  <span className="text-[#8a99ad] block">Agents Assigned</span>
                  <span className="font-mono font-bold text-white">{q.agentsOnline} Agents</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">Queue SLA</span>
                  <span className="font-mono font-bold text-[#00ff88]">{q.slaPercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Live Agent Monitoring & Supervisor Controls */}
      {activeTab === 'AGENTS' && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Real-Time Floor Supervision</h3>
            <span className="text-xs text-[#8a99ad] font-mono">RTP Media Wiretap Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#8a99ad]">
              <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
                <tr>
                  <th className="py-3.5 px-4">Agent Name</th>
                  <th className="py-3.5 px-4">Ext</th>
                  <th className="py-3.5 px-4">Current Queue</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">Active Call</th>
                  <th className="py-3.5 px-4">Handled Today</th>
                  <th className="py-3.5 px-4 text-right">Supervisor Live Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {agents.map((ag) => (
                  <tr key={ag.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4 font-semibold text-white">{ag.name}</td>
                    <td className="py-4 px-4 font-mono text-[#00d2ff]">Ext {ag.extension}</td>
                    <td className="py-4 px-4 text-white/90">{ag.assignedQueue}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          ag.status === 'IN_CALL'
                            ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                            : ag.status === 'READY'
                            ? 'bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30'
                            : ag.status === 'WRAP_UP'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-white/5 text-[#8a99ad] border border-white/10'
                        }`}
                      >
                        {ag.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-white">
                      {ag.status === 'IN_CALL' ? (
                        <span>
                          {ag.activeCaller} ({formatSec(ag.callDurationSec || 0)})
                        </span>
                      ) : (
                        <span className="text-[#8a99ad]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-white font-bold">{ag.callsHandledToday}</td>
                    <td className="py-4 px-4 text-right">
                      {ag.status === 'IN_CALL' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => triggerSupervisorAction('LISTEN', ag.extension)}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[#00d2ff] hover:bg-white/10 transition text-[11px]"
                            title="Silent Listen"
                          >
                            Listen
                          </button>
                          <button
                            onClick={() => triggerSupervisorAction('WHISPER', ag.extension)}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[#9d4edd] hover:bg-white/10 transition text-[11px]"
                            title="Whisper to Agent Only"
                          >
                            Whisper
                          </button>
                          <button
                            onClick={() => triggerSupervisorAction('BARGE', ag.extension)}
                            className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition text-[11px]"
                            title="Barge into 3-Way Call"
                          >
                            Barge
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#8a99ad] text-[11px]">Idle</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: IVR Routing Topology */}
      {activeTab === 'IVR' && (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Inbound Automated Attendant (IVR)</h3>
              <p className="text-xs text-[#8a99ad] mt-0.5">Primary Entry DID: +8809612000000 (BTCL National Route)[cite: 5]</p>
            </div>
            <span className="text-xs font-mono text-[#00ff88] bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/30">
              IVR Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#00d2ff]/5 border border-[#00d2ff]/20 space-y-2">
              <span className="text-xs font-bold text-[#00d2ff] font-mono">Press [1] — Sales</span>
              <p className="text-xs text-white/90">Routes to Queue Ext 8001 (Round Robin distribution across 6 agents).</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#9d4edd]/5 border border-[#9d4edd]/20 space-y-2">
              <span className="text-xs font-bold text-[#9d4edd] font-mono">Press [2] — Technical NOC</span>
              <p className="text-xs text-white/90">Routes to Queue Ext 8002 with priority escalation for VIP callers.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 space-y-2">
              <span className="text-xs font-bold text-[#00ff88] font-mono">Press [3] — Billing & bKash</span>
              <p className="text-xs text-white/90">Ring-All hunt group across Ext 8003 with automated ledger verification.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}