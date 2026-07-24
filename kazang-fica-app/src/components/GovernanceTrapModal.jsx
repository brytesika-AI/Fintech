import React from 'react';
import { AlertOctagon, ShieldCheck, Lock } from 'lucide-react';

export default function GovernanceTrapModal({ isOpen, onClose, onAuthorizeArmedSecurity }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#1E293B] border-2 border-[#EF4444] rounded-xl max-w-xl w-full p-6 shadow-[0_0_50px_rgba(239,68,68,0.4)] space-y-5 relative overflow-hidden">
        
        {/* Top Hazard Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EF4444] via-amber-500 to-[#EF4444]"></div>

        {/* Header */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="bg-[#EF4444] text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              sage_srai_Flag TRIGGERED
            </span>
            <span className="text-xs font-mono text-[#EF4444] font-semibold">
              HIGH HAZARD • LEVEL 3 ESCALATION
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-[#EF4444] tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-[#EF4444] shrink-0" />
            [sage_srai_Flag TRIGGERED - LETHAL RISK EXCEPTION]
          </h2>
        </div>

        {/* Required Prompt Text */}
        <div className="bg-[#0F172A] border border-[#EF4444]/40 rounded-lg p-4 text-xs font-semibold text-white leading-relaxed">
          Autonomous dispatch halted. Physical tampering detected at Roodepoort vault. AI-SRF protocols require Level 3 Security escalation and MANDATORY HUMAN-IN-THE-LOOP (HITL) APPROVAL.
        </div>

        {/* Telemetry Breakdown */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-[#94A3B8]">
            <span className="text-[#64748B] block mb-0.5">Target Vault:</span>
            <strong className="text-white">Cash Connect #CC-8842</strong>
          </div>
          <div className="bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-[#94A3B8]">
            <span className="text-[#64748B] block mb-0.5">Anomaly Type:</span>
            <strong className="text-[#EF4444]">Enclosure Forced Breach</strong>
          </div>
          <div className="bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-[#94A3B8]">
            <span className="text-[#64748B] block mb-0.5">Risk Score:</span>
            <strong className="text-[#EF4444]">0.99 / 1.00 (Lethal)</strong>
          </div>
          <div className="bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-[#94A3B8]">
            <span className="text-[#64748B] block mb-0.5">Blocked Action:</span>
            <strong className="text-amber-400">Technician Dispatch Aborted</strong>
          </div>
        </div>

        {/* HITL Controls */}
        <div className="space-y-3 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block">
            Required Human-In-The-Loop (HITL) Action:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onAuthorizeArmedSecurity}
              className="bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Authorize Armed Security Escort
            </button>

            <button
              onClick={onClose}
              className="bg-[#0F172A] hover:bg-[#334155] text-white border border-[#334155] font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              Acknowledge & Clear Flag
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
