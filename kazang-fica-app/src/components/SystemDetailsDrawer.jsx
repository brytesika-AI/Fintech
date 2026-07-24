import React from 'react';
import { X, Server, Globe, Cpu, ShieldCheck, Code } from 'lucide-react';

export default function SystemDetailsDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1E293B] border-l border-[#334155] max-w-md w-full h-full p-6 shadow-2xl space-y-6 overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-[#334155] pb-4">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#D4EB00]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              System Environment & Architecture
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Cloud Infrastructure
            </h4>
            <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Platform:</span>
                <span className="text-white font-bold">Cloudflare Pages Edge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Environment:</span>
                <span className="text-[#10B981] font-bold">Production (main)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Build Artifact:</span>
                <span className="text-[#D4EB00] font-bold">Vite 8.1 / React 19</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              AI Orchestrator Engine
            </h4>
            <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Model:</span>
                <span className="text-white font-bold">Gemini 1.5 Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">API Gateway:</span>
                <span className="text-[#10B981] font-bold">Google AI Studio</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Response Format:</span>
                <span className="text-white font-bold">Structured JSON Array</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Governance & Compliance
            </h4>
            <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Protocol:</span>
                <span className="text-white font-bold">AI-SRF Level 1 / Level 3 HITL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Safety Flag:</span>
                <span className="text-[#EF4444] font-bold">sage_srai_Flag Intercept</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Audit Trail:</span>
                <span className="text-white font-bold">SOC Compliance Logged</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-[#334155]">
          <button
            onClick={onClose}
            className="btn-secondary-action w-full justify-center"
          >
            Close details
          </button>
        </div>

      </div>
    </div>
  );
}
