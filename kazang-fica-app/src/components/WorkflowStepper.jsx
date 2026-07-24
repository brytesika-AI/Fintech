import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, Truck, Activity, CheckSquare } from 'lucide-react';

export default function WorkflowStepper({ activeStep, isTrapActive }) {
  const steps = [
    { id: 1, title: 'Triage & Telemetry', icon: Activity, desc: 'Hardware diagnostics & anomaly detection' },
    { id: 2, title: 'Logistics & Dispatch', icon: Truck, desc: 'Inventory check & specialist rerouting' },
    { id: 3, title: 'Resolution Execution', icon: ShieldCheck, desc: 'WhatsApp merchant engagement & dispatch' },
    { id: 4, title: 'Validation & Closure', icon: CheckSquare, desc: 'Telemetry verification & case closure' },
  ];

  const getStepStatus = (stepId) => {
    if (isTrapActive) {
      if (stepId === 1) return 'flagged';
      if (stepId === 2) return 'halted';
      return 'upcoming';
    }
    if (activeStep > stepId) return 'completed';
    if (activeStep === stepId) return 'active';
    return 'upcoming';
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#334155] pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Autonomous Workflow Progress
          </h3>
          <p className="text-xs text-[#94A3B8]">4-Stage Multi-Agent Orchestration Sequence</p>
        </div>
        <span className="text-xs font-mono text-[#D4EB00]">
          {isTrapActive 
            ? 'Interrupted by Safety Flag' 
            : (activeStep === 0 ? 'Ready to execute' : `Stage ${activeStep} of 4`)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const IconComp = step.icon;

          let cardClasses = 'bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg transition-all';
          if (status === 'active') cardClasses += ' stepper-active-glow border-[#D4EB00]';
          if (status === 'flagged' || status === 'halted') cardClasses += ' stepper-alert-glow border-[#EF4444]';

          return (
            <div key={step.id} className={cardClasses}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    status === 'completed' ? 'bg-[#10B981] text-[#0F172A]' :
                    status === 'active' ? 'bg-[#D4EB00] text-[#0F172A]' :
                    status === 'flagged' || status === 'halted' ? 'bg-[#EF4444] text-white' :
                    'bg-[#334155] text-[#94A3B8]'
                  }`}>
                    {step.id}
                  </div>
                  <span className="text-xs font-bold text-white">{step.title}</span>
                </div>

                {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                {status === 'active' && <span className="w-2 h-2 rounded-full bg-[#D4EB00] animate-pulse"></span>}
                {status === 'halted' && <AlertTriangle className="w-4 h-4 text-[#EF4444]" />}
              </div>

              <p className="text-[11px] text-[#64748B] leading-tight">
                {step.desc}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#94A3B8]">Status:</span>
                <span className={
                  status === 'completed' ? 'text-[#10B981] font-bold' :
                  status === 'active' ? 'text-[#D4EB00] font-bold' :
                  status === 'flagged' || status === 'halted' ? 'text-[#EF4444] font-bold' :
                  'text-[#64748B]'
                }>
                  {status === 'completed' ? 'Completed' :
                   status === 'active' ? 'Running' :
                   status === 'flagged' ? 'Flagged' :
                   status === 'halted' ? 'Halted' : 'Not started'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
