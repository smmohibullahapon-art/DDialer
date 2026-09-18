'use client';

import React, { useState } from 'react';
import {
  Disc,
  Play,
  Pause,
  Download,
  Search,
  Filter,
  Volume2,
  VolumeX,
  FileAudio,
  ShieldCheck,
  Calendar,
  Clock,
  Radio,
  FileText,
  Trash2,
  Lock,
  Share2,
  Headphones,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface Recording {
  id: string;
  sessionId: string;
  callerCli: string;
  destination: string;
  direction: 'INBOUND' | 'OUTBOUND';
  durationSec: number;
  agentName: string;
  fileSizeMb: number;
  format: 'WAV_PCM' | 'MP3_STEREO';
  channels: 'DUAL_CHANNEL' | 'MONO';
  retentionDaysLeft: number;
  recordedAt: string;
  status: 'VAULT_STORED' | 'ARCHIVED';
}

const INITIAL_RECORDINGS: Recording[] = [
  {
    id: 'rec-01',
    sessionId: 'sess-8f3e-4b2a',
    callerCli: '+8801712345678',
    destination: '+8809612000000',
    direction: 'INBOUND',
    durationSec: 184,
    agentName: 'Tasnim Munni',
    fileSizeMb: 4.2,
    format: 'WAV_PCM',
    channels: 'DUAL_CHANNEL',
    retentionDaysLeft: 89,
    recordedAt: 'Today 04:12 AM',
    status: 'VAULT_STORED',
  },
  {
    id: 'rec-02',
    sessionId: 'sess-9d1c-7a5f',
    callerCli: '+8809638112233',
    destination: '+8801911987654',
    direction: 'OUTBOUND',
    durationSec: 92,
    agentName: 'Mahfuzur Rahman',
    fileSizeMb: 2.1,
    format: 'MP3_STEREO',
    channels: 'DUAL_CHANNEL',
    retentionDaysLeft: 88,
    recordedAt: 'Today 03:45 AM',
    status: 'VAULT_STORED',
  },
  {
    id: 'rec-03',
    sessionId: 'sess-7c3d-1a8e',
    callerCli: '+8809612000000',
    destination: '+8801700112233',
    direction: 'OUTBOUND',
    durationSec: 240,
    agentName: 'Farhana Sultana',
    fileSizeMb: 5.6,
    format: 'WAV_PCM',
    channels: 'DUAL_CHANNEL',
    retentionDaysLeft: 82,
    recordedAt: 'Yesterday 10:15 PM',
    status: 'VAULT_STORED',
  },
  {
    id: 'rec-04',
    sessionId: 'sess-2a5b-9c8d',
    callerCli: '+8801822334455',
    destination: '+880800123456',
    direction: 'INBOUND',
    durationSec: 312,
    agentName: 'Tanvir Ahmed',
    fileSizeMb: 7.2,
    format: 'WAV_PCM',
    channels: 'DUAL_CHANNEL',
    retentionDaysLeft: 74,
    recordedAt: '14 Sep 2026',
    status: 'ARCHIVED',
  },
];

export default function CallRecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>(INITIAL_RECORDINGS);
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [search, setSearch] = useState('');
  const [directionFilter, setDirectionFilter] = useState('ALL');

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const togglePlayback = (id: string) => {
    if (activePlaybackId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlaybackId(id);
      setIsPlaying(true);
    }
  };

  const filteredRecordings = recordings.filter((r) => {
    const matchesSearch =
      r.sessionId.includes(search) ||
      r.callerCli.includes(search) ||
      r.destination.includes(search) ||
      r.agentName.toLowerCase().includes(search.toLowerCase());
    const matchesDirection = directionFilter === 'ALL' || r.direction === directionFilter;
    return matchesSearch && matchesDirection;
  });

  const activeRecording = recordings.find((r) => r.id === activePlaybackId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Call Recordings &amp; Media Vault</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono">
              Dual-Channel PCM
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            BTRC-compliant stereo audio storage, dual-track agent/caller separation, and encrypted media retention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
          <span className="text-xs text-[#00ff88] font-mono">S3 AES-256 Vault Encrypted</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Vault Recordings</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">{recordings.length} Audios</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">100% Dual Channel</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Stored Duration</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">13m 48s</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">19.1 MB Vault Size</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">BTRC Retention Policy</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">90 Days</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Regulatory Compliant</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">AI Diarization Ready</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">Synced</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Direct AI Whisper Pipe</span>
        </div>
      </div>

      {/* Floating Active Player Box */}
      {activeRecording && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-[#00d2ff]/40 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] text-[#070913] flex items-center justify-center shadow-lg shadow-[#00d2ff]/20 hover:brightness-110 transition"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{activeRecording.callerCli} → {activeRecording.destination}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#00ff88]">
                    {activeRecording.format}
                  </span>
                </div>
                <p className="text-xs text-[#8a99ad] font-mono mt-0.5">
                  Handled by {activeRecording.agentName} • Duration: {formatDuration(activeRecording.durationSec)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback speed toggle */}
              <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-[11px] font-mono">
                {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg transition ${
                      playbackSpeed === spd ? 'bg-[#00d2ff] text-[#070913] font-bold' : 'text-[#8a99ad] hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => alert(`Downloading ${activeRecording.sessionId}.wav...`)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                title="Download Clean Master WAV"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Stereo Waveform Simulation */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-mono text-[#8a99ad]">
              <span className="flex items-center gap-1.5 text-[#00d2ff]">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff]"></span> Channel L: Agent ({activeRecording.agentName})
              </span>
              <span className="flex items-center gap-1.5 text-[#00ff88]">
                <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span> Channel R: Caller ({activeRecording.callerCli})
              </span>
            </div>

            <div className="h-10 rounded-xl bg-[#070913] border border-white/5 flex items-center gap-1 px-3 overflow-hidden">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: `${20 + ((i * 17) % 65)}%`,
                    animationDelay: `${i * 30}ms`
                  }}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-gradient-to-t from-[#00d2ff] to-[#00ff88]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Deck and Recording Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search session, CLI, destination, or agent..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          <div className="flex gap-1.5 text-xs">
            {['ALL', 'INBOUND', 'OUTBOUND'].map((d) => (
              <button
                key={d}
                onClick={() => setDirectionFilter(d)}
                className={`px-3 py-1 rounded-xl border font-medium transition ${
                  directionFilter === d
                    ? 'bg-[#00d2ff]/15 border-[#00d2ff]/40 text-[#00d2ff]'
                    : 'bg-white/5 border-white/5 text-[#8a99ad] hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Play</th>
                <th className="py-3.5 px-4">Session UUID</th>
                <th className="py-3.5 px-4">Caller CLI</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Agent</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Retention</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredRecordings.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePlayback(rec.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                        activePlaybackId === rec.id && isPlaying
                          ? 'bg-[#00ff88] text-[#070913]'
                          : 'bg-white/5 hover:bg-white/10 text-white'
                      }`}
                    >
                      {activePlaybackId === rec.id && isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#00d2ff]">{rec.sessionId}</td>
                  <td className="py-4 px-4 font-mono text-white">{rec.callerCli}</td>
                  <td className="py-4 px-4 font-mono text-white">{rec.destination}</td>
                  <td className="py-4 px-4 font-medium text-white">{rec.agentName}</td>
                  <td className="py-4 px-4 font-mono text-white font-bold">{formatDuration(rec.durationSec)}</td>
                  <td className="py-4 px-4 font-mono">
                    <span className="text-[#00ff88]">{rec.retentionDaysLeft} days left</span>
                  </td>
                  <td className="py-4 px-4 text-[#8a99ad] font-mono">{rec.recordedAt}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading recording ${rec.sessionId}.wav...`)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                      title="Download Audio"
                    >
                      <Download className="w-3.5 h-3.5" />
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