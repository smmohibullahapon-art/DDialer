'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Pause,
  Play,
  Delete,
  Signal
} from 'lucide-react';

const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
  '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
};

const KEYPAD_KEYS = [
  { key: '1', sub: ' ' },
  { key: '2', sub: 'ABC' },
  { key: '3', sub: 'DEF' },
  { key: '4', sub: 'GHI' },
  { key: '5', sub: 'JKL' },
  { key: '6', sub: 'MNO' },
  { key: '7', sub: 'PQRS' },
  { key: '8', sub: 'TUV' },
  { key: '9', sub: 'WXYZ' },
  { key: '*', sub: ' ' },
  { key: '0', sub: '+' },
  { key: '#', sub: ' ' },
];

export default function WebRTCDialer() {
  const [destination, setDestination] = useState('+8801');
  const [callerId, setCallerId] = useState('+8809612000000');
  const [callState, setCallState] = useState<'IDLE' | 'CONNECTING' | 'RINGING' | 'CONNECTED'>('IDLE');
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playDtmfTone = (digit: string) => {
    const freqs = DTMF_FREQS[digit];
    if (!freqs) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  const handleKeyPress = (digit: string) => {
    playDtmfTone(digit);
    setDestination((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setDestination((prev) => prev.slice(0, -1));
  };

  const startCall = async () => {
    if (!destination.trim() || destination.length < 5) return;

    try {
      setCallState('CONNECTING');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      mediaStreamRef.current = stream;

      setTimeout(() => setCallState('RINGING'), 800);
      setTimeout(() => {
        setCallState('CONNECTED');
        setCallDuration(0);
      }, 2200);
    } catch {
      alert('Microphone access is required for WebRTC calling.');
      setCallState('IDLE');
    }
  };

  const endCall = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setCallState('IDLE');
    setIsMuted(false);
    setIsOnHold(false);
    setCallDuration(0);
  };

  useEffect(() => {
    if (callState === 'CONNECTED') {
      timerRef.current = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  const toggleMute = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((t) => { t.enabled = isMuted; });
      setIsMuted(!isMuted);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
          <span className="text-[#8a99ad] font-mono">WebRTC: SIP-BD</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#00d2ff] bg-[#00d2ff]/10 px-2 py-0.5 rounded-full border border-[#00d2ff]/20 font-mono text-[10px]">
          <Signal className="w-3 h-3" />
          <span>Opus 48kHz</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-[10px] uppercase font-bold tracking-widest text-[#8a99ad] block mb-1">
          Outbound CLI (DID)
        </label>
        <select
          value={callerId}
          onChange={(e) => setCallerId(e.target.value)}
          disabled={callState !== 'IDLE'}
          className="w-full bg-[#070913]/90 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00d2ff]/50 disabled:opacity-50"
        >
          <option value="+8809612000000">+8809612000000 (BTCL Route A)</option>
          <option value="+8809638000000">+8809638000000 (AmberIT Trunk)</option>
          <option value="+8809609000000">+8809609000000 (BracNet Gateway)</option>
        </select>
      </div>

      <div className="my-5 p-4 rounded-2xl bg-[#070913]/80 border border-white/10 flex flex-col items-center justify-center min-h-[96px]">
        {callState === 'IDLE' ? (
          <div className="w-full flex items-center justify-between">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter phone number..."
              className="bg-transparent text-xl font-bold tracking-wider text-white w-full text-center focus:outline-none font-mono"
            />
            {destination && (
              <button onClick={handleBackspace} className="p-1.5 text-[#8a99ad] hover:text-rose-400">
                <Delete className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center space-y-1">
            <p className="text-lg font-bold font-mono text-white tracking-wider">{destination}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${callState === 'CONNECTED' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#00d2ff]/20 text-[#00d2ff] animate-pulse'}`}>
              {callState === 'CONNECTED' ? formatTimer(callDuration) : callState}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {KEYPAD_KEYS.map(({ key, sub }) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            disabled={callState !== 'IDLE' && callState !== 'CONNECTED'}
            className="group h-14 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] active:scale-95 border border-white/5 flex flex-col items-center justify-center select-none"
          >
            <span className="text-xl font-bold text-white group-hover:text-[#00d2ff]">{key}</span>
            <span className="text-[9px] font-semibold text-[#8a99ad] mt-0.5">{sub}</span>
          </button>
        ))}
      </div>

      {callState === 'IDLE' ? (
        <button
          onClick={startCall}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00ff88] to-[#00d2ff] hover:opacity-95 text-[#070913] font-bold flex items-center justify-center gap-3 transition"
        >
          <Phone className="w-5 h-5 fill-current" />
          <span>Call Destination</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs ${isMuted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-white/5 text-[#8a99ad] border-white/10'}`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isMuted ? 'Muted' : 'Mute'}</span>
            </button>
            <button
              onClick={() => setIsOnHold(!isOnHold)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs ${isOnHold ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 text-[#8a99ad] border-white/10'}`}
            >
              {isOnHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span>{isOnHold ? 'Resume' : 'Hold'}</span>
            </button>
            <button
              onClick={() => playDtmfTone('0')}
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 text-xs text-[#8a99ad]"
            >
              <Volume2 className="w-4 h-4" />
              <span>Audio</span>
            </button>
          </div>
          <button
            onClick={endCall}
            className="w-full h-12 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>
      )}
    </div>
  );
}