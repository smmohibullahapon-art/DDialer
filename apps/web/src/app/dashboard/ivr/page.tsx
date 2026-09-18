'use client';

import React, { useState } from 'react';
import {
  GitBranch,
  PhoneCall,
  Volume2,
  Sliders,
  Plus,
  Trash2,
  CheckCircle2,
  Settings2,
  Radio,
  Play,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface IVRNode {
  id: string;
  dtmfKey: string;
  actionType: 'RING_GROUP' | 'PLAY_AUDIO' | 'SUB_MENU' | 'AGENT_EXTENSION';
  targetDestination: string;
  description: string;
}

interface IVRMenu {
  id: string;
  name: string;
  didNumber: string;
  welcomePrompt: string;
  nodes: IVRNode[];
  status: 'ACTIVE' | 'DRAFT';
}

const INITIAL_IVR_MENUS: IVRMenu[] = [
  {
    id: 'ivr-01',
    name: 'Main Corporate Inbound IVR',
    didNumber: '+8809612000000',
    welcomePrompt: 'Welcome to Dial Dynamic Ltd. For Sales press 1, for Support press 2, for Billing press 3.',
    status: 'ACTIVE',
    nodes: [
      { id: 'n-1', dtmfKey: '1', actionType: 'RING_GROUP', targetDestination: 'Sales Queue (Ext 8001)', description: 'Route to Outbound/Inbound Sales Agents' },
      { id: 'n-2', dtmfKey: '2', actionType: 'RING_GROUP', targetDestination: 'NOC Support (Ext 8002)', description: 'Route to Tier-1 & Tier-2 Engineers' },
      { id: 'n-3', dtmfKey: '3', actionType: 'AGENT_EXTENSION', targetDestination: 'Billing Desk (Ext 1003)', description: 'Route to Finance & Ledger Desk' },
    ],
  },
  {
    id: 'ivr-02',
    name: 'After-Hours Emergency Support',
    didNumber: '+880800123456',
    welcomePrompt: 'You have reached our emergency hotline. Please hold while we connect to an on-call engineer.',
    status: 'ACTIVE',
    nodes: [
      { id: 'n-4', dtmfKey: '1', actionType: 'AGENT_EXTENSION', targetDestination: 'On-Call NOC (Ext 1002)', description: 'Urgent SIP Trunk Failover Support' },
    ],
  },
];

export default function IVRStudioPage() {
  const [menus, setMenus] = useState<IVRMenu[]>(INITIAL_IVR_MENUS);
  const [selectedMenu, setSelectedMenu] = useState<IVRMenu>(INITIAL_IVR_MENUS[0]);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSaveMenu = () => {
    setNotice(`IVR Menu "${selectedMenu.name}" successfully compiled and pushed to FreeSWITCH ESL.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>IVR Studio &amp; Voice Menu Builder</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
              FreeSWITCH XML IVR
            </span>
          </h1>
          <p className="text-sm text-[#8a99ad] mt-1">
            Design multi-level DTMF voice menus, text-to-speech greetings, and intelligent call routing nodes.
          </p>
        </div>

        <button
          onClick={() => alert('New IVR Menu wizard initialized.')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] px-4 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 shadow-lg shadow-[#00d2ff]/20 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create IVR Tree</span>
        </button>
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

      {/* Main Grid: Menu Selector (Left) + Interactive IVR Node Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Menu Selector */}
        <div className="lg:col-span-4 rounded-3xl bg-white/[0.03] border border-white/10 p-5 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Configured Voice Menus ({menus.length})
          </h3>

          <div className="space-y-3">
            {menus.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMenu(m)}
                className={`w-full text-left p-4 rounded-2xl border transition space-y-2 ${
                  selectedMenu.id === m.id
                    ? 'bg-[#00d2ff]/10 border-[#00d2ff]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-[#8a99ad] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{m.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#00ff88]">
                    {m.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#00d2ff]">{m.didNumber}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: IVR Node Editor */}
        <div className="lg:col-span-8 rounded-3xl bg-white/[0.03] border border-white/10 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedMenu.name}</h3>
              <p className="text-xs font-mono text-[#00d2ff] mt-0.5">Assigned DID: {selectedMenu.didNumber}</p>
            </div>
            <button
              onClick={handleSaveMenu}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#00d2ff]/20"
            >
              Compile &amp; Deploy
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[#8a99ad] block font-medium mb-1.5 uppercase tracking-wider">TTS Welcome Prompt / Greeting Audio</label>
              <textarea
                rows={2}
                value={selectedMenu.welcomePrompt}
                onChange={(e) => setSelectedMenu({ ...selectedMenu, welcomePrompt: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">DTMF Key Mapping Nodes</h4>
                <button
                  onClick={() => {
                    const newNode: IVRNode = {
                      id: `n-${Date.now()}`,
                      dtmfKey: String(selectedMenu.nodes.length + 1),
                      actionType: 'RING_GROUP',
                      targetDestination: 'General Queue',
                      description: 'Custom DTMF Route',
                    };
                    setSelectedMenu({ ...selectedMenu, nodes: [...selectedMenu.nodes, newNode] });
                  }}
                  className="text-xs text-[#00d2ff] hover:underline font-mono"
                >
                  + Add DTMF Node
                </button>
              </div>

              <div className="space-y-3">
                {selectedMenu.nodes.map((node, idx) => (
                  <div key={node.id} className="p-4 rounded-2xl bg-[#070913] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] font-mono font-bold flex items-center justify-center text-sm">
                        {node.dtmfKey}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{node.targetDestination}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8a99ad]">
                            {node.actionType}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8a99ad]">{node.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedMenu({
                          ...selectedMenu,
                          nodes: selectedMenu.nodes.filter((n) => n.id !== node.id),
                        });
                      }}
                      className="text-[#8a99ad] hover:text-rose-400 p-1 self-end sm:self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}