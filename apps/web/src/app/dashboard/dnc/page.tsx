'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Ban,
  Upload,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  FileText,
  Radio,
  Lock
} from 'lucide-react';

interface DNCRecord {
  id: string;
  phoneNumber: string;
  reason: string;
  addedBy: string;
  addedDate: string;
}

const INITIAL_DNC: DNCRecord[] = [
  {
    id: 'dnc-1',
    phoneNumber: '+8801811223344',
    reason: 'Explicit Customer Opt-Out Request',
    addedBy: 'Tasnim Munni',
    addedDate: '15 Sep 2026',
  },
  {
    id: 'dnc-2',
    phoneNumber: '+8801922334455',
    reason: 'BTRC National Do-Not-Call Registry Match',
    addedBy: 'System Auto-Sync',
    addedDate: '14 Sep 2026',
  },
  {
    id: 'dnc-3',
    phoneNumber: '+8801733445566',
    reason: 'Harassment Complaint Flagged',
    addedBy: 'Mahfuzur Rahman',
    addedDate: '12 Sep 2026',
  },
];

export default function DNCManagerPage() {
  const [dncList, setDncList] = useState<DNCRecord[]>(INITIAL_DNC);
  const [newPhone, setNewPhone] = useState('');
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const handleAddDnc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;

    const newItem: DNCRecord = {
      id: `dnc-${Date.now().toString().slice(-4)}`,
      phoneNumber: newPhone,
      reason: reason || 'Manual Admin Block',
      addedBy: 'Tasnim Munni (Admin)',
      addedDate: 'Just Now',
    };

    setDncList([newItem, ...dncList]);
    setNewPhone('');
    setReason('');
    setNotice(`Number ${newPhone} successfully added to DNC Scrubbing List.`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleDelete = (id: string) => {
    setDncList(dncList.filter((item) => item.id !== id));
    setNotice('Number removed from DNC blacklist.');
    setTimeout(() => setNotice(null), 3500);
  };

  const filteredDnc = dncList.filter(
    (item) => item.phoneNumber.includes(search) || item.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Do-Not-Call (DNC) &amp; Compliance Manager</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono">
              Outbound Scrubbing Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Prevent outbound predictive dialers from calling opted-out numbers, complaints, and BTRC blacklists.
          </p>
        </div>
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

      {/* Add DNC Form Card */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 max-w-2xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Ban className="w-4 h-4 text-rose-400" />
          <span>Add Number to DNC Blacklist</span>
        </h3>

        <form onSubmit={handleAddDnc} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Phone Number (CLI)</label>
            <input
              type="text"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+88017..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Opt-Out Reason</label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Customer Opt-Out"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-lg shadow-rose-600/20"
            >
              Block Number
            </button>
          </div>
        </form>
      </div>

      {/* DNC Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden space-y-3">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blacklisted numbers..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>
          <span className="text-xs text-[#8a99ad] font-mono">Total Blacklisted: {dncList.length} numbers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Blacklisted CLI</th>
                <th className="py-3.5 px-4">Opt-Out Reason</th>
                <th className="py-3.5 px-4">Added By</th>
                <th className="py-3.5 px-4">Date Added</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {filteredDnc.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-rose-400">{item.phoneNumber}</td>
                  <td className="py-4 px-4 text-white font-sans">{item.reason}</td>
                  <td className="py-4 px-4 text-white/90">{item.addedBy}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{item.addedDate}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-rose-400 hover:bg-rose-500/20 transition"
                      title="Remove from DNC"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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