'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  Activity,
  Mic,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Cpu,
  Zap,
  Volume2,
  Layers,
  Search,
  Filter,
  RefreshCw,
  FileText,
  User,
  ShieldCheck,
  Send,
  ArrowRight
} from 'lucide-react';

interface DiarizedSegment {
  id: string;
  speaker: 'AGENT' | 'CUSTOMER';
  speakerName: string;
  time: string;
  banglaText: string;
  englishTranslation: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
}

interface CopilotSuggestion {
  id: string;
  type: 'RECOMMENDED_REPLY' | 'COMPLIANCE_ALERT' | 'KNOWLEDGE_BASE';
  title: string;
  content: string;
  confidence: number;
}

const LIVE_CONVERSATION: DiarizedSegment[] = [
  {
    id: 'seg-1',
    speaker: 'CUSTOMER',
    speakerName: 'Rahim Chowdhury (Chowdhury Textiles)',
    time: '00:12',
    banglaText: 'আমাদের ফ্যাক্টরির জন্য ২০টি কনকারেন্ট এসআইপি চ্যানেল লাগবে। বিটিসিএল বা অ্যাম্বারআইটি দিয়ে কি কানেকশন দেওয়া যাবে?',
    englishTranslation: 'We need 20 concurrent SIP channels for our factory. Can you provide connectivity via BTCL or AmberIT?',
    sentiment: 'NEUTRAL',
  },
  {
    id: 'seg-2',
    speaker: 'AGENT',
    speakerName: 'Tasnim Munni (Senior NOC)',
    time: '00:24',
    banglaText: 'অবশ্যই রহিম সাহেব। আমাদের প্ল্যাটফর্মে বিটিসিএল ন্যাশনাল এসবিসি এবং অ্যাম্বারআইটি প্রাইভেট পিয়ারিং দুটোই সক্রিয় আছে। লেটেন্সি মাত্র ১২ মিলিসেকেন্ড।',
    englishTranslation: 'Certainly Mr. Rahim. Both BTCL National SBC and AmberIT private peering are active on our platform with only 12ms latency.',
    sentiment: 'POSITIVE',
  },
  {
    id: 'seg-3',
    speaker: 'CUSTOMER',
    speakerName: 'Rahim Chowdhury (Chowdhury Textiles)',
    time: '00:48',
    banglaText: 'দারুণ! আর কল চার্জের হিসাবটা কীভাবে হবে? আমাদের ১ সেকেন্ডের পাল্স রেটিং দরকার।',
    englishTranslation: 'Great! And how will call billing work? We require 1-second pulse rating.',
    sentiment: 'POSITIVE',
  },
  {
    id: 'seg-4',
    speaker: 'AGENT',
    speakerName: 'Tasnim Munni (Senior NOC)',
    time: '01:05',
    banglaText: 'জী, আমাদের পুরো সিস্টেম বিটিআরসি স্ট্যান্ডার্ড মেনে ১-সেকেন্ড পাল্স রেটিংয়ে চলে। কোনো কল সেটআপ ফি নেই।',
    englishTranslation: 'Yes, our entire engine operates on BTRC-compliant 1-second pulse rating with zero setup fee.',
    sentiment: 'POSITIVE',
  },
];

const INITIAL_SUGGESTIONS: CopilotSuggestion[] = [
  {
    id: 'sug-1',
    type: 'RECOMMENDED_REPLY',
    title: 'Prepaid Wallet & bKash Top-Up Offer',
    content: 'Suggest offering the customer an instant ৳ 15,000 wallet top-up via bKash Merchant API with immediate activation of 20 channels.',
    confidence: 96,
  },
  {
    id: 'sug-2',
    type: 'COMPLIANCE_ALERT',
    title: 'BTRC KYC Trade License Reminder',
    content: 'Customer is requesting > 10 channels. Ensure trade license and e-TIN are collected before provisioning permanent 096 DID.',
    confidence: 99,
  },
  {
    id: 'sug-3',
    type: 'KNOWLEDGE_BASE',
    title: 'AmberIT SLA Specs',
    content: 'AmberIT Enterprise Trunk: Codec Opus/G.711a, jitter buffer 20ms, automatic failover to BTCL National Wholesale in 50ms.',
    confidence: 92,
  },
];

