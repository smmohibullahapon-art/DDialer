'use client';

import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Zap,
  Radio,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sliders,
  Settings2,
  Trash2,
  Play,
  Pause,
  Sparkles,
  GitBranch,
  Filter,
  Check
} from 'lucide-react';

interface AutomationFlow {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  executionsToday: number;
  status: 'ACTIVE' | 'PAUSED';
  lastRun: string;
}

const INITIAL_FLOWS: AutomationFlow[] = [
  {
    id: 'flow-01',
    name: 'Missed Call Auto-SMS & Follow-up',
    trigger: 'Event: Call Missed / No Answer',
    condition: 'Destination DID = +8809612000000 AND Caller is Mobile (+88017/19/18)',
    action: 'Send SMS: "Assalamu Alaikum, we missed your call. Call back at +8809612000000"',
    executionsToday: 142,
    status: 'ACTIVE',
    lastRun: '2 mins ago',
  },
  {
    id: 'flow-02',
    name: 'VIP Inbound Direct Agent Routing',
    trigger: 'Event: Inbound Call Initiated',
    condition: 'Caller CLI matches CRM VIP Tag == "Enterprise"',
    action: 'Bypass IVR and route directly to Senior Sales Ring Group (Ext 8001)',
    executionsToday: 38,
    status: 'ACTIVE',
    lastRun: '14 mins ago',
  },
  {
    id: 'flow-03',
    name: 'AI Diarization & Whisper Summary',
    trigger: 'Event: Call Recording Completed',
    condition: 'Call Duration > 60 seconds AND Transcription enabled',
    action: 'Dispatch WAV to Whisper LLM GPU cluster & save summary to CRM timeline',
    executionsToday: 89,
    status: 'ACTIVE',
    lastRun: '8 mins ago',
  },
];

export default function DDialerFlowPage() {
  const [flows, setFlows] = useState<AutomationFlow[]>(INITIAL_FLOWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flowName, setFlowName] = useState('');
  const [triggerType, setTriggerType] = useState('Missed Call');
  const [actionType, setActionType] = useState('Send SMS Broadcast');

  const toggleFlowStatus = (id: string) => {
    setFlows(
      flows.map((f) =>
        f.id === id ? { ...f, status: f.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : f
      )
    );
  };

  const handleCreateFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flowName.trim()) return;

    const newFlow: AutomationFlow = {
      id: `flow-${Date.now().toString().slice(-4)}`,
      name: flowName,
      trigger: `Event: ${triggerType}`,
      condition: 'Custom Tenant Rule Match',
      action: `Execute: ${actionType}`,
      executionsToday: 0,
      status: 'ACTIVE',
      lastRun: 'Just now',
    };

    setFlows([newFlow, ...flows]);
    setIsModalOpen(false);
    setFlowName('');
    alert('DDialer Automation Flow successfully deployed!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>DDialer Flow Automation Engine</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Trigger-Condition-Action
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Zero-code event-driven telecommunications logic for automated SMS, VIP routing, and AI triggers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create New Flow</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Automations</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              {flows.filter((f) => f.status === 'ACTIVE').length} / {flows.length}
            </h3>
            <span className="text-[11px] text-[#00ff88]">Engine Live</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Executions Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">269 Triggers</h3>
            <span className="text-[11px] text-[#00d2ff]">Sub-50ms Latency</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Execution Success SLA</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">100.0%</h3>
            <span className="text-[11px] text-[#00ff88]">Zero Failures</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Event Webhooks</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">Connected</h3>
            <span className="text-[11px] text-[#8a99ad]">Kamailio &amp; ESL</span>
          </div>
        </div>
      </div>

      {/* Flows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {flows.map((flow) => (
          <div
            key={flow.id}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{flow.name}</h3>
                </div>
                <button
                  onClick={() => toggleFlowStatus(flow.id)}
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                    flow.status === 'ACTIVE'
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/20'
                      : 'bg-white/5 text-[#8a99ad] border border-white/10 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {flow.status}
                </button>
              </div>

              {/* Trigger - Condition - Action Visualizer */}
              <div className="space-y-2 text-xs font-mono pt-2">
                <div className="p-3 rounded-2xl bg-[#00d2ff]/5 border border-[#00d2ff]/20 space-y-1">
                  <span className="text-[10px] text-[#00d2ff] font-bold uppercase block">1. Trigger</span>
                  <span className="text-white/90 text-[11px] block">{flow.trigger}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[#8a99ad] font-bold uppercase block">2. Condition</span>
                  <span className="text-white/80 text-[11px] block">{flow.condition}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 space-y-1">
                  <span className="text-[10px] text-[#00ff88] font-bold uppercase block">3. Action</span>
                  <span className="text-white/90 text-[11px] block">{flow.action}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#8a99ad] flex justify-between">
              <span>Today: <strong className="text-white">{flow.executionsToday} runs</strong></span>
              <span>Last: {flow.lastRun}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Flow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-[#00d2ff]" />
                <span>Create DDialer Automation Flow</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8a99ad] hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateFlow} className="space-y-4 text-xs">
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Flow Name</label>
                <input
                  type="text"
                  required
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                  placeholder="e.g. VIP Inbound SMS Confirmation"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Trigger Event</label>
                  <select
                    value={triggerType}
                    onChange={(e) => setTriggerType(e.target.value)}
                    className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Missed Call">Call Missed / No Answer</option>
                    <option value="Inbound Call">Inbound Call Initiated</option>
                    <option value="Recording Ready">Call Recording Completed</option>
                    <option value="Wallet Low">Prepaid Balance &lt; ৳ 500</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Action Type</label>
                  <select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className="w-full bg-[#070913] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Send SMS Broadcast">Send Auto-SMS Reply</option>
                    <option value="Route to Queue">Route to SIP Queue</option>
                    <option value="AI Diarization">Trigger AI Whisper LLM</option>
                    <option value="Webhook Dispatch">Post to External Webhook</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#8a99ad] font-mono">
                Flows execute instantly through Kamailio event hooks when telecommunication triggers fire.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
              >
                Deploy Flow
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}