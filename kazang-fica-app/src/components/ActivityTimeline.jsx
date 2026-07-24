import React from 'react';
import { Terminal, Download } from 'lucide-react';

export default function ActivityTimeline({ logs, onExportLogs }) {
  return (
    <div className="bg-[#111827] border border-[rgba(148,163,184,0.16)] rounded-[10px] p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.1)] pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#0EA5E9]" />
          <h3 className="text-sm font-bold text-[#F8FAFC]">
            Agent activity timeline
          </h3>
        </div>
        <button
          onClick={onExportLogs}
          className="text-xs text-[#0EA5E9] hover:underline flex items-center gap-1 font-mono font-medium"
        >
          <Download className="w-3.5 h-3.5" />
          Export audit log
        </button>
      </div>

      <div className="bg-[#0B1120] border border-[rgba(148,163,184,0.16)] rounded-md p-3 max-h-56 overflow-y-auto font-mono text-xs space-y-1.5 leading-relaxed">
        {logs.map((log, idx) => (
          <div 
            key={idx}
            className={
              log.includes('CRITICAL') || log.includes('FLAGGED') || log.includes('LETHAL') || log.includes('HALTED')
                ? 'text-[#EF4444] font-bold'
                : log.includes('AGENT')
                ? 'text-[#0EA5E9]'
                : 'text-[#94A3B8]'
            }
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
