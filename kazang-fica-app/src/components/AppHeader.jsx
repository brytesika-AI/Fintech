import React, { useState } from 'react';
import { Layers, Clock, Info } from 'lucide-react';

export default function AppHeader({ onOpenSystemDetails }) {
  const [now] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  return (
    <header className="bg-[#111827] border-b border-[rgba(148,163,184,0.16)] px-6 py-3.5 sticky top-0 z-30 shadow-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Product Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#162033] border border-[rgba(148,163,184,0.16)] flex items-center justify-center text-[#0EA5E9] shadow-inner">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#F8FAFC] tracking-tight">
              BryteSika Autonomous Ops
            </h1>
            <p className="text-[11px] text-[#94A3B8] font-normal">
              Network Operations Center • Lesaka Enterprise Platform
            </p>
          </div>
        </div>

        {/* Right: Environment & Status Meta */}
        <div className="flex items-center gap-3 text-xs">
          <span className="badge-status badge-neutral">Production</span>
          <span className="badge-status badge-emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            NOC active
          </span>

          <div className="hidden md:flex items-center gap-1.5 text-[#94A3B8] font-mono pl-2">
            <Clock className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Updated {now}</span>
          </div>

          <button
            onClick={onOpenSystemDetails}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#162033] border border-[rgba(148,163,184,0.16)] text-[#94A3B8] hover:text-white hover:border-[#334155] transition-all font-medium"
            title="System details"
          >
            <Info className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span className="hidden sm:inline">System details</span>
          </button>
        </div>

      </div>
    </header>
  );
}
