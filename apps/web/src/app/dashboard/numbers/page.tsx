'use client';

import React, { useState } from 'react';
import {
  Phone,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Server,
  Building,
  Tag,
  Trash2,
  Sliders,
  DollarSign,
  Radio,
  ArrowUpRight
} from 'lucide-react';

interface DIDNumber {
  id: string;
  number: string;
  type: 'LOCAL_IP' | 'TOLL_FREE' | 'INTERNATIONAL';
  gateway: string;
  assignedTo: string;
  monthlyFeeBDT: number;
  status: 'ACTIVE' | 'RESERVED' | 'AVAILABLE';
  acquiredDate: string;
}

const INITIAL_NUMBERS: DIDNumber[] = [
  {
    id: 'did-01',
    number: '+8809612000000',
    type: 'LOCAL_IP',
    gateway: 'BTCL Wholesale National SBC',
    assignedTo: 'Chowdhury Textiles Ltd',
    monthlyFeeBDT: 1500,
    status: 'ACTIVE',
    acquiredDate: '10 Jan 2026',
  },
  {
    id: 'did-02',
    number: '+8809638112233',
    type: 'LOCAL_IP',
    gateway: 'AmberIT Enterprise SBC',
    assignedTo: 'Fintech Solutions BD',
    monthlyFeeBDT: 1500,
    status: 'ACTIVE',
    acquiredDate: '15 Feb 2026',
  },
  {
    id: 'did-03',
    number: '+880800123456',
    type: 'TOLL_FREE',
    gateway: 'BTCL Toll-Free Trunk',
    assignedTo: 'Apex Logistics Freight',
    monthlyFeeBDT: 3500,
    status: 'ACTIVE',
    acquiredDate: '01 Mar 2026',
  },
  {
    id: 'did-04',
    number: '+8809612999999',
    type: 'LOCAL_IP',
    gateway: 'Unassigned Pool',
    assignedTo: 'Unassigned',
    monthlyFeeBDT: 1500,
    status: 'AVAILABLE',
    acquiredDate: '12 May 2026',
  },
];

export default function NumbersDIDPage() {
  const [numbers, setNumbers] = useState<DIDNumber[]>(INITIAL_NUMBERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNumbers = numbers.filter((n) => {
    const matchesSearch = n.number.includes(search) || n.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Numbers &amp; DID Inventory Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              096 Series / Toll-Free
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Allocate IP telephony DIDs, toll-free numbers, and map upstream carrier routing destinations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Provision New DID</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Total DID Inventory</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">{numbers.length} Numbers</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">BTRC Allocated</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active DIDs</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00d2ff] font-mono">
              {numbers.filter((n) => n.status === 'ACTIVE').length} Assigned
            </h3>
          </div>
          <span className="text-[11px] text-[#00d2ff] mt-1 block font-mono">In Production Routing</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Available Pool</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#9d4edd] font-mono">
              {numbers.filter((n) => n.status === 'AVAILABLE').length} Ready
            </h3>
          </div>
          <span className="text-[11px] text-[#8a99ad] mt-1 block font-mono">Instant Provisioning</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Monthly DID Rental</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">
              ৳ {numbers.filter((n) => n.status === 'ACTIVE').reduce((acc, n) => acc + n.monthlyFeeBDT, 0).toLocaleString()}
            </h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Recurring Ledger</span>
        </div>
      </div>

      {/* Filter & Search Deck */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by number or assigned client..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>

          <div className="flex gap-1.5 text-xs">
            {['ALL', 'ACTIVE', 'AVAILABLE'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl border font-medium transition ${
                  statusFilter === st
                    ? 'bg-[#00d2ff]/15 border-[#00d2ff]/40 text-[#00d2ff]'
                    : 'bg-white/5 border-white/5 text-[#8a99ad] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Numbers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">DID Number</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Assigned Upstream Gateway</th>
                <th className="py-3.5 px-4">Assigned Tenant / Client</th>
                <th className="py-3.5 px-4">Monthly Rental</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredNumbers.map((n) => (
                <tr key={n.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-[#00d2ff] text-sm">{n.number}</td>
                  <td className="py-4 px-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-white border border-white/10 text-[10px]">
                      {n.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/90">{n.gateway}</td>
                  <td className="py-4 px-4 font-semibold text-white">{n.assignedTo}</td>
                  <td className="py-4 px-4 font-mono font-bold text-white">৳ {n.monthlyFeeBDT.toLocaleString()} /mo</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        n.status === 'ACTIVE'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                          : 'bg-white/5 text-[#8a99ad] border border-white/10'
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => alert(`Configuring routing for ${n.number}`)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition text-[11px]"
                    >
                      Configure
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