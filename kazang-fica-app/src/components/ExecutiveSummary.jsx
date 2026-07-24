import React from 'react';
import { Shield, Sparkles, AlertTriangle } from 'lucide-react';

export default function ExecutiveSummary({ isTrapActive }) {
  return (
    <div className={`rounded-xl p-5 border shadow-sm transition-all ${
      isTrapActive 
        ? 'bg-red-950/20 border-[#EF4444]/40' 
        : 'bg-[#1E293B] border-[#334155]'
    }`}>
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
          isTrapActive ? 'bg-red-950 border border-[#EF4444] text-[#EF4444]' : 'bg-[#0F172A] border border-[#334155] text-[#D4EB00]'
        }`}>
          {isTrapActive ? <AlertTriangle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Executive Summary & Autonomous Recommendation
            </h3>
            <span className={isTrapActive ? "badge-status badge-red" : "badge-status badge-lime"}>
              {isTrapActive ? "Lethal Risk Exception" : "Low Financial Risk"}
            </span>
          </div>

          {isTrapActive ? (
            <p className="text-xs text-[#F8FAFC] leading-relaxed">
              Physical tampering detected on Cash Connect Vault #CC-8842 (Roodepoort Node). Autonomous dispatch has been halted to safeguard field personnel. AI-SRF protocols mandate immediate Level 3 armed security escalation and human-in-the-loop (HITL) executive clearance.
            </p>
          ) : (
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              EasyPay terminal #EP-8842 in Roodepoort suffered a supply voltage fluctuation resulting in a temporary power drop. The autonomous system recommends rerouting nearby field specialist Sipho (5.2 km away) for a 24V PSU module replacement while dispatching an automated WhatsApp update to the merchant. Estimated service restoration time is 15 minutes.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1 font-mono text-[#64748B]">
            <span>Business impact: <strong className="text-white">Low (Single node)</strong></span>
            <span>•</span>
            <span>Estimated resolution: <strong className="text-[#10B981]">15 mins</strong></span>
            <span>•</span>
            <span>Autonomy risk: <strong className={isTrapActive ? "text-[#EF4444]" : "text-[#10B981]"}>{isTrapActive ? "0.99 (Lethal)" : "0.02 (Safe)"}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
