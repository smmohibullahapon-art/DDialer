'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, User, Sparkles, AlertCircle } from 'lucide-react';

interface RequestItem {
  id: string;
  tenantName: string;
  serviceName: string;
  requestedDate: string;
  status: 'PENDING' | 'APPROVED';
}

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-01',
    tenantName: 'Sayed (DialDynamic)',
    serviceName: 'AI Sentiment Analysis Engine',
    requestedDate: 'Today, 02:45 PM',
    status: 'PENDING',
  },
  {
    id: 'req-02',
    tenantName: 'Chowdhury Textiles',
    serviceName: 'Bulk SMS & SMPP Gateway',
    requestedDate: 'Yesterday, 11:20 AM',
    status: 'APPROVED',
  },
];

export default function AdminServiceRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [notice, setNotice] = useState<string | null>(null);

  const approveRequest = (id: string, serviceName: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'APPROVED' as const } : r))
    );
    setNotice(`Service "${serviceName}" approved successfully. It is now live on the customer portal.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>Tenant Service Requests &amp; Approvals</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono">
            Admin Governance
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Review and approve incoming service subscriptions and AI feature requests from tenant customers.
        </p>
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

      {/* Requests Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium font-mono">
              <tr>
                <th className="py-3.5 px-4">Tenant / Customer</th>
                <th className="py-3.5 px-4">Requested Service</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00d2ff]" />
                    <span>{req.tenantName}</span>
                  </td>
                  <td className="py-4 px-4 text-[#00d2ff] font-bold">{req.serviceName}</td>
                  <td className="py-4 px-4 text-white/80">{req.requestedDate}</td>
                  <td className="py-4 px-4">
                    {req.status === 'APPROVED' ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 text-[10px] font-bold uppercase">
                        Approved &amp; Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase">
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {req.status === 'PENDING' ? (
                      <button
                        onClick={() => approveRequest(req.id, req.serviceName)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] hover:brightness-110 transition font-bold"
                      >
                        Approve Service
                      </button>
                    ) : (
                      <span className="text-[#8a99ad] text-[11px]">No Action Needed</span>
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