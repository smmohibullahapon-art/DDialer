'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface KYBSubmission {
  id: string;
  companyName: string;
  adminName: string;
  email: string;
  tradeLicense: string;
  tinNumber: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const INITIAL_KYB: KYBSubmission[] = [
  {
    id: 'kyb-01',
    companyName: 'Chowdhury Textiles Ltd',
    adminName: 'Rahim Chowdhury',
    email: 'rahim@chowdhurytextiles.com',
    tradeLicense: 'TRAD/DNCC/092811/2024',
    tinNumber: '841920194821',
    submittedAt: 'Today 02:15 AM',
    status: 'PENDING',
  },
  {
    id: 'kyb-02',
    companyName: 'Fintech Solutions BD',
    adminName: 'Farhana Yasmin',
    email: 'farhana@fintechbd.com',
    tradeLicense: 'TRAD/DSCC/118291/2025',
    tinNumber: '591820394812',
    submittedAt: 'Yesterday 04:30 PM',
    status: 'PENDING',
  },
];

export default function AdminKYBPortal() {
  const [submissions, setSubmissions] = useState<KYBSubmission[]>(INITIAL_KYB);
  const [notice, setNotice] = useState<string | null>(null);

  const handleAction = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setSubmissions(
      submissions.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setNotice(`KYB application successfully ${newStatus.toLowerCase()}. Tenant notification dispatched.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Enterprise KYB Verification &amp; Approval</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono">
              BTRC Regulatory Desk
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Review corporate trade licenses, e-TIN documents, and approve or reject new tenant workspace requests.
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

      {/* Submissions Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Company &amp; Applicant</th>
                <th className="py-3.5 px-4">Trade License No</th>
                <th className="py-3.5 px-4">e-TIN Number</th>
                <th className="py-3.5 px-4">Submitted At</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Regulatory Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-sans">
                    <span className="font-bold text-white block">{sub.companyName}</span>
                    <span className="text-[10px] text-[#8a99ad]">{sub.adminName} ({sub.email})</span>
                  </td>
                  <td className="py-4 px-4 text-white">{sub.tradeLicense}</td>
                  <td className="py-4 px-4 text-white">{sub.tinNumber}</td>
                  <td className="py-4 px-4 text-[#8a99ad]">{sub.submittedAt}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sub.status === 'PENDING'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : sub.status === 'APPROVED'
                          ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {sub.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction(sub.id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 hover:bg-[#00ff88]/30 font-bold transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleAction(sub.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 font-bold transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-white/60 font-sans italic">Processed</span>
                    )}
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