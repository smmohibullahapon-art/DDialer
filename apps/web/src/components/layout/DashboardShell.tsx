'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Radio,
  Send,
  FileSpreadsheet,
  Wallet,
  Code2,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contacts & CRM', href: '/dashboard/crm', icon: Users },
  { name: 'Numbers & DID', href: '/dashboard/numbers', icon: PhoneCall, badge: 'BD' },
  { name: 'SIP Trunks', href: '/dashboard/sip', icon: Radio },
  { name: 'Dialer & Campaigns', href: '/dashboard/dialer', icon: Send },
  { name: 'Call History / CDR', href: '/dashboard/calls', icon: FileSpreadsheet },
  { name: 'Billing & Wallet', href: '/dashboard/billing', icon: Wallet },
  { name: 'Developer APIs', href: '/dashboard/api', icon: Code2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#070913] text-[#f0f4f8] flex flex-col antialiased">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#070913]/95 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-[#00d2ff] to-[#9d4edd] bg-clip-text text-transparent">
                DDialer
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-[#00d2ff]">
                OS
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#8a99ad] hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00d2ff]/15 to-[#9d4edd]/15 text-white border border-[#00d2ff]/30'
                      : 'text-[#8a99ad] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00d2ff]' : 'text-[#8a99ad]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tenant / Organization Status */}
        <div className="p-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#00d2ff]/20 to-[#9d4edd]/20 border border-white/10 flex items-center justify-center font-bold text-[#00d2ff] text-sm">
              DD
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-white truncate">Dial Dynamic Ltd</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
                <span className="text-[11px] text-[#00ff88]">Telecom Live</span>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#8a99ad]" />
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 h-16 bg-[#070913]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu & Global Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#8a99ad] hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full hidden sm:block">
              <Search className="w-4 h-4 text-[#8a99ad] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search numbers, CDR sessions, logs..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50 transition"
              />
            </div>
          </div>

          {/* Quick Metrics & User Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wallet Widget */}
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1.5">
              <span className="text-[11px] text-[#8a99ad] hidden sm:inline">Prepaid:</span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">৳ 15,000.00</span>
              <button className="ml-1 p-1 rounded-lg bg-[#00d2ff] text-[#070913] hover:brightness-110 transition">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#8a99ad] hover:text-white transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00d2ff]"></span>
            </button>

            {/* User Profile Trigger */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9d4edd] to-[#00d2ff] p-0.5">
                <div className="w-full h-full bg-[#070913] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  TM
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-white leading-none">Tasnim Munni</p>
                <p className="text-[10px] text-[#8a99ad] mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Child View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}