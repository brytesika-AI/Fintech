import React from 'react';
import { Truck, Navigation, Wrench } from 'lucide-react';

export default function FieldResponseCard({ activeStep, isTrapActive }) {
  return (
    <div className="bg-[#111827] border border-[rgba(148,163,184,0.16)] rounded-[10px] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.1)] pb-3">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#0EA5E9]" />
          <h3 className="text-sm font-bold text-[#F8FAFC]">
            Field response
          </h3>
        </div>
        <span className={`badge-status ${
          isTrapActive ? 'badge-red' : (activeStep >= 2 ? 'badge-emerald' : 'badge-neutral')
        }`}>
          {isTrapActive ? 'Dispatch halted' : (activeStep >= 2 ? 'En route' : 'Standby')}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] p-3 rounded-md space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Assigned specialist:</span>
            <strong className="text-[#F8FAFC]">Sipho · TECH-409</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Distance:</span>
            <span className="text-[#0EA5E9] font-bold">5.2 km away</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Est. arrival:</span>
            <span className="text-[#F8FAFC]">12 minutes</span>
          </div>
        </div>

        <div className="bg-[#162033] border border-[rgba(148,163,184,0.16)] p-3 rounded-md space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Required part:</span>
            <strong className="text-[#F8FAFC]">PSU-24V Module</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Midrand hub stock:</span>
            <span className="text-[#22C55E] font-bold">14 units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Vehicle ID:</span>
            <span className="text-[#F8FAFC]">Nissan NP200 Bakkie</span>
          </div>
        </div>
      </div>
    </div>
  );
}
