import React from 'react';
import { Terminal, Download } from 'lucide-react';

export default function ActivityTimeline({ logs, onExportLogs }) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[#334155] pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#D4EB00]" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Agent Activity Log & Real-Time Audit
          </h3>
        </div>
        <button
          onClick={onExportLogs}
          className="text-xs text-[#D4EB00] hover:underline flex items-center gap-1 font-mono font-medium"
        >
          <Download className="w-3.5 h-3.5" />
          Export audit log
        </button>
      </div>

      <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-3.5 max-h-52 overflow-y-auto font-mono text-xs space-y-1.5 leading-relaxed">
        {logs.map((log, idx) => (
          <div 
            key={idx}
            className={
              log.includes('CRITICAL') || log.includes('FLAGGED') || log.includes('LETHAL') || log.includes('HALTED')
                ? 'text-[#EF4444] font-bold'
                : log.includes('AGENT')
                ? 'text-[#D4EB00]'
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
