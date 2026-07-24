import React from 'react';
import { ShieldCheck, Play, X, AlertCircle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#111827] border border-[rgba(148,163,184,0.2)] rounded-[10px] max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        
        <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.16)] pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#0EA5E9]" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Confirm autonomous resolution plan
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-[#94A3B8] leading-relaxed">
          <div className="flex justify-between font-mono bg-[#162033] p-2.5 rounded-md border border-[rgba(148,163,184,0.16)]">
            <span>Incident ID: <strong className="text-white">EP-8842</strong></span>
            <span>Target: <strong className="text-white">Roodepoort Node</strong></span>
          </div>

          <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] p-3 rounded-md space-y-1.5">
            <span className="text-xs font-bold text-[#0EA5E9] block">Proposed Actions:</span>
            <ul className="list-disc list-inside space-y-1 text-[#F8FAFC] font-mono text-[11px]">
              <li>Agent 1 (Triage): Voltage diagnostic scan confirmation.</li>
              <li>Agent 2 (Logistics): Reroute specialist Sipho (5.2 km away).</li>
              <li>Agent 3 (Comms): Automated WhatsApp merchant update.</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] p-2.5 rounded-md">
              <span className="text-[#94A3B8] block">Expected impact:</span>
              <strong className="text-[#F8FAFC]">Restoration in 15 mins</strong>
            </div>
            <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] p-2.5 rounded-md">
              <span className="text-[#94A3B8] block">Rollback status:</span>
              <strong className="text-[#22C55E]">Safety rollback ready</strong>
            </div>
          </div>

          <p className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Actions will be recorded in SOC compliance audit records.</span>
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[rgba(148,163,184,0.16)]">
          <button
            onClick={onClose}
            className="btn-secondary-action"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary-action"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Confirm & start resolution
          </button>
        </div>

      </div>
    </div>
  );
}
