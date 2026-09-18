'use client';

import React, { useState } from 'react';
import {
  Radio,
  Plus,
  ShieldCheck,
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Eye,
  EyeOff,
  Code2,
  RefreshCw,
  Cpu,
  Wifi,
  Sliders,
  Settings2,
  Trash2,
  Lock,
  Globe
} from 'lucide-react';

interface SIPTrunk {
  id: string;
  name: string;
  authType: 'IP_AUTH' | 'USER_PASS';
  sipServer: string;
  port: number;
  username?: string;
  ipWhitelist?: string;
  carrier: string;
  channelsActive: number;
  channelLimit: number;
  cpsLimit: number;
  codec: string;
  status: 'REGISTERED' | 'UNREGISTERED' | 'STANDBY';
  latencyMs: number;
  lastHeartbeat: string;
}

const INITIAL_TRUNKS: SIPTrunk[] = [
  {
    id: 'trk-01',
    name: 'BTCL Wholesale National Trunk',
    authType: 'IP_AUTH',
    sipServer: 'sip.btcl.com.bd',
    port: 5060,
    ipWhitelist: '103.145.118.24/32',
    carrier: 'BTCL National Route',
    channelsActive: 28,
    channelLimit: 60,
    cpsLimit: 15,
    codec: 'G.711a (PCMA) / G.729',
    status: 'REGISTERED',
    latencyMs: 14,
    lastHeartbeat: '2s ago',
  },
  {
    id: 'trk-02',
    name: 'AmberIT Enterprise SBC Trunk',
    authType: 'USER_PASS',
    sipServer: 'sbc01.amberit.com.bd',
    port: 5060,
    username: 'ddialer_amber_trunk',
    carrier: 'AmberIT Telecom',
    channelsActive: 12,
    channelLimit: 40,
    cpsLimit: 10,
    codec: 'Opus / G.711a (PCMA)',
    status: 'REGISTERED',
    latencyMs: 18,
    lastHeartbeat: '4s ago',
  },
  {
    id: 'trk-03',
    name: 'Dhaka HQ On-Premise FreePBX Trunk',
    authType: 'IP_AUTH',
    sipServer: 'pbx.hq.dialdynamic.com',
    port: 5060,
    ipWhitelist: '182.160.101.55/32',
    carrier: 'Internal PBX Interconnect',
    channelsActive: 8,
    channelLimit: 30,
    cpsLimit: 8,
    codec: 'Opus (48kHz)',
    status: 'REGISTERED',
    latencyMs: 6,
    lastHeartbeat: '1s ago',
  },
  {
    id: 'trk-04',
    name: 'Singapore Cloud Kamailio Relay',
    authType: 'USER_PASS',
    sipServer: 'sg-sbc.global.ddialer.xyz',
    port: 5061,
    username: 'sg_kamailio_trunk',
    carrier: 'Global Carrier Interconnect',
    channelsActive: 0,
    channelLimit: 50,
    cpsLimit: 20,
    codec: 'Opus / G.711u',
    status: 'STANDBY',
    latencyMs: 52,
    lastHeartbeat: '12s ago',
  },
];

