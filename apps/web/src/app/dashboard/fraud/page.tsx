'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
  Radio,
  Sliders,
  Terminal
} from 'lucide-react';

interface FraudAlertItem {
  id: string;
  tenantName: string;
  anomalyType: string;
  destination: string;
  riskScore: number;
  actionTaken: 'TRUNK_BLOCKED' | 'FLAGGED' | 'MONITORING';
  timestamp: string;
}

const INITIAL_FRAUD_ALERTS: FraudAlertItem[] = [
  {
    id: 'fr-01',
    tenantName: 'Chowdhury Textiles Ltd',
    anomalyType: 'Sudden CPS Spike (500% over avg)',
    destination: 'International Premium (Destination +882...)',
    riskScore: 96,
    actionTaken: 'TRUNK_BLOCKED',
    timestamp: 'Today 03:12 AM',
  },
  {
    id: 'fr-02',
    tenantName: 'Fintech Solutions BD',
    anomalyType: 'High ASR Drop & Rapid Short-Duration Calls',
    destination: 'High-Risk Carrier Interconnect',
    riskScore: 84,
    actionTaken: 'FLAGGED',
    timestamp: 'Yesterday 11:45 PM',
  },
];

export default function FraudDetectionPage() {
  const [alerts, setAlerts] = useState<FraudAlertItem[]>(INITIAL_FRAUD_ALERTS);
  const [notice, setNotice] = useState<string | null>(null);

  const unblockTrunk = (tenant: string) => {
    setNotice(`Security override applied: SIP trunks unblocked for ${tenant}.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>AI Toll-Fraud &amp; Anomaly Detection</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              Machine Learning Guard
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Real-time detection of toll fraud, SIM box patterns, and abnormal international traffic spikes.
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

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Blocked Fraudulent Calls</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-rose-400 font-mono">1,492 Calls</h3>
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block font-mono">Prevented Financial Loss</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">Active Security Triggers</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-amber-400 font-mono">2 Incidents</h3>
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block font-mono">Requires Admin Review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider">AI Model Accuracy</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-[#00ff88] font-mono">99.85%</h3>
          </div>
          <span className="text-[11px] text-[#00ff88] mt-1 block font-mono">Zero Trust Protection</span>
        </div>
      </div>

      {/* Fraud Alerts Table */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8a99ad]">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium">
              <tr>
                <th className="py-3.5 px-4">Tenant Company</th>
                <th className="py-3.5 px-4">Anomaly Description</th>
                <th className="py-3.5 px-4">Target Destination</th>
                <th className="py-3.5 px-4">Risk Score</th>
                <th className="py-3.5 px-4">Action Taken</th>
                <th className="py-3.5 px-4 text-right">Security Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {alerts.map((al) => (
                <tr key={al.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-bold text-white font-sans">{al.tenantName}</td>
                  <td className="py-4 px-4 text-rose-400 font-bold">{al.anomalyType}</td>
                  <td className="py-4 px-4 text-white/80">{al.destination}</td>
                  <td className="py-4 px-4 font-bold text-rose-400">{al.riskScore} / 100</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[10px] font-bold uppercase">
                      {al.actionTaken}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => unblockTrunk(al.tenantName)}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition font-bold"
                    >
                      Unblock Trunk
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