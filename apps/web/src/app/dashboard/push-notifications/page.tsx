'use client';

import React, { useState } from 'react';
import {
  Bell,
  Smartphone,
  Send,
  ShieldCheck,
  CheckCircle2,
  Radio,
  Zap,
  Globe
} from 'lucide-react';

interface PushGateway {
  id: string;
  platform: 'APPLE_APNS' | 'FIREBASE_FCM';
  appName: string;
  apiKeyPrefix: string;
  activeTokens: number;
  status: 'CONNECTED' | 'SYNCED';
}

const INITIAL_PUSH_GATES: PushGateway[] = [
  {
    id: 'push-01',
    platform: 'FIREBASE_FCM',
    appName: 'DDialer Android Softphone v2.4',
    apiKeyPrefix: 'AIzaSyA...91820',
    activeTokens: 1420,
    status: 'CONNECTED',
  },
  {
    id: 'push-02',
    platform: 'APPLE_APNS',
    appName: 'DDialer iOS SIP VoIP Client',
    apiKeyPrefix: 'AuthKey_99...182',
    activeTokens: 890,
    status: 'SYNCED',
  },
];

export default function PushNotificationsPage() {
  const [gateways, setGateways] = useState<PushGateway[]>(INITIAL_PUSH_GATES);
  const [notice, setNotice] = useState<string | null>(null);

  const testPush = (platform: string) => {
    setNotice(`Test VoIP SIP push notification successfully dispatched to ${platform} gateway.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Mobile Push Notifications (APNs &amp; FCM)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              VoIP Background Wake Engine
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Manage Apple APNs and Firebase Cloud Messaging for instant background incoming call wakeups on iOS and Android.
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

      {/* Push Gateways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {gateways.map((gw) => (
          <div key={gw.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d2ff] border border-white/10">
                  {gw.platform}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                  {gw.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-sans">{gw.appName}</h3>
                <span className="text-xs text-[#8a99ad] font-mono">Key: {gw.apiKeyPrefix}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#070913] border border-white/5 text-xs font-mono flex items-center justify-between">
                <span className="text-[#8a99ad]">Active Device Tokens:</span>
                <span className="text-[#00ff88] font-bold">{gw.activeTokens.toLocaleString()} Devices</span>
              </div>
            </div>

            <button
              onClick={() => testPush(gw.platform)}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold hover:bg-white/10 transition text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span>Send Test Push Wakeup</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}