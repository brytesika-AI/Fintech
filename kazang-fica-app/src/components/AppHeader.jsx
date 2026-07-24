import React, { useState } from 'react';
import { Layers, Shield, Clock, Info, User, ChevronRight } from 'lucide-react';

export default function AppHeader({ onOpenSystemDetails }) {
  const [now] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  return (
    <header className="bg-[#1E293B] border-b border-[#334155] px-6 py-3.5 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Product & Environment Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#D4EB00] shadow-inner">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-bold text-white tracking-tight">
                BryteSika Autonomous Ops
              </h1>
              <span className="badge-status badge-neutral">Production</span>
              <span className="badge-status badge-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                NOC Active
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5 font-normal">
              Lesaka Zero-Touch Multi-Agent Orchestrator
            </p>
          </div>
        </div>

        {/* System Meta & Controls */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-[#94A3B8] font-mono">
            <Clock className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Updated {now}</span>
          </div>

          <button
            onClick={onOpenSystemDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#475569] transition-all font-medium"
            title="View technical environment details"
          >
            <Info className="w-3.5 h-3.5 text-[#D4EB00]" />
            <span>System details</span>
          </button>

          <div className="h-4 w-[1px] bg-[#334155]"></div>

          <div className="flex items-center gap-2 text-white font-medium bg-[#0F172A] px-2.5 py-1.5 rounded-md border border-[#334155]">
            <div className="w-5 h-5 rounded-full bg-[#334155] flex items-center justify-center text-[10px] font-bold text-[#D4EB00]">
              OP
            </div>
            <span className="text-xs">Ops Lead</span>
          </div>
        </div>

      </div>
    </header>
  );
}
