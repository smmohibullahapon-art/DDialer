'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'TENANT' | 'ADMIN'>('ADMIN');
  const [email, setEmail] = useState('admin@ddialer.xyz');
  const [password, setPassword] = useState('AP12321ap');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('dd_user_role');
    if (loginType === 'ADMIN' || email === 'admin@ddialer.xyz') {
      localStorage.setItem('dd_user_role', 'SUPER_ADMIN');
    } else {
      localStorage.setItem('dd_user_role', 'TENANT_USER');
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-xl mx-auto shadow-lg shadow-[#00d2ff]/20">
            D
          </div>
          <h1 className="text-xl font-bold tracking-tight">Sign in to DDialer OS</h1>
          <p className="text-xs text-[#8a99ad]">Super Admin &amp; Customer Portal Access</p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
          <button type="button" onClick={() => { setLoginType('TENANT'); setEmail('sayed@dialdynamic.com'); setPassword('••••••••'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${loginType === 'TENANT' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad]'}`}>
            <UserCheck className="w-3.5 h-3.5" />
            <span>Customer Portal</span>
          </button>
          <button type="button" onClick={() => { setLoginType('ADMIN'); setEmail('admin@ddialer.xyz'); setPassword('AP12321ap'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${loginType === 'ADMIN' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad]'}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8a99ad] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]" />
            </div>
          </div>
          <div>
            <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8a99ad] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold shadow-lg shadow-[#00d2ff]/20 hover:brightness-110 transition flex items-center justify-center gap-2">
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}