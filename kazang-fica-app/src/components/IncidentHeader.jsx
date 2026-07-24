import React from 'react';
import { Clock, MapPin, AlertCircle, Terminal } from 'lucide-react';

export default function IncidentHeader({ 
  activeStep, 
  isTrapActive, 
  isOrchestrating 
}) {
  const getStatusBadge = () => {
    if (isTrapActive) {
      return <span className="badge-status badge-red">Lethal risk exception</span>;
    }
    if (isOrchestrating) {
      return <span className="badge-status badge-amber">Resolution in progress</span>;
    }
    if (activeStep === 3) {
      return <span className="badge-status badge-emerald">Resolved</span>;
    }
    return <span className="badge-status badge-amber">Ready to start</span>;
  };

  return (
    <div className="bg-[#111827] border border-[rgba(148,163,184,0.16)] rounded-[10px] p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Incident Metadata */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
              Incident EP-8842
            </h2>
            <span className="text-[#94A3B8] text-sm font-medium">·</span>
            <span className="text-[#F8FAFC] text-sm font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
              Roodepoort Supermarket
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] flex items-center gap-2">
            <span>EasyPay terminal operations</span>
            <span>·</span>
            <span className="text-[#F59E0B] font-medium">
              {isTrapActive ? 'Vault physical tampering breach' : 'Voltage fluctuation'}
            </span>
          </p>
        </div>

        {/* Right: Severity & Elapsed Time Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={isTrapActive ? "badge-status badge-red" : "badge-status badge-amber"}>
            {isTrapActive ? "Critical severity" : "Medium severity"}
          </span>
          {getStatusBadge()}
          <div className="flex items-center gap-1.5 bg-[#162033] px-3 py-1.5 rounded-md border border-[rgba(148,163,184,0.16)] text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[#94A3B8]">Elapsed:</span>
            <strong className="text-[#F8FAFC]">14m 22s</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
