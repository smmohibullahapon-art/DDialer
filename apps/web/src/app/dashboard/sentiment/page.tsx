'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Smile,
  Meh,
  Frown,
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  CheckCircle2,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface LiveSentimentCall {
  id: string;
  agentName: string;
  customerPhone: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'ANGRY';
  confidenceScore: number;
  autoPrompt: string;
  duration: string;
}

const INITIAL_SENTIMENTS: LiveSentimentCall[] = [
  {
    id: 'sc-01',
    agentName: 'Tanvir Ahmed (Ext 8001)',
    customerPhone: '+8801712345678',
    sentiment: 'POSITIVE',
    confidenceScore: 94,
    autoPrompt: 'Customer is highly satisfied. Recommended for upsell offer.',
    duration: '03:45',
  },
  {
    id: 'sc-02',
    agentName: 'Farhana Yasmin (Ext 8002)',
    customerPhone: '+8801922334455',
    sentiment: 'ANGRY',
    confidenceScore: 89,
    autoPrompt: 'High frustration detected. Supervisor whisper coaching advised.',
    duration: '01:20',
  },
  {
    id: 'sc-03',
    agentName: 'Mahfuzur Rahman (Ext 8003)',
    customerPhone: '+8801811223344',
    sentiment: 'NEUTRAL',
    confidenceScore: 91,
    autoPrompt: 'Standard query handling. Proceeding normally.',
    duration: '02:15',
  },
];

export default function SentimentAnalysisPage() {
  const [calls, setCalls] = useState<LiveSentimentCall[]>(INITIAL_SENTIMENTS);
  const [notice, setNotice] = useState<string | null>(null);

  const triggerWhisperCoach = (agent: string) => {
    setNotice(`AI Whisper Coach audio channel opened to assist ${agent}.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>AI Real-Time Sentiment &amp; Auto-Coaching</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00d2ff]" />
              Whisper LLM Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Live audio sentiment telemetry, customer emotion tracking, and automated supervisor assistance.
          </p>
        </div>
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

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Positive Sentiment</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">78%</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Floor Average</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Neutral Sentiment</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">16%</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Standard Inbound</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Escalation / Angry</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-rose-400 font-mono">6%</h3>
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block font-mono">Supervisor Intervention</span>
        </div>
      </div>

      {/* Active Sentiment Stream Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Agent &amp; Extension</th>
                <th className="py-3.5 px-4">Customer CLI</th>
                <th className="py-3.5 px-4">Sentiment State</th>
                <th className="py-3.5 px-4">AI Recommendation Prompt</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4 text-right">Coach Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans">{call.agentName}</td>
                  <td className="py-4 px-4 text-[#00d2ff]">{call.customerPhone}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        call.sentiment === 'POSITIVE'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                          : call.sentiment === 'ANGRY'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {call.sentiment} ({call.confidenceScore}%)
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/90 font-sans">{call.autoPrompt}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{call.duration}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => triggerWhisperCoach(call.agentName)}
                      className="px-3 py-1.5 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 hover:bg-[#00d2ff]/30 font-bold transition flex items-center gap-1.5 ml-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Whisper Coach</span>
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