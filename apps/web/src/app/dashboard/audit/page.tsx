'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Search,
  Filter,
  Clock,
  User,
  CheckCircle2,
  Lock,
  Terminal,
  Activity
} from 'lucide-react';

interface AuditLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  targetEntity: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING';
}

const INITIAL_AUDITS: AuditLog[] = [
  {
    id: 'aud-01',
    actor: 'Tasnim Munni',
    role: 'SUPER_ADMIN',
    action: 'KYB_APPROVED',
    targetEntity: 'Chowdhury Textiles Ltd (ten-01)',
    ipAddress: '103.145.118.20',
    timestamp: 'Today 03:45 PM',
    status: 'SUCCESS',
  },
  {
    id: 'aud-02',
    actor: 'Rahim Chowdhury',
    role: 'TENANT_ADMIN',
    action: 'WALLET_TOPUP_BKASH',
    targetEntity: 'Wallet Deposit ৳ 15,000',
    ipAddress: '27.147.192.10',
    timestamp: 'Today 03:10 AM',
    status: 'SUCCESS',
  },
  {
    id: 'aud-03',
    actor: 'System Daemon',
    role: 'KAMAILIO_SBC',
    action: 'CARRIER_FAILOVER_TRIGGER',
    targetEntity: 'AmberIT -> BTCL National Trunk',
    ipAddress: '10.0.12.15',
    timestamp: 'Today 01:22 AM',
    status: 'WARNING',
  },
  {
    id: 'aud-04',
    actor: 'Mahfuzur Rahman',
    role: 'NOC_ENGINEER',
    action: 'DID_PROVISIONED',
    targetEntity: '+8809612000000',
    ipAddress: '103.145.118.25',
    timestamp: 'Yesterday 11:05 AM',
    status: 'SUCCESS',
  },
];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDITS);
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.targetEntity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>System Audit Logs &amp; Compliance Trail</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              BTRC Immutable Ledger
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Track administrator actions, KYB approvals, carrier failover events, and security access logs.
          </p>
        </div>
      </div>

      {/* Audit KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Audit Events</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">1,429 Logged</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Encrypted Storage</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">KYB Approvals Today</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">2 Tenants</h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">BTRC Compliant</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Security Alerts</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">0 Breaches</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Zero Trust Active</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Retention Period</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">365 Days</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Regulatory Mandate</span>
        </div>
      </div>

      {/* Audit Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by actor, action or target..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>
          <span className="text-xs text-[#8a99ad] font-mono">Showing filtered audit trail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Actor / User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans">{log.actor}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10 text-[10px]">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white">{log.action}</td>
                  <td className="py-4 px-4 text-white/90">{log.targetEntity}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{log.ipAddress}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{log.timestamp}</td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        log.status === 'SUCCESS'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {log.status}
                    </span>
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