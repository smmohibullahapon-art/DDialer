'use client';

import React, { useState, useEffect } from 'react';
import LinkTag from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Radio,
  Sliders,
  ShieldAlert,
  Activity,
  FileText,
  Webhook,
  Key,
  Terminal,
  Layers,
  MessageSquare,
  Server,
  Wallet,
  Phone,
  Sparkles,
  Calculator,
  Globe,
  Bell,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Search,
  ChevronDown,
  Mail,
  Image as ImageIcon,
  ShoppingBag,
  Bot,
  Users,
  Video,
  CreditCard
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('TENANT_USER');
  const [approvedServices, setApprovedServices] = useState<string[]>([]);

  useEffect(() => {
    const role = localStorage.getItem('dd_user_role');
    if (role) setUserRole(role);

    const savedSrv = localStorage.getItem('dd_approved_services');
    if (savedSrv) {
      setApprovedServices(JSON.parse(savedSrv));
    }
  }, []);

  const adminNavItems = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Global IP & DIDs', href: '/dashboard/global-ips', icon: Globe },
    { name: 'Deposit & Recharge', href: '/dashboard/recharge', icon: CreditCard },
    { name: 'AI Voice Bot', href: '/dashboard/ai-voice-bot', icon: Bot },
    { name: 'Least-Cost Routing (LCR)', href: '/dashboard/lcr', icon: Layers },
    { name: 'Reseller Hierarchy', href: '/dashboard/resellers', icon: Users },
    { name: 'HA & SIP Failover', href: '/dashboard/ha', icon: Server },
    { name: 'WebRTC Video & Screen', href: '/dashboard/video-call', icon: Video },
    { name: 'Service Requests (Admin)', href: '/dashboard/service-requests', icon: ShieldCheck },
    { name: 'WebRTC Softphone', href: '/dashboard/softphone', icon: Phone },
    { name: 'Real-Time Wallboard', href: '/dashboard/wallboard', icon: Radio },
    { name: 'IVR Studio & Voice Menus', href: '/dashboard/ivr', icon: Sliders },
    { name: 'SMS & SMPP Gateways', href: '/dashboard/sms-gateway', icon: MessageSquare },
    { name: 'QoS & MOS Analytics', href: '/dashboard/qos', icon: Activity },
    { name: 'DNC Compliance Manager', href: '/dashboard/dnc', icon: ShieldAlert },
    { name: 'AI Sentiment Analysis', href: '/dashboard/sentiment', icon: Sparkles },
    { name: 'AI Toll-Fraud Detection', href: '/dashboard/fraud', icon: ShieldCheck },
    { name: 'Billing CDR Ledger', href: '/dashboard/cdr-ledger', icon: Wallet },
    { name: 'Mushak 6.3 VAT Generator', href: '/dashboard/mushak', icon: Calculator },
    { name: 'Multi-Currency Billing', href: '/dashboard/multi-currency', icon: Globe },
    { name: 'API Keys & Credentials', href: '/dashboard/keys', icon: Key },
    { name: 'System Audit Logs', href: '/dashboard/audit', icon: FileText },
  ];

  const baseTenantNav = [
    { name: 'Customer Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit & Recharge', href: '/dashboard/recharge', icon: CreditCard },
    { name: 'Global IP & DIDs', href: '/dashboard/global-ips', icon: Globe },
    { name: 'AI Voice Bot', href: '/dashboard/ai-voice-bot', icon: Bot },
    { name: 'WebRTC Video Calling', href: '/dashboard/video-call', icon: Video },
    { name: 'Service Marketplace', href: '/dashboard/services', icon: ShoppingBag },
    { name: 'WebRTC Softphone', href: '/dashboard/softphone', icon: Phone },
  ];

  const dynamicTenantNav = [...baseTenantNav];
  if (approvedServices.includes('sentiment')) {
    dynamicTenantNav.push({ name: 'AI Sentiment Analysis', href: '/dashboard/sentiment', icon: Sparkles });
  }
  if (approvedServices.includes('sms-gateway')) {
    dynamicTenantNav.push({ name: 'SMS & SMPP Gateways', href: '/dashboard/sms-gateway', icon: MessageSquare });
  }
  if (approvedServices.includes('wallboard')) {
    dynamicTenantNav.push({ name: 'Real-Time Wallboard', href: '/dashboard/wallboard', icon: Radio });
  }
  if (approvedServices.includes('ivr')) {
    dynamicTenantNav.push({ name: 'IVR Studio & Voice Menus', href: '/dashboard/ivr', icon: Sliders });
  }

  const trailingTenantNav = [
    { name: 'Billing CDR Ledger', href: '/dashboard/cdr-ledger', icon: Wallet },
    { name: 'API Keys & Credentials', href: '/dashboard/keys', icon: Key },
  ];

  const tenantNavItems = [...dynamicTenantNav, ...trailingTenantNav];
  const navItems = userRole === 'SUPER_ADMIN' ? adminNavItems : tenantNavItems;

  return (
    <div className="min-h-screen bg-[#070913] text-[#8a99ad] flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0b0f19] border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black">
            D
          </div>
          <span className="font-bold text-white tracking-wider font-mono">DDialer OS</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl bg-white/5 text-white">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0b0f19] border-r border-white/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-black text-lg shadow-lg shadow-[#00d2ff]/20">
              D
            </div>
            <div>
              <h2 className="font-bold text-white tracking-wider font-mono">DDialer</h2>
              <span className="text-[10px] text-[#00ff88] font-mono block">
                {userRole === 'SUPER_ADMIN' ? 'Enterprise Admin OS' : 'Customer VoIP Portal'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          <span className="text-[10px] font-mono text-[#8a99ad]/60 uppercase tracking-wider px-3 mb-2 block">
            {userRole === 'SUPER_ADMIN' ? 'Admin Governance' : 'Customer Navigation'}
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <LinkTag
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-xs transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00d2ff]/20 to-[#00ff88]/10 text-white border border-[#00d2ff]/30 shadow-lg shadow-[#00d2ff]/10'
                    : 'text-[#8a99ad] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00d2ff]' : 'text-[#8a99ad]'}`} />
                <span className="truncate">{item.name}</span>
              </LinkTag>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <LinkTag
            href="/login"
            onClick={() => localStorage.clear()}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out / Switch User</span>
          </LinkTag>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen bg-[#070913]">
        <header className="h-16 bg-[#0b0f19] border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Search className="w-4 h-4 text-[#8a99ad] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search DIDs, trunks, extensions..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#8a99ad] focus:outline-none focus:border-[#00d2ff]/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 text-xs text-[#00ff88]">
              <Wallet className="w-3.5 h-3.5" />
              <span>৳ 14,820.50</span>
            </div>

            <div className="relative">
              <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-[#00ff88] absolute top-1.5 right-1.5 animate-pulse"></span>
              </button>
            </div>

            <div className="relative">
              <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center gap-2.5 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00d2ff] to-[#9d4edd] flex items-center justify-center text-white font-bold text-xs">
                  {userRole === 'SUPER_ADMIN' ? 'TM' : 'SD'}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="text-xs text-white font-bold block leading-tight font-sans">
                    {userRole === 'SUPER_ADMIN' ? 'Tasnim Munni' : 'Sayed (DialDynamic)'}
                  </span>
                  <span className="text-[10px] text-[#00ff88] block">
                    {userRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Tenant Customer'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8a99ad]" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0b0f19] border border-white/15 p-2 space-y-1 shadow-2xl z-50 text-xs">
                  <LinkTag href="/login" onClick={() => localStorage.clear()} className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </LinkTag>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 bg-[#070913]">
          {children}
        </main>

        <footer className="bg-[#0b0f19] border-t border-white/10 py-4 px-6 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[#8a99ad]">
          <div>
            <span>&copy; 2026 <strong className="text-white">DDialer Enterprise Telecom OS</strong>. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}