'use client';

import React, { useState } from 'react';
import {
  Building,
  Users,
  ShieldCheck,
  Phone,
  Radio,
  Wallet,
  CheckCircle2,
  Lock,
  Plus,
  Search,
  Sliders,
  Server
} from 'lucide-react';

interface TenantAccount {
  id: string;
  companyName: string;
  adminName: string;
  email: string;
  assignedDid: string;
  maxChannels: number;
  walletBalanceBDT: number;
  kybStatus: 'APPROVED' | 'PENDING';
  status: 'ACTIVE' | 'SUSPENDED';
}

const INITIAL_TENANTS: TenantAccount[] = [
  {
    id: 'ten-01',
    companyName: 'Chowdhury Textiles Ltd',
    adminName: 'Rahim Chowdhury',
    email: 'rahim@chowdhurytextiles.com',
    assignedDid: '+8809612000000',
    maxChannels: 20,
    walletBalanceBDT: 15000.0,
    kybStatus: 'APPROVED',
    status: 'ACTIVE',
  },
  {
    id: 'ten-02',
    companyName: 'Fintech Solutions BD',
    adminName: 'Farhana Yasmin',
    email: 'farhana@fintechbd.com',
    assignedDid: '+8809638112233',
    maxChannels: 10,
    walletBalanceBDT: 8400.0,
    kybStatus: 'APPROVED',
    status: 'ACTIVE',
  },
  {
    id: 'ten-03',
    companyName: 'Apex Logistics Freight',
    adminName: 'Tanvir Ahmed',
    email: 'tanvir@apexlogistics.bd',
    assignedDid: '+880800123456',
    maxChannels: 30,
    walletBalanceBDT: 24500.0,
    kybStatus: 'APPROVED',
    status: 'ACTIVE',
  },
];

export default function TenantsGovernancePage() {
  const [tenants, setTenants] = useState<TenantAccount[]>(INITIAL_TENANTS);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setTenants(
      tenants.map((t) =>
        t.id === id ? { ...t, status: t.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : t
      )
    );
    setNotice('Tenant operational state updated successfully.');
    setTimeout(() => setNotice(null), 3000);
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.companyName.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedDid.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Tenant Workspace &amp; Client Governance</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              Multi-Tenant SBC OS
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Manage approved corporate tenants, channel capacity quotas, DID assignments, and wallet ledgers.
          </p>
        </div>

        <button
          onClick={() => alert('Manual tenant onboarding wizard initialized.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Provision Tenant</span>
        </button>
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

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Tenants</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              {tenants.filter((t) => t.status === 'ACTIVE').length} Companies
            </h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">KYB Verified</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Allocated SIP Channels</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {tenants.reduce((acc, t) => acc + t.maxChannels, 0)} Channels
            </h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">SBC Core Capacity</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total Wallet Balances</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">
              ৳ {tenants.reduce((acc, t) => acc + t.walletBalanceBDT, 0).toLocaleString()}
            </h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Prepaid BDT Ledger</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Platform SLA</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">99.98%</h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">BDIX Interconnect</span>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, email or DID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Corporate Client</th>
                <th className="py-3.5 px-4">Assigned DID</th>
                <th className="py-3.5 px-4">Channel Quota</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">KYB Status</th>
                <th className="py-3.5 px-4">Operations</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {filteredTenants.map((ten) => (
                <tr key={ten.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-sans">
                    <span className="font-bold text-white block">{ten.companyName}</span>
                    <span className="text-[10px] text-[#8a99ad]">{ten.adminName} ({ten.email})</span>
                  </td>
                  <td className="py-4 px-4 text-[#00d2ff] font-bold">{ten.assignedDid}</td>
                  <td className="py-4 px-4 text-white">{ten.maxChannels} Concurrent</td>
                  <td className="py-4 px-4 text-[#00ff88] font-bold">৳ {ten.walletBalanceBDT.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 text-[10px] font-bold">
                      {ten.kybStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ten.status === 'ACTIVE'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {ten.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(ten.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition ${
                        ten.status === 'ACTIVE'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                          : 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/30'
                      }`}
                    >
                      {ten.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
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