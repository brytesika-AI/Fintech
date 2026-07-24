import React from 'react';
import { Play, FileText, Sparkles, AlertTriangle } from 'lucide-react';

export default function ExecutiveOverview({ 
  isTrapActive, 
  isOrchestrating, 
  onOpenConfirmModal 
}) {
  return (
    <div className={`rounded-[10px] p-6 border shadow-sm transition-all ${
      isTrapActive 
        ? 'bg-red-950/20 border-[#EF4444]/40' 
        : 'bg-[#111827] border-[rgba(148,163,184,0.16)]'
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Executive Overview (~65% width) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${isTrapActive ? 'text-[#EF4444]' : 'text-[#0EA5E9]'}`} />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Executive overview
            </h3>
          </div>

          {isTrapActive ? (
            <p className="text-xs text-[#F8FAFC] leading-relaxed max-w-[65ch]">
              Physical tampering detected on Cash Connect Vault #CC-8842 at the Roodepoort node. Autonomous technician dispatch has been halted to ensure field safety. Level 3 armed security escalation and human-in-the-loop (HITL) approval are mandatory under AI-SRF protocols.
            </p>
          ) : (
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-[65ch]">
              EasyPay terminal #EP-8842 in Roodepoort experienced a supply voltage fluctuation causing a zero-voltage drop. The autonomous system recommends dispatching nearby field specialist Sipho (5.2 km away) for a 24V PSU replacement while sending an automated WhatsApp status update to the merchant.
            </p>
          )}

          <div className="pt-2 border-t border-[rgba(148,163,184,0.1)] flex items-center gap-2 text-xs">
            <span className="text-[#94A3B8]">Business impact:</span>
            <strong className="text-[#F8FAFC] font-semibold">
              {isTrapActive ? 'Vault physical hazard • Node lock required' : 'Single terminal offline • Low financial risk'}
            </strong>
          </div>
        </div>

        {/* Right Column: Recommended Action & Controls (~35% width) */}
        <div className="lg:col-span-5 bg-[#162033] border border-[rgba(148,163,184,0.16)] rounded-[8px] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Recommended action
            </h4>
            <span className={isTrapActive ? "badge-status badge-red text-[10px]" : "badge-status badge-lime text-[10px]"}>
              {isTrapActive ? "Lethal risk" : "Low risk (0.02)"}
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] leading-normal">
            {isTrapActive 
              ? 'Escalate to Level 3 NOC Security Chief and dispatch armed escort.'
              : 'Reroute specialist Sipho (5.2 km away) for 24V PSU module replacement.'}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
            <div>
              <span className="text-[#94A3B8] block">Est. restoration:</span>
              <strong className="text-[#22C55E]">15 minutes</strong>
            </div>
            <div>
              <span className="text-[#94A3B8] block">Safety rollback:</span>
              <strong className="text-[#F8FAFC]">Available</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={onOpenConfirmModal}
              disabled={isOrchestrating || isTrapActive}
              className="btn-secondary-action text-xs flex-1 justify-center py-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />
              Review plan
            </button>

            <button
              onClick={onOpenConfirmModal}
              disabled={isOrchestrating || isTrapActive}
              className="btn-primary-action text-xs flex-1 justify-center py-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start resolution
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
