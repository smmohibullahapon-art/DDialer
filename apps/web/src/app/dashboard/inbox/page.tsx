'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneIncoming,
  PhoneOutgoing,
  Mic,
  MicOff,
  Pause,
  Play,
  Share2,
  Volume2,
  VolumeX,
  Radio,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  User,
  ShieldCheck,
  Headphones,
  Sliders,
  Sparkles,
  Zap,
  MoreVertical,
  Delete
} from 'lucide-react';

interface InboxThread {
  id: string;
  contactName: string;
  phoneNumber: string;
  lastMessage: string;
  lastTimestamp: string;
  channel: 'SMS' | 'WHATSAPP' | 'VOICE_MISSED';
  unreadCount: number;
}

const INITIAL_THREADS: InboxThread[] = [
  {
    id: 'th-1',
    contactName: 'Rahim Chowdhury',
    phoneNumber: '+8801712345678',
    lastMessage: 'Assalamu Alaikum. Could you please confirm our 20 concurrent SIP channels?',
    lastTimestamp: '04:12 AM',
    channel: 'SMS',
    unreadCount: 0,
  },
  {
    id: 'th-2',
    contactName: 'Farhana Yasmin',
    phoneNumber: '+8801677889900',
    lastMessage: 'Trade license and TIN certificate re-uploaded for BTRC masking approval.',
    lastTimestamp: 'Yesterday',
    channel: 'SMS',
    unreadCount: 1,
  },
  {
    id: 'th-3',
    contactName: 'Tanvir Ahmed',
    phoneNumber: '+8801822334455',
    lastMessage: 'Missed Call: Ext 1001 attempted to connect for Toll-Free inquiry.',
    lastTimestamp: '15 Sep',
    channel: 'VOICE_MISSED',
    unreadCount: 0,
  },
];

