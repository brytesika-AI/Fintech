import React, { useState } from 'react';
import { Activity, Truck, MessageSquare, ChevronDown, ChevronUp, Terminal, Lock } from 'lucide-react';

export default function AgentCards({ agentData, activeStep, isTrapActive }) {
  const [expandedAgent, setExpandedAgent] = useState(null);

  const agents = [
    {
      id: 1,
      name: 'Agent 1: Triage & telemetry',
      subtitle: 'Hardware diagnostics',
      icon: Activity,
      data: agentData[0],
      isHalted: false,
    },
    {
      id: 2,
      name: 'Agent 2: Logistics & dispatch',
      subtitle: 'Technician rerouting',
      icon: Truck,
      data: agentData[1],
      isHalted: isTrapActive,
    },
    {
      id: 3,
      name: 'Agent 3: Resolution execution',
      subtitle: 'Merchant WhatsApp engagement',
      icon: MessageSquare,
      data: agentData[2],
      isHalted: isTrapActive,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {agents.map((ag) => {
        const IconComp = ag.icon;
        const isActive = activeStep === ag.id && !isTrapActive;
        const isCompleted = activeStep > ag.id && !isTrapActive;
        const isExpanded = expandedAgent === ag.id;

        return (
          <div 
            key={ag.id}
            className={`bg-[#111827] border rounded-[10px] p-5 flex flex-col justify-between transition-all ${
              isActive ? 'border-[#0EA5E9] shadow-sm' :
              ag.isHalted && activeStep >= ag.id ? 'border-[#EF4444] shadow-sm' :
              'border-[rgba(148,163,184,0.16)]'
            }`}
          >
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-[#162033] border border-[rgba(148,163,184,0.16)] flex items-center justify-center text-[#0EA5E9]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F8FAFC]">
                      {ag.name}
                    </h4>
                    <p className="text-[11px] text-[#94A3B8]">{ag.subtitle}</p>
                  </div>
                </div>

                <span className={`badge-status text-[10px] ${
                  isCompleted ? 'badge-emerald' :
                  isActive ? 'badge-lime' :
                  ag.isHalted && activeStep >= ag.id ? 'badge-red' :
                  'badge-neutral'
                }`}>
                  {isCompleted ? 'Complete' :
                   isActive ? 'Running' :
                   ag.isHalted && activeStep >= ag.id ? 'Halted' :
                   'Waiting'}
                </span>
              </div>

              {/* Action Log / Preview */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-[#94A3B8] block">Most recent action</span>

                {ag.isHalted && ag.id >= 2 ? (
                  <div className="bg-red-950/30 border border-[#EF4444] rounded-md p-3 text-xs text-[#EF4444] space-y-1 font-mono">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Halted by AI-SRF override</span>
                    </div>
                    <p className="text-[11px] text-[#F8FAFC]">
                      Execution intercepted to prevent technician dispatch to breached vault. Level 3 HITL approval required.
                    </p>
                  </div>
                ) : ag.data ? (
                  ag.id === 3 ? (
                    /* WhatsApp Preview Box */
                    <div className="bg-[#0b141a] border border-[#128C7E] rounded-md p-3 text-xs text-white space-y-2">
                      <div className="flex items-center justify-between border-b border-emerald-950 pb-1 text-[10px] text-emerald-400 font-medium">
                        <span>WhatsApp Merchant Support</span>
                        <span>Verified</span>
                      </div>
                      <p className="bg-[#111b21] p-2 rounded border border-emerald-900/50 text-[#E9EDEF] leading-relaxed text-[11px]">
                        "{ag.data.action}"
                      </p>
                      <div className="text-[10px] text-emerald-500 text-right font-mono">
                        ✓✓ Delivered • Automated Ops
                      </div>
                    </div>
                  ) : (
                    /* Standard Console Box */
                    <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] rounded-md p-3 text-xs text-[#94A3B8] font-mono leading-relaxed space-y-1">
                      <div className="flex items-center gap-1 text-[#F8FAFC] font-bold text-[11px]">
                        <Terminal className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span>Action output:</span>
                      </div>
                      <p className="text-[#F8FAFC] text-[11px]">{ag.data.action}</p>
                    </div>
                  )
                ) : (
                  <div className="bg-[#162033] border border-dashed border-[rgba(148,163,184,0.16)] rounded-md p-4 text-center text-xs text-[#64748B]">
                    Waiting to start telemetry analysis...
                  </div>
                )}
              </div>

              {/* Technical Details Accordion */}
              {ag.data && (
                <div className="pt-1">
                  <button
                    onClick={() => setExpandedAgent(isExpanded ? null : ag.id)}
                    className="flex items-center gap-1 text-[11px] text-[#0EA5E9] hover:underline font-mono"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    <span>{isExpanded ? 'Hide details' : 'Expand details'}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 bg-[#0B1120] border border-[rgba(148,163,184,0.16)] rounded-md p-2.5 text-[11px] font-mono text-[#94A3B8] space-y-1">
                      <div>Engine: <strong className="text-[#F8FAFC]">Lesaka-Agent-v3.4</strong></div>
                      <div>Latency: <strong className="text-[#F8FAFC]">42ms</strong></div>
                      <div>Status code: <strong className="text-[#22C55E]">200 OK</strong></div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[rgba(148,163,184,0.1)] mt-3 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>Responsibility:</span>
              <span className="font-mono text-[#94A3B8]">Stage {ag.id} Execution</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
