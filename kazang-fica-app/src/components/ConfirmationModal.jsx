import React from 'react';
import { ShieldCheck, Play, X, AlertCircle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        
        <div className="flex items-center justify-between border-b border-[#334155] pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4EB00]" />
            <h3 className="text-base font-bold text-white tracking-tight">
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
          <p className="text-white font-medium">
            You are about to initiate autonomous multi-agent remediation for Incident EP-8842 (Roodepoort EasyPay Node).
          </p>

          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2">
            <span className="text-xs font-bold text-[#D4EB00] block">Proposed Agent Sequence:</span>
            <ul className="list-disc list-inside space-y-1 text-white font-mono">
              <li>Agent 1 (Triage): Confirm 24V PSU module voltage drop.</li>
              <li>Agent 2 (Logistics): Reroute specialist Sipho (5.2 km away).</li>
              <li>Agent 3 (Comms): Queue automated merchant WhatsApp alert.</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg">
              <span className="text-[#64748B] block">Expected impact:</span>
              <strong className="text-white">Restoration in 15 mins</strong>
            </div>
            <div className="bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg">
              <span className="text-[#64748B] block">Rollback status:</span>
              <strong className="text-[#10B981]">Safety rollback ready</strong>
            </div>
          </div>

          <p className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4EB00]" />
            <span>All execution steps are logged in SOC compliance audit records.</span>
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#334155]">
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
            <Play className="w-4 h-4 fill-current" />
            Confirm & start resolution
          </button>
        </div>

      </div>
    </div>
  );
}
