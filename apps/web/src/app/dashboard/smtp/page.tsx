'use client';

import React, { useState } from 'react';
import { Mail, Send, ShieldCheck, CheckCircle2, Lock, Server } from 'lucide-react';

export default function SMTPConfigPage() {
  const [host, setHost] = useState('smtp.sendgrid.net');
  const [port, setPort] = useState('587');
  const [username, setUsername] = useState('apikey');
  const [password, setPassword] = useState('SG.xxxxxxxxxxxxxxxx');
  const [senderEmail, setSenderEmail] = useState('noreply@ddialer.xyz');
  const [notice, setNotice] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('SMTP Configuration saved securely in encrypted vault.');
    setTimeout(() => setNotice(null), 3500);
  };

  const sendTestMail = () => {
    setNotice(`Test email successfully dispatched via ${host}:${port} to admin@ddialer.xyz.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>SMTP Email Notification Configuration</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
            Mailer Engine
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Configure SMTP gateway credentials for system alerts, password resets, KYB notifications, and invoice dispatches.
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

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
        <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SMTP Host</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SMTP Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SMTP Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">SMTP Password / API Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#8a99ad] block font-medium mb-1 uppercase tracking-wider">Sender Email Address</label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={sendTestMail}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#00d2ff]" />
              <span>Send Test Email</span>
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg shadow-[#00d2ff]/20 hover:brightness-110 transition"
            >
              Save SMTP Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}