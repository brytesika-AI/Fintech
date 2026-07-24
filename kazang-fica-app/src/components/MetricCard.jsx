import React from 'react';
import { Zap, Lock, Unlock, Shield, ShieldAlert, Navigation } from 'lucide-react';

export default function KeyMetrics({ activeStep, isTrapActive }) {
  const metrics = [
    {
      label: 'Supply voltage',
      value: isTrapActive ? '0.0 V' : (activeStep > 0 ? '0.0 V' : '23.4 V'),
      subtext: isTrapActive ? 'Power shut' : (activeStep > 0 ? 'Short fault' : 'Fluctuating'),
      icon: Zap,
      status: isTrapActive ? 'critical' : (activeStep > 0 ? 'warning' : 'warning'),
    },
    {
      label: 'Enclosure',
      value: isTrapActive ? 'Breached' : 'Secure',
      subtext: isTrapActive ? 'Door sensor tripped' : 'Locked & nominal',
      icon: isTrapActive ? Unlock : Lock,
      status: isTrapActive ? 'critical' : 'success',
    },
    {
      label: 'Autonomy level',
      value: isTrapActive ? 'Level 3 HITL' : 'Level 1',
      subtext: isTrapActive ? 'Human approval required' : 'Full AI clearance',
      icon: isTrapActive ? ShieldAlert : Shield,
      status: isTrapActive ? 'critical' : 'success',
    },
    {
      label: 'Field response',
      value: 'Sipho · TECH-409',
      subtext: '5.2 km away',
      icon: Navigation,
      status: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const IconComponent = m.icon;
        return (
          <div 
            key={idx}
            className="bg-[#111827] border border-[rgba(148,163,184,0.16)] rounded-[10px] p-4 flex flex-col justify-between h-[110px] shadow-sm hover:border-[rgba(148,163,184,0.3)] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium">{m.label}</span>
              <div className="w-8 h-8 rounded-md bg-[#162033] border border-[rgba(148,163,184,0.16)] flex items-center justify-center text-[#0EA5E9]">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-xl font-bold text-[#F8FAFC] tracking-tight truncate">
                {m.value}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8] truncate">{m.subtext}</span>
                <span className={`badge-status text-[10px] ${
                  m.status === 'success' ? 'badge-emerald' :
                  m.status === 'warning' ? 'badge-amber' :
                  m.status === 'critical' ? 'badge-red' :
                  'badge-neutral'
                }`}>
                  {m.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
