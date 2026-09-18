'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  PhoneCall,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  Radio,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Maximize2
} from 'lucide-react';

export default function WallboardPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeCalls, setActiveCalls] = useState(48);
  const [waitingQueue, setWaitingQueue] = useState(5);
  const [availableAgents, setAvailableAgents] = useState(14);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Real-Time Operations Wallboard</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
              Live Floor Telemetry
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            High-contrast call center floor telemetry for ACD queues, agent occupancy, and service level agreements.
          </p>
        </div>

        <div className="text-right font-mono">
          <span className="text-xs text-[#8a99ad] block uppercase tracking-wider">System Clock</span>
          <span className="text-xl font-bold text-[#00d2ff]">{currentTime || '12:00:00 PM'}</span>
        </div>
      </div>

      {/* Giant Wallboard KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 space-y-2 shadow-2xl">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider font-mono">Active Concurrent Calls</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl font-black text-white font-mono">{activeCalls}</h2>
            <span className="text-xs text-[#00ff88] font-mono">+12% vs avg</span>
          </div>
          <span className="text-[11px] text-[#00ff88] font-mono block">Kamailio SBC Streams Live</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 space-y-2 shadow-2xl">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider font-mono">Callers Waiting in Queue</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl font-black text-amber-400 font-mono">{waitingQueue}</h2>
            <span className="text-xs text-amber-400 font-mono">Max wait 34s</span>
          </div>
          <span className="text-[11px] text-amber-400 font-mono block">ACD Support Queue #8002</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 space-y-2 shadow-2xl">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider font-mono">Agents Ready / On Call</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl font-black text-[#00d2ff] font-mono">{availableAgents}</h2>
            <span className="text-xs text-[#00d2ff] font-mono">22 Total Roster</span>
          </div>
          <span className="text-[11px] text-[#00d2ff] font-mono block">94% Agent Occupancy</span>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 space-y-2 shadow-2xl">
          <span className="text-xs font-semibold text-[#8a99ad] uppercase tracking-wider font-mono">Service Level (SLA 20s)</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl font-black text-[#00ff88] font-mono">98.4%</h2>
            <span className="text-xs text-[#00ff88] font-mono">Target &gt; 95%</span>
          </div>
          <span className="text-[11px] text-[#00ff88] font-mono block">Compliant Performance</span>
        </div>
      </div>

      {/* Floor Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Queue Performance Breakdown
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Sales Inbound Queue (#8001)</span>
                <span className="text-[#8a99ad] text-[10px]">Avg Speed of Answer: 12s</span>
              </div>
              <span className="text-[#00ff88] font-bold">0 Waiting</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">NOC Support Queue (#8002)</span>
                <span className="text-[#8a99ad] text-[10px]">Avg Speed of Answer: 18s</span>
              </div>
              <span className="text-amber-400 font-bold">5 Waiting</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Carrier Gateway Health (BDIX)
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between">
              <span className="text-white">BTCL Wholesale National SBC</span>
              <span className="text-[#00ff88] font-bold">ONLINE (12ms)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#070913] border border-white/5 flex items-center justify-between">
              <span className="text-white">AmberIT Enterprise Gateway</span>
              <span className="text-[#00ff88] font-bold">ONLINE (16ms)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}