export default function AIIntelligencePage() {
  const [conversation, setConversation] = useState<DiarizedSegment[]>(LIVE_CONVERSATION);
  const [suggestions, setSuggestions] = useState<CopilotSuggestion[]>(INITIAL_SUGGESTIONS);
  const [activeTab, setActiveTab] = useState<'LIVE_STREAM' | 'SUMMARY' | 'MODELS'>('LIVE_STREAM');
  const [selectedLanguage, setSelectedLanguage] = useState<'BANGLA' | 'ENGLISH'>('BANGLA');
  const [isCopilotActive, setIsCopilotActive] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>AI Intelligence &amp; Agent Copilot</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#9d4edd]/15 text-[#9d4edd] border border-[#9d4edd]/30 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Whisper LLM Core
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Real-time dual-channel speech diarization, live sentiment gauge, and agent response assist.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSelectedLanguage('BANGLA')}
              className={`px-3 py-1.5 rounded-lg font-mono transition ${
                selectedLanguage === 'BANGLA' ? 'bg-[#9d4edd] text-white font-bold' : 'text-[#8a99ad] hover:text-white'
              }`}
            >
              বাংলা (Native)
            </button>
            <button
              onClick={() => setSelectedLanguage('ENGLISH')}
              className={`px-3 py-1.5 rounded-lg font-mono transition ${
                selectedLanguage === 'ENGLISH' ? 'bg-[#00d2ff] text-[#070913] font-bold' : 'text-[#8a99ad] hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
            <span>GPU Pipeline: 42ms</span>
          </div>
        </div>
      </div>

      {/* Top AI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Live Call Sentiment</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">92% Positive</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Zero Customer Churn Risk</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Speech Recognition (WER)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">3.8% Word Error</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">Bangla Acoustic Model v2.4</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Copilot Response Speed</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">180 ms</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Streaming Token Generation</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Automated CRM Tags</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">3 Extracted</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">SIP Trunk, 20 Channels, 1-Sec</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('LIVE_STREAM')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'LIVE_STREAM'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Live Dual-Channel Diarization</span>
        </button>

        <button
          onClick={() => setActiveTab('SUMMARY')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'SUMMARY'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Auto Call Summary &amp; Action Items</span>
        </button>

        <button
          onClick={() => setActiveTab('MODELS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'MODELS'
              ? 'bg-[#9d4edd]/15 border border-[#9d4edd]/40 text-[#9d4edd]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>LLM Models &amp; Inference Pipeline</span>
        </button>
      </div>

      {/* View 1: Live Diarization Feed + Agent Copilot Panel */}
      {activeTab === 'LIVE_STREAM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Real-time Transcript Feed */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse"></span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Audio Stream: sess-8f3e-4b2a
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#8a99ad]">Stereo Dual-Track Separation</span>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
              {conversation.map((seg) => (
                <div
                  key={seg.id}
                  className={`p-4 rounded-2xl border transition space-y-1.5 ${
                    seg.speaker === 'AGENT'
                      ? 'bg-gradient-to-r from-white/[0.05] to-transparent border-white/10 ml-6'
                      : 'bg-gradient-to-r from-[#9d4edd]/10 to-transparent border-[#9d4edd]/20 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          seg.speaker === 'AGENT'
                            ? 'bg-[#00d2ff]/10 text-[#00d2ff]'
                            : 'bg-[#9d4edd]/20 text-[#9d4edd]'
                        }`}
                      >
                        {seg.speaker}
                      </span>
                      <span className="text-xs font-bold text-white">{seg.speakerName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8a99ad]">{seg.time}</span>
                  </div>

                  <p className="text-xs text-white/95 leading-relaxed font-sans">
                    {selectedLanguage === 'BANGLA' ? seg.banglaText : seg.englishTranslation}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#8a99ad]">
                    <span className="flex items-center gap-1">
                      Sentiment:{' '}
                      <strong
                        className={
                          seg.sentiment === 'POSITIVE'
                            ? 'text-[#00ff88]'
                            : seg.sentiment === 'NEGATIVE'
                            ? 'text-rose-400'
                            : 'text-white'
                        }
                      >
                        {seg.sentiment}
                      </strong>
                    </span>
                    <span>Opus 48kHz Diarized</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Agent Copilot Cue Cards */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#9d4edd]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Agent Whisper Copilot
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9d4edd]/20 text-[#9d4edd] font-bold">
                Auto Assist Active
              </span>
            </div>

            <div className="space-y-3.5">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-4 rounded-2xl bg-[#070913] border border-white/10 space-y-2 hover:border-[#9d4edd]/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        sug.type === 'COMPLIANCE_ALERT'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/30'
                      }`}
                    >
                      {sug.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-[#00ff88]">{sug.confidence}% Match</span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{sug.title}</h4>
                  <p className="text-xs text-[#8a99ad] leading-relaxed">{sug.content}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => alert(`Copilot suggestion applied to agent script: ${sug.title}`)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00d2ff] hover:underline"
                    >
                      <span>Insert into Script</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Post-Call Summarization */}
      {activeTab === 'SUMMARY' && (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 max-w-3xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white">Automated Post-Call Intelligence</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Summary generated by Whisper LLM and automatically saved to Contact CRM.</p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-[#070913] border border-white/5 space-y-2">
              <span className="text-[#9d4edd] font-bold block uppercase tracking-wider text-[11px]">Executive Summary</span>
              <p className="text-white/90 leading-relaxed font-sans">
                Rahim Chowdhury from Chowdhury Textiles inquired about provisioning 20 concurrent SIP channels with 1-second pulse rating for their production plant. Agent confirmed availability via BTCL Wholesale National and AmberIT SBC routes with sub-15ms latency. Customer agreed to deposit ৳ 15,000 via bKash.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[#8a99ad] text-[10px] uppercase">Customer Intent</span>
                <span className="text-white font-bold block">Enterprise Telephony Upgrade</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[#8a99ad] text-[10px] uppercase">Action Item</span>
                <span className="text-[#00ff88] font-bold block">Dispatch BTRC Trade License KYC form</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: LLM Models & GPU Inference */}
      {activeTab === 'MODELS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Whisper Diarization Large-v3</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88]">Primary</span>
            </div>
            <p className="text-xs text-[#8a99ad]">Optimized for Bangladeshi dialects, mixed English-Bangla (Banglish), and phone line acoustic noise.</p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-white/90 flex justify-between">
              <span>Latency: 42 ms</span>
              <span className="text-[#00ff88]">NVIDIA A100 Tensor</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Copilot LLM 8B Instruct</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00d2ff]/10 text-[#00d2ff]">Active</span>
            </div>
            <p className="text-xs text-[#8a99ad]">Generates real-time compliance alerts, CRM tags, and response suggestions for call center floor.</p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-white/90 flex justify-between">
              <span>Latency: 110 ms</span>
              <span className="text-[#00d2ff]">vLLM PagedAttention</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">VAD &amp; Acoustic Filter</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9d4edd]/10 text-[#9d4edd]">Active</span>
            </div>
            <p className="text-xs text-[#8a99ad]">Silero Voice Activity Detection removes background factory hum and silent pauses.</p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-white/90 flex justify-between">
              <span>Latency: 2 ms</span>
              <span className="text-[#9d4edd]">Zero CPU Overhead</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}