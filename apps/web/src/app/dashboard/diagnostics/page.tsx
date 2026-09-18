'use client';

import React, { useState } from 'react';
import {
  Activity,
  Terminal,
  Radio,
  Server,
  CheckCircle2,
  Play,
  RefreshCw,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function DiagnosticsPage() {
  const [targetHost, setTargetHost] = useState('sbc.btcl.gov.bd');
  const [testType, setTestType] = useState<'PING' | 'TRACEROUTE' | 'SIP_OPTIONS'>('PING');
  const [outputLogs, setOutputLogs] = useState<string[]>([
    '[NOC Diagnostics Engine initialized]',
    'Target: sbc.btcl.gov.bd [103.145.118.10]',
    'Ready to execute network diagnostics...'
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
    setOutputLogs((prev) => [...prev, `\n--- Executing ${testType} on ${targetHost} ---`]);

    setTimeout(() => {
      if (testType === 'PING') {
        setOutputLogs((prev) => [
          ...prev,
          'PING 103.145.118.10 (103.145.118.10) 56(84) bytes of data.',
          '64 bytes from 103.145.118.10: icmp_seq=1 ttl=56 time=11.4 ms',
          '64 bytes from 103.145.118.10: icmp_seq=2 ttl=56 time=11.1 ms',
          '64 bytes from 103.145.118.10: icmp_seq=3 ttl=56 time=12.0 ms',
          '--- 103.145.118.10 ping statistics ---',
          '3 packets transmitted, 3 received, 0% packet loss, time 2003ms',
          'rtt min/avg/max/mdev = 11.124/11.502/12.011/0.384 ms [STATUS: EXCELLENT]'
        ]);
      } else if (testType === 'TRACEROUTE') {
        setOutputLogs((prev) => [
          ...prev,
          'traceroute to 103.145.118.10, 30 hops max, 64 byte packets',
          ' 1  gateway (10.0.0.1)  0.412 ms  0.389 ms  0.351 ms',
          ' 2  bdix-core-router.net (103.10.15.1)  2.124 ms  2.091 ms',
          ' 3  btcl-sbc-peering.bd (103.145.118.10)  11.502 ms [STATUS: DIRECT BDIX]'
        ]);
      } else {
        setOutputLogs((prev) => [
          ...prev,
          'SIP OPTIONS sip:sbc.btcl.gov.bd:5060 SIP/2.0',
          'Via: SIP/2.0/UDP 10.0.12.15:5060;branch=z9hG4bK-diag-8f3e',
          'From: <sip:noc@ddialer.xyz>;tag=19284',
          'To: <sip:sbc.btcl.gov.bd>',
          'Call-ID: diag-options-901842',
          'CSeq: 1 OPTIONS',
          '--- Response Received ---',
          'SIP/2.0 200 OK',
          'Allow: INVITE, ACK, CANCEL, OPTIONS, BYE',
          'Accept: application/sdp',
          '[STATUS: SIP TRUNK ALIVE & RESPONSIVE]'
        ]);
      }
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>System Diagnostics &amp; Network Tools</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              NOC Toolbox v2.4
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Execute live ping, traceroute, and SIP OPTIONS health checks against upstream carrier SBCs.
          </p>
        </div>
      </div>

      {/* Diagnostic Form */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 max-w-3xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00d2ff]" />
          <span>Network Diagnostic Runner</span>
        </h3>

        <form onSubmit={runDiagnostics} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Target Host / SBC IP</label>
            <input
              type="text"
              required
              value={targetHost}
              onChange={(e) => setTargetHost(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Diagnostic Protocol</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as any)}
              className="w-full bg-[#070913] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none"
            >
              <option value="PING">ICMP Ping</option>
              <option value="TRACEROUTE">Traceroute</option>
              <option value="SIP_OPTIONS">SIP OPTIONS Probe</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isRunning}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold transition hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 disabled:opacity-50 flex items-center justify-center gap-2 font-mono"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Executing...' : 'Run Test'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Terminal Output Window */}
      <div className="rounded-3xl bg-[#070913] border border-white/15 p-6 space-y-3 font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#00ff88] inline-block"></span>
            <span className="text-[#8a99ad] text-[11px] ml-2">noc-terminal@ddialer-sbc-01:~#</span>
          </div>
          <button
            onClick={() => setOutputLogs(['[Terminal Cleared]'])}
            className="text-[10px] text-[#8a99ad] hover:text-white"
          >
            Clear Output
          </button>
        </div>

        <div className="space-y-1.5 max-h-[350px] overflow-y-auto text-[#00ff88]">
          {outputLogs.map((log, index) => (
            <p key={index} className="leading-relaxed">
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}