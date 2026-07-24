import React from 'react';
import { Activity, Truck, MessageSquare, CheckSquare, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function WorkflowStepper({ activeStep, isTrapActive }) {
  const steps = [
    { id: 1, title: 'Triage & telemetry', icon: Activity, desc: 'Hardware diagnostics' },
    { id: 2, title: 'Logistics & dispatch', icon: Truck, desc: 'Technician rerouting' },
    { id: 3, title: 'Resolution execution', icon: MessageSquare, desc: 'Merchant engagement' },
    { id: 4, title: 'Validation & closure', icon: CheckSquare, desc: 'Service verification' },
  ];

  const getStepState = (stepId) => {
    if (isTrapActive) {
      if (stepId === 1) return 'flagged';
      if (stepId === 2) return 'halted';
      return 'pending';
    }
    if (activeStep > stepId) return 'completed';
    if (activeStep === stepId) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-[#111827] border border-[rgba(148,163,184,0.16)] rounded-[10px] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.1)] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#F8FAFC] tracking-tight">
            Autonomous workflow
          </h3>
          <p className="text-xs text-[#94A3B8]">Connected 4-stage agent orchestration sequence</p>
        </div>
        <span className="text-xs font-mono text-[#0EA5E9]">
          {isTrapActive 
            ? 'Interrupted by safety flag' 
            : (activeStep === 0 ? 'Ready to execute' : `Stage ${activeStep} of 4`)}
        </span>
      </div>

      {/* Connected Stepper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {steps.map((step, idx) => {
          const state = getStepState(step.id);
          const IconComp = step.icon;

          let cardBorder = 'border-[rgba(148,163,184,0.16)]';
          if (state === 'active') cardBorder = 'border-[#0EA5E9] stepper-active-glow';
          if (state === 'flagged' || state === 'halted') cardBorder = 'border-[#EF4444] stepper-alert-glow';

          return (
            <div 
              key={step.id} 
              className={`bg-[#162033] border ${cardBorder} p-3.5 rounded-[8px] space-y-2 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    state === 'completed' ? 'bg-[#22C55E] text-[#0F172A]' :
                    state === 'active' ? 'bg-[#0EA5E9] text-white' :
                    state === 'flagged' || state === 'halted' ? 'bg-[#EF4444] text-white' :
                    'bg-[#334155] text-[#94A3B8]'
                  }`}>
                    {step.id}
                  </div>
                  <span className="text-xs font-bold text-[#F8FAFC]">{step.title}</span>
                </div>

                {state === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                {state === 'active' && <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse"></span>}
                {state === 'halted' && <AlertTriangle className="w-4 h-4 text-[#EF4444]" />}
              </div>

              <p className="text-[11px] text-[#94A3B8] leading-tight pl-8">
                {step.desc}
              </p>

              <div className="pt-2 border-t border-[rgba(148,163,184,0.08)] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#94A3B8]">Status:</span>
                <span className={
                  state === 'completed' ? 'text-[#22C55E] font-bold' :
                  state === 'active' ? 'text-[#0EA5E9] font-bold' :
                  state === 'flagged' || state === 'halted' ? 'text-[#EF4444] font-bold' :
                  'text-[#64748B]'
                }>
                  {state === 'completed' ? 'Completed' :
                   state === 'active' ? 'Running' :
                   state === 'flagged' ? 'Flagged' :
                   state === 'halted' ? 'Halted' : 'Not started'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
