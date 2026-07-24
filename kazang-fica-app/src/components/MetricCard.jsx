import React from 'react';
import { Zap, Shield, ShieldAlert, Navigation, Lock, Unlock } from 'lucide-react';

export default function MetricCards({ activeStep, isTrapActive }) {
  const metrics = [
    {
      label: 'Supply voltage',
      value: isTrapActive ? '0.0 V' : (activeStep > 0 ? '0.0 V' : '23.4 V'),
      subtext: isTrapActive ? 'Power supply shut' : (activeStep > 0 ? 'Module short fault' : 'Fluctuating'),
      icon: Zap,
      status: isTrapActive ? 'critical' : (activeStep > 0 ? 'warning' : 'healthy'),
    },
    {
      label: 'Enclosure status',
      value: isTrapActive ? 'Tamper breached' : 'Locked & secure',
      subtext: isTrapActive ? 'Door sensor tripped' : 'Sensors nominal',
      icon: isTrapActive ? Unlock : Lock,
      status: isTrapActive ? 'critical' : 'healthy',
    },
    {
      label: 'Autonomy level',
      value: isTrapActive ? 'Level 3 HITL' : 'Level 1 Autonomous',
      subtext: isTrapActive ? 'Human approval required' : 'Full AI clearance',
      icon: isTrapActive ? ShieldAlert : Shield,
      status: isTrapActive ? 'critical' : 'healthy',
    },
    {
      label: 'Field specialist',
      value: 'Sipho · TECH-409',
      subtext: '5.2 km away · ETA 12m',
      icon: Navigation,
      status: 'neutral',
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'healthy':
        return 'badge-emerald';
      case 'warning':
        return 'badge-amber';
      case 'critical':
        return 'badge-red';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const IconComponent = m.icon;
        return (
          <div 
            key={idx}
            className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-[#475569] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-[#94A3B8]">{m.label}</span>
              <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#D4EB00]">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 space-y-0.5">
              <div className="text-lg font-bold text-white tracking-tight">
                {m.value}
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#64748B]">{m.subtext}</span>
                <span className={`badge-status ${getStatusBadgeClass(m.status)} text-[10px]`}>
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
