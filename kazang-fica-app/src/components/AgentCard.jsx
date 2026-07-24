import React, { useState } from 'react';
import { Activity, Truck, MessageSquare, ShieldCheck, ChevronDown, ChevronUp, Terminal, Lock, AlertTriangle } from 'lucide-react';

export default function AgentCards({ agentData, activeStep, isTrapActive }) {
  const [expandedAgent, setExpandedAgent] = useState(null);

  const agents = [
    {
      id: 1,
      name: 'Agent 1: Triage & Telemetry',
      subtitle: 'Hardware diagnostics & anomaly detection',
      icon: Activity,
      data: agentData[0],
      isHalted: false,
    },
    {
      id: 2,
      name: 'Agent 2: Logistics & Dispatch',
      subtitle: 'Inventory check & specialist rerouting',
      icon: Truck,
      data: agentData[1],
      isHalted: isTrapActive,
    },
    {
      id: 3,
      name: 'Agent 3: Merchant Comms',
      subtitle: 'Automated WhatsApp engagement',
      icon: MessageSquare,
      data: agentData[2],
      isHalted: isTrapActive,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {agents.map((ag) => {
        const IconComp = ag.icon;
        const isActive = activeStep === ag.id && !isTrapActive;
        const isCompleted = activeStep > ag.id && !isTrapActive;
        const isExpanded = expandedAgent === ag.id;

        return (
          <div 
            key={ag.id}
            className={`bg-[#1E293B] border rounded-xl p-5 flex flex-col justify-between transition-all ${
              isActive ? 'border-[#D4EB00] shadow-md' :
              ag.isHalted && activeStep >= ag.id ? 'border-[#EF4444] shadow-md' :
              'border-[#334155]'
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#D4EB00]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
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
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#94A3B8] block">Agent activity</span>

                {ag.isHalted && ag.id >= 2 ? (
                  <div className="bg-red-950/30 border border-[#EF4444] rounded-lg p-3.5 text-xs text-[#EF4444] space-y-1 font-mono">
                    <div className="flex items-center gap-2 font-bold">
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
                    <div className="bg-[#0b141a] border border-[#128C7E] rounded-lg p-3.5 text-xs text-white space-y-2">
                      <div className="flex items-center justify-between border-b border-emerald-950 pb-1.5 text-[11px] text-emerald-400 font-medium">
                        <span>WhatsApp Merchant Support</span>
                        <span>Verified</span>
                      </div>
                      <p className="bg-[#111b21] p-2.5 rounded border border-emerald-900/50 text-[#E9EDEF] leading-relaxed">
                        "{ag.data.action}"
                      </p>
                      <div className="text-[10px] text-emerald-500 text-right font-mono">
                        ✓✓ Delivered • Automated Ops
                      </div>
                    </div>
                  ) : (
                    /* Standard Console Box */
                    <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-3.5 text-xs text-[#94A3B8] font-mono leading-relaxed space-y-1.5">
                      <div className="flex items-center gap-1.5 text-white font-bold">
                        <Terminal className="w-3.5 h-3.5 text-[#D4EB00]" />
                        <span>Action summary:</span>
                      </div>
                      <p className="text-[#F8FAFC]">{ag.data.action}</p>
                    </div>
                  )
                ) : (
                  <div className="bg-[#0F172A] border border-dashed border-[#334155] rounded-lg p-5 text-center text-xs text-[#64748B]">
                    Waiting to start telemetry analysis...
                  </div>
                )}
              </div>

              {/* Technical Details Accordion */}
              {ag.data && (
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedAgent(isExpanded ? null : ag.id)}
                    className="flex items-center gap-1 text-xs text-[#D4EB00] hover:underline font-mono"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    <span>{isExpanded ? 'Hide technical logs' : 'Expand technical details'}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 bg-[#0B1120] border border-[#334155] rounded-lg p-3 text-[11px] font-mono text-[#94A3B8] space-y-1">
                      <div>Engine: <strong className="text-white">Lesaka-Agent-v3.4</strong></div>
                      <div>Latency: <strong className="text-white">42ms</strong></div>
                      <div>Status code: <strong className="text-[#10B981]">200 OK</strong></div>
                      <div>Payload: <span className="text-[#64748B]">JSON_ARRAY_PART_{ag.id}</span></div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#334155] mt-4 flex items-center justify-between text-xs text-[#64748B]">
              <span>Responsibility:</span>
              <span className="font-mono text-[#94A3B8]">Stage {ag.id} Execution</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
