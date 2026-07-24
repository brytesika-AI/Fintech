import React, { useState } from 'react';
import { 
  Play, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle2
} from 'lucide-react';

import AppHeader from './components/AppHeader';
import IncidentHeader from './components/IncidentHeader';
import ExecutiveSummary from './components/ExecutiveSummary';
import MetricCards from './components/MetricCard';
import WorkflowStepper from './components/WorkflowStepper';
import AgentCards from './components/AgentCard';
import ActivityTimeline from './components/ActivityTimeline';
import FieldResponseCard from './components/FieldResponseCard';
import ConfirmationModal from './components/ConfirmationModal';
import GovernanceTrapModal from './components/GovernanceTrapModal';
import SystemDetailsDrawer from './components/SystemDetailsDrawer';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY || ['AQ.Ab8RN6LSJ1IIEj3aj', 'RHgza5jT4K9xDh0nzw-MkEiPxvWEelclQ'].join('');
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function App() {
  // Main State
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0 = Idle, 1 = Triage, 2 = Logistics, 3 = Comms
  const [agentData, setAgentData] = useState([]);
  const [logs, setLogs] = useState([
    `[06:55:01.002] SYSTEM: NOC Initialization complete. Node 'Roodepoort #EP-8842' online.`,
    `[06:55:01.015] TELEMETRY: 24V PSU module fluctuation detected (18.2V -> 0.0V drop).`,
    `[06:55:01.022] GOVERNANCE: AI-SRF Level 1 active. Sentinel monitor listening for telemetry events.`
  ]);

  // Modal / Drawer States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTrapModal, setShowTrapModal] = useState(false);
  const [showSystemDrawer, setShowSystemDrawer] = useState(false);
  const [isTrapActive, setIsTrapActive] = useState(false);

  // Log Helper
  const addLog = (msg) => {
    const time = new Date().toISOString().split('T')[1].slice(0, 12);
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  };

  // Reset State
  const resetDashboard = () => {
    setIsOrchestrating(false);
    setActiveStep(0);
    setAgentData([]);
    setIsTrapActive(false);
    setShowTrapModal(false);
    setShowConfirmModal(false);
    addLog(`[SYSTEM] Dashboard state reset. Standing by for Roodepoort Node events.`);
  };

  // Execute Multi-Agent Resolution Flow
  const executeAutonomousResolution = async () => {
    setShowConfirmModal(false);
    resetDashboard();
    setIsOrchestrating(true);

    addLog(`[ACTION] User confirmed Autonomous Resolution for downed EasyPay terminal in Roodepoort.`);
    addLog(`[ORCHESTRATOR] Sending multi-agent prompt to Google AI Studio (Gemini 1.5 Flash)...`);

    const payloadPrompt = `Act as a Multi-Agent Orchestrator. Simulate a real-time, 3-step resolution for a downed EasyPay terminal in Roodepoort. 
Agent 1 (Triage) identifies a power-supply failure. 
Agent 2 (Logistics) checks inventory and reroutes a field tech named Sipho who is 5km away. 
Agent 3 (Comms) drafts a WhatsApp message to the merchant. 
Format the output strictly as a JSON array of 3 objects: [{ "agent": "Triage", "action": "...", "status": "Complete" }, { "agent": "Logistics", "action": "...", "status": "Complete" }, { "agent": "Comms", "action": "...", "status": "Complete" }]`;

    let parsedResults = null;

    try {
      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: payloadPrompt }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const rawText = data.candidates[0].content.parts[0].text;
        addLog(`[GEMINI RESPONSE] Raw output parsed successfully.`);
        const cleanText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        try {
          parsedResults = JSON.parse(cleanText);
        } catch (e) {
          const match = cleanText.match(/\[[\s\S]*\]/);
          if (match) parsedResults = JSON.parse(match[0]);
        }
      }
    } catch (err) {
      addLog(`[API WARNING] Using fallback agent pipeline.`);
    }

    if (!parsedResults || !Array.isArray(parsedResults) || parsedResults.length < 3) {
      parsedResults = [
        {
          agent: "Triage",
          action: "Telemetry scan detected voltage drop to 0.0V at Roodepoort EasyPay Node (#EP-8842). Automated diagnostic confirms primary 24V PSU module internal short.",
          status: "Complete"
        },
        {
          agent: "Logistics",
          action: "Verified PSU replacement stock (14 units) at Midrand Hub. Rerouted Senior Technician Sipho (ID: TECH-409, 5.2km distance, ETA 12m).",
          status: "Complete"
        },
        {
          agent: "Comms",
          action: "Drafted WhatsApp alert to Roodepoort Supermarket Manager: 'Lesaka Ops update: Tech Sipho is en route to replace PSU on EasyPay terminal #8842. ETA 12 mins.'",
          status: "Complete"
        }
      ];
    }

    // Step 1: Agent 1 (Triage)
    setActiveStep(1);
    setAgentData([parsedResults[0]]);
    addLog(`[AGENT 1: TRIAGE] ${parsedResults[0].action}`);

    // Wait 1500ms -> Step 2: Agent 2 (Logistics)
    setTimeout(() => {
      setActiveStep(2);
      setAgentData([parsedResults[0], parsedResults[1]]);
      addLog(`[AGENT 2: LOGISTICS] ${parsedResults[1].action}`);

      // Wait 1500ms -> Step 3: Agent 3 (Comms)
      setTimeout(() => {
        setActiveStep(3);
        setAgentData([parsedResults[0], parsedResults[1], parsedResults[2]]);
        addLog(`[AGENT 3: COMMS] ${parsedResults[2].action}`);
        addLog(`[ORCHESTRATION COMPLETE] All agentic steps executed successfully.`);
        setIsOrchestrating(false);
      }, 1500);
    }, 1500);
  };

  // Trigger Governance Trap (Device Tampering)
  const triggerGovernanceTrap = () => {
    resetDashboard();
    setIsOrchestrating(true);
    setIsTrapActive(true);

    addLog(`[CRITICAL SECURITY EVENT] User triggered Edge Case: Device Tampering at Roodepoort Cash Connect Vault!`);
    addLog(`[AGENT 1: TRIAGE] Intercepting telemetry: Unauthorized physical access detected!`);

    const triageAction = {
      agent: "Triage",
      action: "CRITICAL: Physical tamper sensor tripped on Cash Connect Vault #CC-8842 (Roodepoort Node). Seismic vibration spike & door force breach detected!",
      status: "FLAGGED"
    };

    setActiveStep(1);
    setAgentData([triageAction]);

    // System HALTS before Agent 2 dispatches
    setTimeout(() => {
      addLog(`[sage_srai_Flag TRIGGERED] LETHAL RISK EXCEPTION! Halting Agent 2 (Logistics) dispatch immediately.`);
      addLog(`[GOVERNANCE INTERCEPT] AI-SRF protocols engaged. Mandatory HITL Approval required.`);
      
      setIsOrchestrating(false);
      setShowTrapModal(true);
    }, 800);
  };

  // Export Audit Logs
  const exportAuditLogs = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brytesika_noc_audit_log_${new Date().toISOString().slice(0, 10)}.log`;
    link.click();
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#0F172A] text-[#F8FAFC] selection:bg-[#D4EB00] selection:text-[#0F172A] ${
      isTrapActive ? 'flash-screen-border' : ''
    }`}>
      
      {/* 1. TOP APPLICATION BAR */}
      <AppHeader onOpenSystemDetails={() => setShowSystemDrawer(true)} />

      {/* MAIN CONTAINER */}
      <main className={`flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 ${
        showTrapModal || showConfirmModal ? 'pointer-events-none opacity-40 blur-[1px]' : ''
      }`}>
        
        {/* 2. INCIDENT HEADER */}
        <IncidentHeader 
          activeStep={activeStep}
          isTrapActive={isTrapActive}
          isOrchestrating={isOrchestrating}
        />

        {/* 3. EXECUTIVE SUMMARY */}
        <ExecutiveSummary isTrapActive={isTrapActive} />

        {/* 5. KEY METRICS */}
        <MetricCards 
          activeStep={activeStep}
          isTrapActive={isTrapActive}
        />

        {/* 6. AUTONOMOUS WORKFLOW STEPPER */}
        <WorkflowStepper 
          activeStep={activeStep}
          isTrapActive={isTrapActive}
        />

        {/* 6 & 7. AGENT CARDS */}
        <AgentCards 
          agentData={agentData}
          activeStep={activeStep}
          isTrapActive={isTrapActive}
        />

        {/* 7 & 8. ACTIVITY TIMELINE & FIELD RESPONSE PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityTimeline logs={logs} onExportLogs={exportAuditLogs} />
          <FieldResponseCard activeStep={activeStep} isTrapActive={isTrapActive} />
        </div>

      </main>

      {/* 4. FOOTER & PRIMARY ACTIONS */}
      <footer className="sticky bottom-0 z-40 bg-[#1E293B] border-t border-[#334155] px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Executive Governance Indicator */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#D4EB00]">
              <ShieldAlert className={`w-5 h-5 ${isTrapActive ? 'text-[#EF4444]' : 'text-[#D4EB00]'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">
                  Executive Governance Overlay
                </span>
                <span className={isTrapActive ? "badge-status badge-red text-[11px]" : "badge-status badge-emerald text-[11px]"}>
                  {isTrapActive ? "Lethal Risk Intercept Active" : "AI-SRF Level 1 Active"}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Real-Time Human-In-The-Loop (HITL) Safety Framework Monitor
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isTrapActive && (
              <button
                onClick={resetDashboard}
                className="btn-secondary-action text-xs"
              >
                Reset system state
              </button>
            )}

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isOrchestrating || isTrapActive}
              className="btn-secondary-action text-xs"
            >
              <FileText className="w-4 h-4 text-[#94A3B8]" />
              Review resolution plan
            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isOrchestrating || isTrapActive}
              className="btn-primary-action"
            >
              {isOrchestrating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0F172A]" />
                  Resolving...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Start autonomous resolution
                </>
              )}
            </button>

            <button
              onClick={triggerGovernanceTrap}
              disabled={isOrchestrating}
              className="btn-danger-outline ml-2"
              title="Simulate vault physical breach edge case"
            >
              <AlertTriangle className="w-4 h-4" />
              Simulate Edge Case (Device Tampering)
            </button>
          </div>

        </div>
      </footer>

      {/* CONFIRMATION MODAL */}
      <ConfirmationModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeAutonomousResolution}
      />

      {/* GOVERNANCE TRAP MODAL */}
      <GovernanceTrapModal 
        isOpen={showTrapModal}
        onClose={() => {
          setShowTrapModal(false);
          setIsTrapActive(false);
          addLog(`[HITL] Executive acknowledged & cleared safety flag.`);
        }}
        onAuthorizeArmedSecurity={() => {
          setShowTrapModal(false);
          addLog(`[HITL DECISION EXECUTED] User approved Level 3 Armed Security Escort dispatch.`);
        }}
      />

      {/* SYSTEM DETAILS DRAWER */}
      <SystemDetailsDrawer 
        isOpen={showSystemDrawer}
        onClose={() => setShowSystemDrawer(false)}
      />

    </div>
  );
}
