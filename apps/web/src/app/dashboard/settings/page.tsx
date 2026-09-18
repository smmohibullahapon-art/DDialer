'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building,
  ShieldCheck,
  Radio,
  Users,
  Lock,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Globe,
  Server,
  Zap,
  Key,
  Trash2,
  Plus
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'NOC_ENGINEER' | 'CALLCENTER_SUPERVISOR' | 'AGENT';
  extension: string;
  status: 'ACTIVE' | 'INVITED';
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'mem-1',
    name: 'Tasnim Munni',
    email: 'tasnim@dialdynamic.com',
    role: 'SUPER_ADMIN',
    extension: '1001',
    status: 'ACTIVE',
  },
  {
    id: 'mem-2',
    name: 'Mahfuzur Rahman',
    email: 'mahfuz@dialdynamic.com',
    role: 'NOC_ENGINEER',
    extension: '1002',
    status: 'ACTIVE',
  },
  {
    id: 'mem-3',
    name: 'Farhana Sultana',
    email: 'farhana@dialdynamic.com',
    role: 'CALLCENTER_SUPERVISOR',
    extension: '1003',
    status: 'ACTIVE',
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'ORGANIZATION' | 'TELECOM' | 'TEAM' | 'SECURITY'>('ORGANIZATION');

  // Organization state
  const [companyName, setCompanyName] = useState('Dial Dynamic Ltd');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/092811/2024');
  const [tinNumber, setTinNumber] = useState('841920194821');
  const [btrcCategory, setBtrcCategory] = useState('IPTSP / Call Center License');
  const [contactEmail, setContactEmail] = useState('admin@dialdynamic.com');
  const [contactPhone, setContactPhone] = useState('+8801712345678');

  // Telecom state
  const [defaultPulse, setDefaultPulse] = useState<'1_SEC' | '10_SEC' | '30_SEC'>('1_SEC');
  const [primaryCodec, setPrimaryCodec] = useState('OPUS');
  const [stunServer, setStunServer] = useState('stun:stun.l.google.com:19302');
  const [turnServer, setTurnServer] = useState('turn:turn.bd.ddialer.xyz:3478');
  const [recordAllCalls, setRecordAllCalls] = useState(true);

  // Security state
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('60');

  // Team state
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setSavedNotice(`${section} settings successfully persisted to DDialer Core.`);
    setTimeout(() => setSavedNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Workspace Settings &amp; Governance</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Tenant OS
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Manage organization identity, BTRC telecommunication compliance, WebRTC SBC engines, and access policies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
          <span className="text-xs text-[#00ff88] font-mono">Tenant ID: ten_bd_0912</span>
        </div>
      </div>

      {/* Saved Toast Notification */}
      {savedNotice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{savedNotice}</span>
          </div>
          <button onClick={() => setSavedNotice(null)} className="text-[#8a99ad] hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('ORGANIZATION')}
          className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'ORGANIZATION'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Organization &amp; KYC</span>
        </button>

        <button
          onClick={() => setActiveTab('TELECOM')}
          className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'TELECOM'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>WebRTC &amp; Codec Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('TEAM')}
          className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'TEAM'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team &amp; RBAC Roles</span>
        </button>

        <button
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-2 ${
            activeTab === 'SECURITY'
              ? 'bg-[#00d2ff]/15 border border-[#00d2ff]/40 text-[#00d2ff]'
              : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security &amp; Whitelisting</span>
        </button>
      </div>

      {/* View 1: Organization & KYC */}
      {activeTab === 'ORGANIZATION' && (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 max-w-4xl">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Company Identity &amp; BTRC Compliance</h3>
              <p className="text-xs text-[#8a99ad] mt-0.5">Required for regulatory compliance and carrier KYC authentication.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 text-[10px] font-mono font-bold uppercase">
              BTRC Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Registered Legal Entity</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">License Category</label>
              <input
                type="text"
                value={btrcCategory}
                onChange={(e) => setBtrcCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Trade License Number</label>
              <input
                type="text"
                value={tradeLicense}
                onChange={(e) => setTradeLicense(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">e-TIN / Tax Identification</label>
              <input
                type="text"
                value={tinNumber}
                onChange={(e) => setTinNumber(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Official Billing Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Authorized Focal Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => handleSave('Organization KYC')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save Organization Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* View 2: WebRTC & Codec Engine */}
      {activeTab === 'TELECOM' && (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 max-w-4xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white">Telephony Codecs &amp; WebRTC Media Engine</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Control browser softphone media transport, STUN/TURN traversal, and call recording defaults.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Default Audio Codec Profile</label>
                <select
                  value={primaryCodec}
                  onChange={(e) => setPrimaryCodec(e.target.value)}
                  className="w-full bg-[#070913] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none"
                >
                  <option value="OPUS">Opus (48kHz Wideband HD - Recommended)</option>
                  <option value="G711A">G.711a (PCMA - BTCL &amp; AmberIT Standard)</option>
                  <option value="G729">G.729 (8kbps Low-Bandwidth Satellite)</option>
                </select>
              </div>

              <div>
                <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Default Rating Pulse Model</label>
                <select
                  value={defaultPulse}
                  onChange={(e) => setDefaultPulse(e.target.value as typeof defaultPulse)}
                  className="w-full bg-[#070913] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none"
                >
                  <option value="1_SEC">1-Second Pulse (No Setup Fee)</option>
                  <option value="10_SEC">10-Second Pulse</option>
                  <option value="30_SEC">30-Second Pulse</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">NAT Traversal STUN Server</label>
                <input
                  type="text"
                  value={stunServer}
                  onChange={(e) => setStunServer(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">RTP Relay TURN Server</label>
                <input
                  type="text"
                  value={turnServer}
                  onChange={(e) => setTurnServer(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Automatic Dual-Channel Recording</span>
                <span className="text-[#8a99ad]">Record inbound and outbound calls in stereo WAV and sync to S3 Cloud Vault.</span>
              </div>
              <button
                type="button"
                onClick={() => setRecordAllCalls(!recordAllCalls)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                  recordAllCalls ? 'bg-[#00ff88] justify-end' : 'bg-white/20 justify-start'
                }`}
              >
                <div className="bg-[#070913] w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => handleSave('Telecom Engine')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Update Telecom Profiles</span>
            </button>
          </div>
        </div>
      )}

      {/* View 3: Team & RBAC Roles */}
      {activeTab === 'TEAM' && (
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Team Roster &amp; Access Controls (RBAC)</h3>
              <p className="text-xs text-[#8a99ad] mt-0.5">Control permissions across SIP softphones, NOC oversight, and billing access.</p>
            </div>
            <button
              onClick={() => alert('Invite member dialog ready.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <table className="w-full text-left text-sm text-[#8a99ad]">
              <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
                <tr>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">RBAC Role</th>
                  <th className="py-3.5 px-4">SIP Ext</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4 font-medium text-white">
                      <div>{m.name}</div>
                      <div className="text-[10px] text-[#8a99ad] font-mono">{m.email}</div>
                    </td>
                    <td className="py-4 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] text-[10px] border border-white/10">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-white">Ext {m.extension}</td>
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                        {m.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => alert(`Editing permissions for ${m.name}`)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[11px] transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 4: Security & IP Whitelisting */}
      {activeTab === 'SECURITY' && (
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6 max-w-4xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white">Security &amp; Perimeter Defense</h3>
            <p className="text-xs text-[#8a99ad] mt-0.5">Two-factor authentication, SIP IP Whitelisting, and session timeout policies.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Two-Factor Authentication (2FA)</span>
                <span className="text-[#8a99ad]">Enforce mandatory Authenticator App / SMS OTP for all admin &amp; supervisor logins.</span>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                  twoFactorAuth ? 'bg-[#00ff88] justify-end' : 'bg-white/20 justify-start'
                }`}
              >
                <div className="bg-[#070913] w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Strict SIP Signaling IP Whitelisting</span>
                <span className="text-[#8a99ad]">Reject all SIP REGISTER &amp; INVITE traffic originating outside whitelisted carrier CIDRs.</span>
              </div>
              <button
                type="button"
                onClick={() => setIpWhitelisting(!ipWhitelisting)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                  ipWhitelisting ? 'bg-[#00ff88] justify-end' : 'bg-white/20 justify-start'
                }`}
              >
                <div className="bg-[#070913] w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">Inactivity Session Timeout (Minutes)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-48 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => handleSave('Security Policies')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Apply Security Policies</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}