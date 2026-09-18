'use client';
import React from 'react';
import { Video, Monitor, Share2 } from 'lucide-react';
export default function VideoCallPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Video className="w-6 h-6 text-[#00ff88]" />
          <span>WebRTC HD Video Calling &amp; Screen Sharing</span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">Browser-based peer-to-peer video conferencing and live agent screen collaboration.</p>
      </div>
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="text-xs font-mono text-[#00d2ff]">WebRTC SFU Media Server: Active</div>
        <p className="text-xs text-[#8a99ad]">Allows agents and customers to launch secure video calls directly from the browser without plugins.</p>
      </div>
    </div>
  );
}