export default function InboxDialerPage() {
  const [dialNumber, setDialNumber] = useState('');
  const [callState, setCallState] = useState<'IDLE' | 'DIALING' | 'CONNECTED' | 'ON_HOLD'>('IDLE');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callerId, setCallerId] = useState('+8809612000000');
  
  // Messaging Inbox State
  const [threads, setThreads] = useState<InboxThread[]>(INITIAL_THREADS);
  const [activeThread, setActiveThread] = useState<InboxThread>(INITIAL_THREADS[0]);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'AGENT' | 'CLIENT'; text: string; time: string }[]>([
    { sender: 'CLIENT', text: 'Assalamu Alaikum. Could you please confirm our 20 concurrent SIP channels?', time: '04:12 AM' },
    { sender: 'AGENT', text: 'Walaikum Assalam Rahim. The channels are active on AmberIT SBC with 14ms latency.', time: '04:15 AM' }
  ]);

  // Call timer simulation
  useEffect(() => {
    let timer: any;
    if (callState === 'CONNECTED') {
      timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    } else if (callState === 'IDLE') {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const handleNumpadPress = (digit: string) => {
    setDialNumber((prev) => prev + digit);
  };

  const handleStartCall = (targetNum?: string) => {
    const num = targetNum || dialNumber;
    if (!num) return;
    setDialNumber(num);
    setCallState('DIALING');
    setTimeout(() => {
      setCallState('CONNECTED');
    }, 1800);
  };

  const handleEndCall = () => {
    setCallState('IDLE');
    setIsMuted(false);
  };

  const toggleHold = () => {
    setCallState((prev) => (prev === 'CONNECTED' ? 'ON_HOLD' : 'CONNECTED'));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages([...messages, { sender: 'AGENT', text: chatInput.trim(), time: 'Just now' }]);
    setChatInput('');
  };

  const formatSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>WebRTC Softphone &amp; Unified Inbox</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              Opus HD 48kHz • SIP Registered
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Browser softphone SIP extension 1001 with DTMF dialing, live call telemetry, and omnichannel SMS inbox.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
            <span>Ext 1001: Registered</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Softphone Dialpad (Left) + Unified Inbox & SMS Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: WebRTC Softphone */}
        <div className="lg:col-span-5 rounded-3xl bg-white/[0.03] border border-white/10 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00d2ff]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">SIP Softphone</h3>
            </div>
            <select
              value={callerId}
              onChange={(e) => setCallerId(e.target.value)}
              className="bg-[#070913] border border-white/10 rounded-xl px-2.5 py-1 text-xs text-[#00d2ff] font-mono focus:outline-none"
            >
              <option value="+8809612000000">CLI: +8809612000000 (BTCL)</option>
              <option value="+8809638112233">CLI: +8809638112233 (AmberIT)</option>
              <option value="+880800123456">CLI: +880800123456 (Toll-Free)</option>
            </select>
          </div>

          {/* Active Call HUD or Dial Input */}
          {callState !== 'IDLE' ? (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#070913] to-black border border-white/15 text-center space-y-4 shadow-2xl animate-fade-in">
              <div className="space-y-1">
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    callState === 'DIALING'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse'
                      : callState === 'ON_HOLD'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                  }`}
                >
                  {callState === 'DIALING' ? 'Initiating SIP INVITE...' : callState === 'ON_HOLD' ? 'CALL ON HOLD' : 'CONNECTED • 1-SEC PULSE'}
                </span>
                <h2 className="text-xl font-mono font-bold text-white tracking-wider pt-2">{dialNumber}</h2>
                <p className="text-xs font-mono text-[#00d2ff]">{formatSec(callDuration)}</p>
              </div>

              {/* In-Call Controls */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-xs mx-auto">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    isMuted ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span className="text-[10px]">{isMuted ? 'Muted' : 'Mute'}</span>
                </button>

                <button
                  onClick={toggleHold}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    callState === 'ON_HOLD'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <Pause className="w-4 h-4" />
                  <span className="text-[10px]">{callState === 'ON_HOLD' ? 'Resume' : 'Hold'}</span>
                </button>

                <button
                  onClick={() => alert('Warm transfer to Supervisor queue...')}
                  className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold transition flex flex-col items-center gap-1"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-[10px]">Transfer</span>
                </button>
              </div>

              {/* End Call Button */}
              <div className="pt-2">
                <button
                  onClick={handleEndCall}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Terminate Call</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Dial Input */}
              <div className="relative">
                <input
                  type="text"
                  value={dialNumber}
                  onChange={(e) => setDialNumber(e.target.value)}
                  placeholder="+8801..."
                  className="w-full bg-[#070913] border border-white/10 rounded-2xl px-4 py-3.5 text-center text-lg text-white font-mono tracking-widest focus:outline-none focus:border-[#00d2ff]"
                />
                {dialNumber && (
                  <button
                    onClick={() => setDialNumber((prev) => prev.slice(0, -1))}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a99ad] hover:text-white p-1"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Numpad 3x4 Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ['1', ''],
                  ['2', 'ABC'],
                  ['3', 'DEF'],
                  ['4', 'GHI'],
                  ['5', 'JKL'],
                  ['6', 'MNO'],
                  ['7', 'PQRS'],
                  ['8', 'TUV'],
                  ['9', 'WXYZ'],
                  ['*', ''],
                  ['0', '+'],
                  ['#', ''],
                ].map(([digit, letters]) => (
                  <button
                    key={digit}
                    onClick={() => handleNumpadPress(digit)}
                    className="py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95 transition flex flex-col items-center justify-center group"
                  >
                    <span className="text-lg font-bold text-white group-hover:text-[#00d2ff] font-mono">{digit}</span>
                    {letters && <span className="text-[9px] text-[#8a99ad] tracking-widest uppercase">{letters}</span>}
                  </button>
                ))}
              </div>

              {/* Call Action Button */}
              <button
                onClick={() => handleStartCall()}
                disabled={!dialNumber}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] disabled:opacity-40 text-[#070913] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#00d2ff]/25 transition flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                <span>Call Ext 1001</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Unified Omnichannel Inbox & SMS Thread */}
        <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col h-[640px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff] font-bold text-xs font-mono">
                {activeThread.contactName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{activeThread.contactName}</h3>
                <p className="text-xs font-mono text-[#00d2ff]">{activeThread.phoneNumber}</p>
              </div>
            </div>

            <button
              onClick={() => handleStartCall(activeThread.phoneNumber)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/20 text-xs font-bold transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Instant Call</span>
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'AGENT' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-[#8a99ad]">
                  <span>{m.sender === 'AGENT' ? 'Ext 1001 (You)' : activeThread.contactName}</span>
                  <span>• {m.time}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-md leading-relaxed ${
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

          {/* Compose / Send SMS Bar */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Send SMS reply via ${callerId}...`}
                className="flex-1 bg-[#070913] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}