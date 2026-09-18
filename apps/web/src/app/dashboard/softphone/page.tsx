'use client';

import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Radio,
  ShieldCheck,
  CheckCircle2,
  User,
  Hash
} from 'lucide-react';

export default function WebRTCSoftphonePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'IDLE' | 'RINGING' | 'CONNECTED'>('IDLE');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState('00:00');

  const handleDial = (digit: string) => {
    setPhoneNumber((prev) => prev + digit);
  };

  const startCall = () => {
    if (!phoneNumber) return;
    setCallStatus('RINGING');
    setTimeout(() => {
      setCallStatus('CONNECTED');
    }, 2000);
  };

  const endCall = () => {
    setCallStatus('IDLE');
    setPhoneNumber('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Embedded WebRTC SIP Softphone</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
            Microphone Ready
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Make and receive crystal-clear Opus/G.711 VoIP calls directly from your browser via Kamailio WebSocket SBC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Dialpad UI */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5 shadow-2xl">
          <div className="bg-[#070913] border border-white/10 rounded-2xl p-4 text-right">
            <span className="text-[10px] text-[#8a99ad] block uppercase tracking-widest font-mono">Dialing Destination</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+88017..."
              className="w-full bg-transparent text-right text-2xl font-mono text-[#00d2ff] focus:outline-none placeholder:text-white/20"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleDial(digit)}
                className="py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 active:scale-95 transition"
              >
                {digit}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {callStatus === 'IDLE' ? (
              <button
                onClick={startCall}
                className="w-full py-3.5 rounded-2xl bg-[#00ff88] text-[#070913] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#00ff88]/20 transition flex items-center justify-center gap-2 font-mono"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call SIP Extension</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full py-3.5 rounded-2xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-500 shadow-lg shadow-rose-600/20 transition flex items-center justify-center gap-2 font-mono"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Call Telemetry & Status */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 shadow-2xl flex flex-col justify-center">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff] mx-auto">
              <PhoneCall className={`w-8 h-8 ${callStatus !== 'IDLE' ? 'animate-bounce text-[#00ff88]' : ''}`} />
            </div>
            <h3 className="text-lg font-bold text-white">
              {callStatus === 'IDLE' && 'Ready for Outbound Call'}
              {callStatus === 'RINGING' && 'Connecting via SIP...'}
              {callStatus === 'CONNECTED' && 'Call in Progress'}
            </h3>
            <p className="text-xs font-mono text-[#00ff88]">
              {callStatus === 'CONNECTED' ? 'Opus 48kHz Secure Stream' : 'WebSocket WSS Active'}
            </p>
          </div>

          {callStatus !== 'IDLE' && (
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-2xl border transition ${
                  isMuted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-white/5 text-white border-white/10'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}