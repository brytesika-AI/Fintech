import React from 'react';
import { UserCheck, MapPin, Truck, Wrench, ShieldAlert } from 'lucide-react';

export default function FieldResponseCard({ activeStep, isTrapActive }) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#334155] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#D4EB00]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Field Response Panel
            </h3>
            <p className="text-xs text-[#94A3B8]">Technician & Spare Parts Logistics</p>
          </div>
        </div>
        
        <span className={`badge-status ${
          isTrapActive ? 'badge-red' : (activeStep >= 2 ? 'badge-emerald' : 'badge-neutral')
        }`}>
          {isTrapActive ? 'Dispatch Halted' : (activeStep >= 2 ? 'En Route' : 'Standby')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Technician:</span>
            <strong className="text-white font-semibold">Sipho (TECH-409)</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Distance:</span>
            <span className="text-[#D4EB00] font-mono font-bold">5.2 km away</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Estimated arrival:</span>
            <span className="text-white font-mono font-semibold">12 minutes</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Required part:</span>
            <strong className="text-white font-semibold">PSU-24V Module</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Inventory hub:</span>
            <span className="text-[#10B981] font-mono font-bold">Midrand (14 units)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8]">Vehicle ID:</span>
            <span className="text-white font-mono">Nissan NP200 (REG-GP)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
