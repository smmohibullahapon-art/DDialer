'use client';

import React, { useState } from 'react';
import { MessageSquare, Plus, Key, Server, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';

interface SMPPAccount {
  id: string;
  systemId: string;
  serverIp: string;
  port: string;
  bindType: string;
  status: string;
}

interface APIAccount {
  id: string;
  appName: string;
  apiUrl: string;
  userId: string;
  apiKey: string;
  ipWhitelist: string;
  status: string;
}

interface SMSProvider {
  id: string;
  providerName: string;
  protocol: string;
  gatewayHost: string;
  priority: string;
  status: string;
}

interface SenderIDItem {
  id: string;
  senderId: string;
  category: string;
  status: string;
}

export default function SMSGatewayManagerPage() {
  const [activeTab, setActiveTab] = useState<'PROVIDERS' | 'SMPP' | 'API' | 'SENDER'>('PROVIDERS');

  // State for Providers
  const [providers, setProviders] = useState<SMSProvider[]>([
    { id: '1', providerName: 'Primary Enterprise Route', protocol: 'SMPP 3.4', gatewayHost: 'smpp.gateway1.com:2775', priority: 'High (Priority 1)', status: 'Active' },
    { id: '2', providerName: 'Backup Failover Route', protocol: 'HTTP REST API', gatewayHost: 'api.backuproute.net/v1', priority: 'Secondary (Priority 2)', status: 'Standby' }
  ]);

  const [provName, setProvName] = useState('');
  const [provProtocol, setProvProtocol] = useState('SMPP 3.4');
  const [provHost, setProvHost] = useState('');
  const [provPriority, setProvPriority] = useState('Priority 1');

  // SMPP States
  const [smppSystemId, setSmppSystemId] = useState('');
  const [smppPassword, setSmppPassword] = useState('');
  const [smppServerIp, setSmppServerIp] = useState('smpp.ddialer.xyz');
  const [smppPort, setSmppPort] = useState('2775');
  const [smppAccounts, setSmppAccounts] = useState<SMPPAccount[]>([
    { id: '1', systemId: 'dd_smpp_trx', serverIp: 'smpp.ddialer.xyz', port: '2775', bindType: 'Transceiver', status: 'Connected' }
  ]);

  // API States
  const [appName, setAppName] = useState('');
  const [apiUrl, setApiUrl] = useState('https://api.smsprovider.com/v2/send');
  const [apiUserId, setApiUserId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [ipWhitelist, setIpWhitelist] = useState('0.0.0.0/0');
  const [apiAccounts, setApiAccounts] = useState<APIAccount[]>([
    { id: '1', appName: 'Main CRM Dispatcher', apiUrl: 'https://api.smsprovider.com/v2/send', userId: 'usr_dialdyn99', apiKey: 'sec_live_9182049182', ipWhitelist: '103.102.40.15', status: 'Active' }
  ]);

  // Sender ID States
  const [newSenderId, setNewSenderId] = useState('');
  const [senderCategory, setSenderCategory] = useState('Transactional');
  const [senderIds, setSenderIds] = useState<SenderIDItem[]>([
    { id: '1', senderId: 'DialDynamic', category: 'Transactional', status: 'Approved' },
    { id: '2', senderId: 'OTP Alert', category: 'Non-Masking', status: 'Approved' }
  ]);

  const [notice, setNotice] = useState<string | null>(null);

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provName || !provHost) return;
    const newP: SMSProvider = {
      id: Date.now().toString(),
      providerName: provName,
      protocol: provProtocol,
      gatewayHost: provHost,
      priority: provPriority,
      status: 'Active'
    };
    setProviders([...providers, newP]);
    setProvName('');
    setProvHost('');
    setNotice(`SMS Provider "${provName}" added successfully.`);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleAddSMPP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smppSystemId || !smppPassword) return;
    const newAcc: SMPPAccount = {
      id: Date.now().toString(),
      systemId: smppSystemId,
      serverIp: smppServerIp,
      port: smppPort,
      bindType: 'Transceiver',
      status: 'Connected'
    };
    setSmppAccounts([...smppAccounts, newAcc]);
    setSmppSystemId('');
    setSmppPassword('');
    setNotice('SMPP Bind Account successfully created.');
    setTimeout(() => setNotice(null), 4000);
  };

  const handleAddAPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !apiUrl || !apiUserId || !apiKey) return;
    const newApi: APIAccount = {
      id: Date.now().toString(),
      appName: appName,
      apiUrl: apiUrl,
      userId: apiUserId,
      apiKey: apiKey,
      ipWhitelist: ipWhitelist,
      status: 'Active'
    };
    setApiAccounts([...apiAccounts, newApi]);
    setAppName('');
    setApiUserId('');
    setApiKey('');
    setNotice('API Connection configuration saved successfully.');
    setTimeout(() => setNotice(null), 4000);
  };

  const handleAddSenderID = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSenderId) return;
    const newSender: SenderIDItem = {
      id: Date.now().toString(),
      senderId: newSenderId,
      category: senderCategory,
      status: 'Pending Approval'
    };
    setSenderIds([...senderIds, newSender]);
    setNewSenderId('');
    setNotice(`Sender ID "${newSenderId}" submitted for approval.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span>SMS Gateway, Providers &amp; API Manager</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 font-mono">
            Multi-Provider &amp; API Routing
          </span>
        </h1>
        <p className="text-sm text-[#8a99ad] mt-1">
          Manage multiple SMS upstream providers, configure API endpoints (URL, User ID, API Key), SMPP binds, and sender IDs.
        </p>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 text-white text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-[#8a99ad] hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
        <button
          onClick={() => setActiveTab('PROVIDERS')}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'PROVIDERS' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Multi-Providers</span>
        </button>
        <button
          onClick={() => setActiveTab('SMPP')}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'SMPP' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>SMPP Bind Setup</span>
        </button>
        <button
          onClick={() => setActiveTab('API')}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'API' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Connection Setup</span>
        </button>
        <button
          onClick={() => setActiveTab('SENDER')}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'SENDER' ? 'bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913]' : 'text-[#8a99ad] hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Sender IDs</span>
        </button>
      </div>

      {/* TAB 1: MULTI-PROVIDERS */}
      {activeTab === 'PROVIDERS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl max-w-xl">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Globe className="w-4 h-4 text-[#00d2ff]" />
              <span>Add New SMS Upstream Provider</span>
            </div>

            <form onSubmit={handleAddProvider} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Provider Name</label>
                <input
                  type="text"
                  required
                  value={provName}
                  onChange={(e) => setProvName(e.target.value)}
                  placeholder="e.g. Carrier Route Alpha"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Protocol</label>
                  <select
                    value={provProtocol}
                    onChange={(e) => setProvProtocol(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  >
                    <option value="SMPP 3.4">SMPP 3.4</option>
                    <option value="HTTP REST API">HTTP REST API</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Priority Level</label>
                  <select
                    value={provPriority}
                    onChange={(e) => setProvPriority(e.target.value)}
                    className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  >
                    <option value="Priority 1">Priority 1 (Primary)</option>
                    <option value="Priority 2">Priority 2 (Failover)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Gateway Host / IP / URL</label>
                <input
                  type="text"
                  required
                  value={provHost}
                  onChange={(e) => setProvHost(e.target.value)}
                  placeholder="smpp.provider.com:2775 or https://api.provider.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00d2ff]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add SMS Provider</span>
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-sans">Configured SMS Providers</h3>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <table className="w-full text-left text-sm text-[#8a99ad]">
                <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium font-mono">
                  <tr>
                    <th className="py-3 px-4">Provider Name</th>
                    <th className="py-3 px-4">Protocol</th>
                    <th className="py-3 px-4">Gateway Host / URL</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {providers.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{p.providerName}</td>
                      <td className="py-3.5 px-4 text-[#00d2ff]">{p.protocol}</td>
                      <td className="py-3.5 px-4">{p.gatewayHost}</td>
                      <td className="py-3.5 px-4">{p.priority}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMPP SETUP */}
      {activeTab === 'SMPP' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl max-w-xl">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Server className="w-4 h-4 text-[#00d2ff]" />
              <span>Create SMPP Protocol Bind</span>
            </div>

            <form onSubmit={handleAddSMPP} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">System ID / Username</label>
                <input
                  type="text"
                  required
                  value={smppSystemId}
                  onChange={(e) => setSmppSystemId(e.target.value)}
                  placeholder="e.g. client_trx_01"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">SMPP Password</label>
                <input
                  type="password"
                  required
                  value={smppPassword}
                  onChange={(e) => setSmppPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Server IP / Host</label>
                  <input
                    type="text"
                    value={smppServerIp}
                    onChange={(e) => setSmppServerIp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Port</label>
                  <input
                    type="text"
                    value={smppPort}
                    onChange={(e) => setSmppPort(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00d2ff]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Establish SMPP Bind</span>
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-sans">Active SMPP Binds</h3>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <table className="w-full text-left text-sm text-[#8a99ad]">
                <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium font-mono">
                  <tr>
                    <th className="py-3 px-4">System ID</th>
                    <th className="py-3 px-4">Host IP:Port</th>
                    <th className="py-3 px-4">Bind Type</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {smppAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{acc.systemId}</td>
                      <td className="py-3.5 px-4 text-[#00d2ff]">{acc.serverIp}:{acc.port}</td>
                      <td className="py-3.5 px-4">{acc.bindType}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                          {acc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API SETUP WITH API URL, USER ID & API KEY */}
      {activeTab === 'API' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl max-w-xl">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Key className="w-4 h-4 text-[#00ff88]" />
              <span>HTTP REST API Connection Setup</span>
            </div>

            <form onSubmit={handleAddAPI} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Application Name</label>
                <input
                  type="text"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. Mobile App Gateway / CRM"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">API URL (Endpoint)</label>
                <input
                  type="text"
                  required
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.gateway.com/send"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">User ID</label>
                  <input
                    type="text"
                    required
                    value={apiUserId}
                    onChange={(e) => setApiUserId(e.target.value)}
                    placeholder="e.g. usr_dialdyn"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
                <div>
                  <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">API Key / Token</label>
                  <input
                    type="password"
                    required
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">IP Whitelist</label>
                <input
                  type="text"
                  value={ipWhitelist}
                  onChange={(e) => setIpWhitelist(e.target.value)}
                  placeholder="0.0.0.0/0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00d2ff]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Save API Connection</span>
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-sans">Active API Connections</h3>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <table className="w-full text-left text-sm text-[#8a99ad]">
                <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium font-mono">
                  <tr>
                    <th className="py-3 px-4">App Name</th>
                    <th className="py-3 px-4">API URL</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">API Key</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {apiAccounts.map((api) => (
                    <tr key={api.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{api.appName}</td>
                      <td className="py-3.5 px-4 text-[#00d2ff] truncate max-w-xs">{api.apiUrl}</td>
                      <td className="py-3.5 px-4">{api.userId}</td>
                      <td className="py-3.5 px-4 text-emerald-400">••••••••</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                          {api.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SENDER IDS */}
      {activeTab === 'SENDER' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl max-w-xl">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-[#00d2ff]" />
              <span>Register New Sender ID / Masking</span>
            </div>

            <form onSubmit={handleAddSenderID} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Sender ID / Brand Name</label>
                <input
                  type="text"
                  required
                  value={newSenderId}
                  onChange={(e) => setNewSenderId(e.target.value)}
                  placeholder="e.g. MyBrand / 16216"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="text-[#8a99ad] block mb-1 uppercase tracking-wider">Campaign Category</label>
                <select
                  value={senderCategory}
                  onChange={(e) => setSenderCategory(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00d2ff]"
                >
                  <option value="Transactional">Transactional / OTP</option>
                  <option value="Promotional">Promotional Campaign</option>
                  <option value="Non-Masking">Non-Masking Operator Number</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00d2ff]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Sender ID for Approval</span>
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-sans">Registered Sender IDs &amp; Maskings</h3>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <table className="w-full text-left text-sm text-[#8a99ad]">
                <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/10 text-white/80 font-medium font-mono">
                  <tr>
                    <th className="py-3 px-4">Sender ID / Masking</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-mono">
                  {senderIds.map((s) => (
                    <tr key={s.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white text-base">{s.senderId}</td>
                      <td className="py-3.5 px-4 text-[#00d2ff]">{s.category}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                          s.status === 'Approved' 
                            ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30' 
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}