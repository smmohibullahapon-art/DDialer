'use client';
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to DDialer by Dial Dynamic Ltd. How can we assist your enterprise communication today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMsg = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: 'Thank you for your message. Our Tier-1 NOC support engineer has received your query and will reply shortly.' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] flex items-center justify-center shadow-2xl shadow-[#00d2ff]/40 hover:scale-110 transition animate-bounce">
          <MessageSquare className="w-6 h-6 fill-current" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 rounded-3xl bg-[#0b0f19] border border-white/20 shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
          <div className="p-4 bg-gradient-to-r from-[#00d2ff]/20 to-[#00ff88]/20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00d2ff] to-[#00ff88] flex items-center justify-center text-[#070913] font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold block">DDialer Live Support</span>
                <span className="text-[10px] text-[#00ff88] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping"></span> Online 24/7
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#8a99ad] hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-black/40">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                  msg.sender === 'user' ? 'bg-[#00d2ff] text-[#070913] font-medium rounded-br-none' : 'bg-white/10 text-white rounded-bl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-[#070913] flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d2ff] transition text-xs"
            />
            <button type="submit" className="p-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#00ff88] text-[#070913] hover:scale-105 transition">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}