export default function SIPTrunksPage() {
  const [trunks, setTrunks] = useState<SIPTrunk[]>(INITIAL_TRUNKS);
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'TRUNKS' | 'CONFIG_TEMPLATES'>('TRUNKS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleShowSecret = (id: string) => {
    setShowSecrets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>SIP Trunks & IP PBX Interconnects</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              SIP 2.0 / Kamailio Core
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Enterprise IP Authentication, SIP credentials, codec profiles, and FreePBX/Asterisk interconnects.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New SIP Trunk</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">SIP Trunks Online</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              {trunks.filter((t) => t.status === 'REGISTERED').length} / {trunks.length}
            </h3>
            <span className="text-[11px] text-[#00ff88]">Heartbeat OK</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Channels</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {trunks.reduce((acc, t) => acc + t.channelsActive, 0)} Channels
            </h3>
            <span className="text-[11px] text-[#8a99ad]">Capacity: 180</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Signaling Protocols</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">UDP / TLS</h3>
            <span className="text-[11px] text-[#00d2ff]">Port 5060/5061</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Average RTT Ping</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">12.6 ms</h3>
            <span className="text-[11px] text-[#00ff88]">National BDIX</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('TRUNKS')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'TRUNKS'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Configured SIP Trunks ({trunks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('CONFIG_TEMPLATES')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'CONFIG_TEMPLATES'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>PBX Interconnect Configuration Snippets</span>
        </button>
      </div>

      {/* View 1: SIP Trunks Cards */}
      {activeTab === 'TRUNKS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trunks.map((t) => (
            <div key={t.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 hover:border-white/20 transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{t.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10">
                      {t.authType}
                    </span>
                  </div>
                  <p className="text-xs text-[#8a99ad] mt-1 font-mono">{t.carrier}</p>
                </div>

                <span
                  className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    t.status === 'REGISTERED'
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {t.status}
                </span>
              </div>

              {/* Server Endpoint Bar */}
              <div className="p-3 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-white/90 truncate">
                  <Server className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
                  <span className="truncate">{t.sipServer}:{t.port}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(`${t.sipServer}:${t.port}`, t.id)}
                  className="text-[#8a99ad] hover:text-white transition ml-2 shrink-0"
                  title="Copy Server Host"
                >
                  {copiedId === t.id ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Authentication & Security Parameters */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                {t.authType === 'IP_AUTH' ? (
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a99ad] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                      Whitelisted IP:
                    </span>
                    <span className="font-mono text-white font-semibold">{t.ipWhitelist}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a99ad] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#9d4edd]" />
                      SIP Username:
                    </span>
                    <span className="font-mono text-white font-semibold">{t.username}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="text-[#8a99ad]">Supported Codecs:</span>
                  <span className="font-mono text-[#00d2ff]">{t.codec}</span>
                </div>
              </div>

              {/* Capacity & Telemetry */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5 text-[11px]">
                <div>
                  <span className="text-[#8a99ad] block">Live Channels</span>
                  <span className="font-mono font-bold text-white">
                    {t.channelsActive} / {t.channelLimit}
                  </span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">Max CPS Cap</span>
                  <span className="font-mono font-bold text-[#00ff88]">{t.cpsLimit} CPS</span>
                </div>
                <div>
                  <span className="text-[#8a99ad] block">Latency (RTT)</span>
                  <span className="font-mono text-[#00d2ff] font-bold">{t.latencyMs} ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Configuration Snippets for Asterisk / FreePBX */}
      {activeTab === 'CONFIG_TEMPLATES' && (
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">IP PBX Interconnect Snippets</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">
              Copy and paste these pre-configured templates into your Asterisk (pjsip.conf) or FreePBX SBC.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#070913] border border-white/10 font-mono text-xs text-white/90 space-y-2">
              <div className="flex items-center justify-between text-[#8a99ad] border-b border-white/10 pb-2">
                <span>Asterisk pjsip.conf (Registration Trunk)</span>
                <button
                  onClick={() => alert('Asterisk configuration copied to clipboard!')}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-[11px] text-[#00d2ff] leading-relaxed overflow-x-auto">
{`[ddialer-endpoint]
type=endpoint
transport=transport-udp
context=from-pstn
disallow=all
allow=opus
allow=alaw
outbound_auth=ddialer-auth
aors=ddialer-aor

[ddialer-auth]
type=auth
auth_type=userpass
username=ddialer_amber_trunk
password=YOUR_TRUNK_SECRET_KEY

[ddialer-aor]
type=aor
contact=sip:sbc01.amberit.com.bd:5060`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Create Trunk Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#070913] border border-white/15 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#00d2ff]" />
                <span>Add Upstream SIP Trunk</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8a99ad] hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                alert('SIP Trunk interconnect initiated with verification handshake.');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Trunk Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AmberIT SBC Core"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SIP Host / IP</label>
                  <input
                    type="text"
                    required
                    placeholder="sip.carrier.bd"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SIP Port</label>
                  <input
                    type="number"
                    defaultValue={5060}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Channel Capacity</label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
                <div>
                  <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">CPS Rate Limit</label>
                  <input
                    type="number"
                    defaultValue={10}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
              >
                Provision SIP Interconnect
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}