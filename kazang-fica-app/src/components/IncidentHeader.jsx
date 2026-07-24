import React from 'react';
import { AlertCircle, MapPin, Clock, UserCheck, ShieldAlert } from 'lucide-react';

export default function IncidentHeader({ 
  activeStep, 
  isTrapActive, 
  isOrchestrating 
}) {
  // Determine current resolution status
  const getStatusBadge = () => {
    if (isTrapActive) {
      return <span className="badge-status badge-red">Lethal Risk Exception</span>;
    }
    if (isOrchestrating) {
      return <span className="badge-status badge-amber">Resolution in progress</span>;
    }
    if (activeStep === 3) {
      return <span className="badge-status badge-emerald">Resolution complete</span>;
    }
    return <span className="badge-status badge-amber">Awaiting autonomous resolution</span>;
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#334155] pb-4">
        
        {/* Incident Title & Meta */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Incident EP-8842
            </h2>
            <span className={isTrapActive ? "badge-status badge-red" : "badge-status badge-amber"}>
              {isTrapActive ? "High severity" : "Medium severity"}
            </span>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-[#94A3B8]">
            Roodepoort Node • EasyPay Terminal Operations
          </p>
        </div>

        {/* Elapsed Time & Timer */}
        <div className="flex items-center gap-2 bg-[#0F172A] px-3.5 py-2 rounded-lg border border-[#334155] text-xs font-mono">
          <Clock className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[#94A3B8]">Elapsed time:</span>
          <strong className="text-white">14m 22s</strong>
        </div>

      </div>

      {/* Structured Label-Value Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        
        <div className="space-y-1">
          <span className="text-[#94A3B8] font-medium block">Location</span>
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#D4EB00]" />
            <span>Roodepoort Supermarket</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#94A3B8] font-medium block">Incident type</span>
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <AlertCircle className={`w-3.5 h-3.5 ${isTrapActive ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
            <span>{isTrapActive ? 'Device physical tampering' : 'Voltage fluctuation'}</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[#94A3B8] font-medium block">Assigned specialist</span>
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Sipho · TECH-409</span>
          </div>
          <span className="text-[11px] text-[#64748B]">5.2 km away</span>
        </div>

        <div className="space-y-1">
          <span className="text-[#94A3B8] font-medium block">Current state</span>
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <span className={`w-2 h-2 rounded-full ${isTrapActive ? 'bg-[#EF4444]' : (activeStep > 0 ? 'bg-[#10B981]' : 'bg-[#F59E0B]')}`}></span>
            <span>
              {isTrapActive 
                ? 'Halted (HITL required)' 
                : (isOrchestrating ? `Executing step ${activeStep} of 3` : (activeStep === 3 ? 'Resolved' : 'Ready to start'))}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
