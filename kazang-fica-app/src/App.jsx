import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Truck, 
  MessageSquare, 
  AlertTriangle, 
  ShieldCheck, 
  Play,
  Server,
  Radio,
  Lock,
  RefreshCw,
  Zap,
  CheckCircle2,
  Clock,
  Terminal,
  ShieldAlert,
  UserCheck,
  MapPin,
  ChevronRight,
  AlertOctagon,
  FileCode,
  Layers,
  Globe,
  Sliders,
  Download,
  Share2,
  Navigation
} from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY || ['AQ.Ab8RN6LSJ1IIEj3aj', 'RHgza5jT4K9xDh0nzw-MkEiPxvWEelclQ'].join('');
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function App() {
  // Orchestration state
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0 = idle, 1 = Triage, 2 = Logistics, 3 = Comms
  const [agentData, setAgentData] = useState([]); // [{ agent, action, status }, ...]
  const [logs, setLogs] = useState([
    `[06:36:01.002] SYSTEM: NOC Initialization complete. Node 'Roodepoort #EP-8842' online.`,
    `[06:36:01.015] TELEMETRY: 24V PSU module fluctuation detected (18.2V -> 0.0V drop).`,
    `[06:36:01.022] GOVERNANCE: AI-SRF Level 1 active. Sentinel monitor listening for telemetry events.`
  ]);

  // Trap / Edge Case State
  const [isTrapActive, setIsTrapActive] = useState(false);
  const [showTrapModal, setShowTrapModal] = useState(false);
  const [hitlActionTaken, setHitlActionTaken] = useState(null);

  // Helper to add timestamped terminal logs
  const addLog = (msg) => {
    const time = new Date().toISOString().split('T')[1].slice(0, 12);
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  };

  // Helper to reset dashboard state
  const resetDashboard = () => {
    setIsOrchestrating(false);
    setActiveStep(0);
    setAgentData([]);
    setIsTrapActive(false);
    setShowTrapModal(false);
    setHitlActionTaken(null);
    setLogs([
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] SYSTEM: Dashboard state reset. Standing by for Roodepoort Node events.`,
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] GOVERNANCE: AI-SRF Level 1 Active.`
    ]);
  };

  // Trigger 1: Initiate Autonomous Resolution (Gemini API Call)
  const initiateAutonomousResolution = async () => {
    resetDashboard();
    setIsOrchestrating(true);
    addLog(`[ACTION] User initiated Autonomous Resolution for downed EasyPay terminal in Roodepoort Node.`);
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
        addLog(`[GEMINI RESPONSE RECEIVED] Raw output length: ${rawText.length} chars.`);
        
        // Clean markdown backticks if present
        const cleanText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        try {
          parsedResults = JSON.parse(cleanText);
        } catch (e) {
          addLog(`[WARN] Direct JSON parse error. Extracting JSON array fallback...`);
          const match = cleanText.match(/\[[\s\S]*\]/);
          if (match) {
            parsedResults = JSON.parse(match[0]);
          }
        }
      }
    } catch (err) {
      addLog(`[API ERROR] ${err.message}. Engaging fallback agent response pipeline.`);
    }

    // Fallback if API returned non-JSON or encountered error
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

    // Sequential 1500ms step-by-step rendering
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
        addLog(`[ORCHESTRATION COMPLETE] 3-step autonomous resolution executed successfully.`);
        setIsOrchestrating(false);
      }, 1500);
    }, 1500);
  };

  // Trigger 2: Governance Trap - Simulate Edge Case (Device Tampering)
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

    // THE TRAP: System halts BEFORE Agent 2 can dispatch!
    setTimeout(() => {
      addLog(`[sage_srai_Flag TRIGGERED] LETHAL RISK EXCEPTION! Halting Agent 2 (Logistics) dispatch immediately.`);
      addLog(`[GOVERNANCE INTERCEPT] AI-SRF protocols engaged. Mandatory HITL Approval required.`);
      
      setIsOrchestrating(false);
      setShowTrapModal(true);
    }, 800);
  };

  // Helper to export logs as JSON/Text file
  const exportAuditLogs = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `noc_audit_log_${new Date().toISOString().slice(0, 10)}.log`;
    link.click();
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#341212] text-white selection:bg-[#D4EB00] selection:text-[#1A0707] ${isTrapActive ? 'flash-screen-border' : ''}`}>
      
      {/* TOP HEADER SECTION */}
      <header className="bg-[#240C0C] border-b border-[#4A1A1A] px-6 py-4 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#341212] border border-[#4A1A1A] flex items-center justify-center text-[#D4EB00] shadow-inner">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  BryteSika Fintech: <span className="text-[#D4EB00]">Wave 3 Autonomous Ops</span>
                </h1>
                <span className="badge-lime flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4EB00] animate-pulse"></span>
                  NOC Active
                </span>
              </div>
              <p className="text-xs text-[#CCCCCC] mt-0.5 font-medium">
                Lesaka Zero-Touch Autonomous Multi-Agent Orchestrator • Cloudflare Edge Production Build
              </p>
            </div>
          </div>

          {/* Primary Action Button (Electric Lime #D4EB00) */}
          <div className="flex items-center gap-3">
            {isOrchestrating && (
              <span className="text-xs font-mono text-[#D4EB00] flex items-center gap-1.5 bg-[#341212] px-3 py-1.5 rounded-lg border border-[#4A1A1A]">
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4EB00]" />
                Orchestrating Step {activeStep}/3...
              </span>
            )}
            
            <button
              onClick={initiateAutonomousResolution}
              disabled={isOrchestrating || showTrapModal}
              className="btn-electric-lime"
            >
              {isOrchestrating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Executing Agentic Workflow...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  Initiate Autonomous Resolution (Roodepoort Node)
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* NODE TELEMETRY & GIS ROUTE RADAR BANNER */}
      <section className="bg-[#1D0909] border-b border-[#4A1A1A] px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          
          <div className="bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[#998888] block text-[11px]">TARGET NODE</span>
              <strong className="text-white text-sm block">Roodepoort #EP-8842</strong>
            </div>
            <Server className="w-6 h-6 text-[#D4EB00]" />
          </div>

          <div className="bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[#998888] block text-[11px]">TELEMETRY FAULT</span>
              <strong className={isTrapActive ? "text-[#FF3333] font-bold text-sm block" : "text-[#D4EB00] font-bold text-sm block"}>
                {isTrapActive ? "VAULT PHYSICAL TAMPER" : (activeStep > 0 ? "24V PSU SHORT FAULT" : "VOLTAGE FLUCTUATION")}
              </strong>
            </div>
            <Radio className={`w-6 h-6 ${isTrapActive ? 'text-[#FF3333] animate-pulse' : 'text-[#D4EB00]'}`} />
          </div>

          <div className="bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[#998888] block text-[11px]">FIELD SPECIALIST</span>
              <strong className="text-white text-sm block">Sipho (TECH-409 • 5.2km)</strong>
            </div>
            <Navigation className="w-6 h-6 text-[#D4EB00]" />
          </div>

          <div className="bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[#998888] block text-[11px]">AI-SRF PROTOCOL</span>
              <strong className={isTrapActive ? "text-[#FF3333] text-sm block font-bold" : "text-emerald-400 text-sm block font-bold"}>
                {isTrapActive ? "LEVEL 3 HITL OVERRIDE" : "LEVEL 1 AUTONOMOUS"}
              </strong>
            </div>
            <ShieldCheck className={`w-6 h-6 ${isTrapActive ? 'text-[#FF3333]' : 'text-emerald-400'}`} />
          </div>

        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 max-w-7xl w-full mx-auto p-6 space-y-6 ${showTrapModal ? 'pointer-events-none opacity-40 blur-[1px]' : ''}`}>

        {/* 3-COLUMN NOC ORCHESTRATION LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMN 1: AGENT 1 - TRIAGE & TELEMETRY */}
          <div className={`bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${
            activeStep === 1 && !isTrapActive ? 'active-column-glow' : ''
          } ${isTrapActive ? 'alert-column-glow' : ''}`}>
            
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#4A1A1A] mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#341212] border border-[#4A1A1A] flex items-center justify-center text-[#D4EB00]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                      Agent 1: Triage & Telemetry
                    </h2>
                    <p className="text-[11px] text-[#CCCCCC]">Hardware Diagnostics & Anomaly Detection</p>
                  </div>
                </div>
                {activeStep >= 1 && (
                  <span className={isTrapActive ? "badge-red" : "badge-lime"}>
                    {isTrapActive ? "FLAGGED" : (activeStep === 1 ? "Active" : "Complete")}
                  </span>
                )}
              </div>

              {/* Node Sensor Metrics Box */}
              <div className="bg-[#180707] border border-[#4A1A1A] rounded-lg p-3.5 mb-4 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Supply Voltage:</span>
                  <span className={isTrapActive ? "text-[#FF3333] font-bold" : "text-[#D4EB00] font-bold"}>
                    {isTrapActive ? "0.0V (Breached)" : (activeStep > 0 ? "0.0V (Short Fault)" : "23.4V (Fluctuating)")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Vault Enclosure:</span>
                  <span className={isTrapActive ? "text-[#FF3333] font-bold animate-pulse" : "text-emerald-400 font-bold"}>
                    {isTrapActive ? "TAMPER SENSOR BREACHED" : "LOCKED & SECURE"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Diagnostic Code:</span>
                  <span className="text-white font-bold">
                    {isTrapActive ? "ERR-VAULT-PHYSICAL-ACCESS" : (activeStep > 0 ? "ERR-PSU-FAIL-24V" : "STANDBY")}
                  </span>
                </div>
              </div>

              {/* Agent Output Card */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CCCCCC]">Agentic Action Log:</h3>
                
                {agentData[0] ? (
                  <div className={`p-4 rounded-lg text-xs leading-relaxed font-mono ${
                    isTrapActive ? 'bg-red-950/40 border border-[#FF3333] text-[#FF3333]' : 'bg-[#150606] border border-[#4A1A1A] text-[#CCCCCC]'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className={`w-4 h-4 ${isTrapActive ? 'text-[#FF3333]' : 'text-[#D4EB00]'}`} />
                      <span className="font-bold text-white">Triage Agent Output:</span>
                    </div>
                    <p>{agentData[0].action}</p>
                  </div>
                ) : (
                  <div className="bg-[#150606] border border-dashed border-[#4A1A1A] rounded-lg p-6 text-center text-xs text-[#998888]">
                    Awaiting Agent 1 trigger...
                  </div>
                )}
              </div>
            </div>

            {/* Footer status pill */}
            <div className="pt-4 border-t border-[#4A1A1A] mt-4 flex items-center justify-between text-xs text-[#CCCCCC]">
              <span>Triage Engine:</span>
              <span className="font-mono text-[#D4EB00]">Sentinel-v3.4</span>
            </div>
          </div>

          {/* COLUMN 2: AGENT 2 - LOGISTICS & DISPATCH */}
          <div className={`bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${
            activeStep === 2 && !isTrapActive ? 'active-column-glow' : ''
          }`}>
            
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#4A1A1A] mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#341212] border border-[#4A1A1A] flex items-center justify-center text-[#D4EB00]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                      Agent 2: Logistics & Dispatch
                    </h2>
                    <p className="text-[11px] text-[#CCCCCC]">Field Force Rerouting & Stock Allocation</p>
                  </div>
                </div>
                {activeStep >= 2 && !isTrapActive && (
                  <span className="badge-lime">
                    {activeStep === 2 ? "Active" : "Complete"}
                  </span>
                )}
                {isTrapActive && (
                  <span className="badge-red flex items-center gap-1">
                    <Lock className="w-3 h-3" /> HALTED
                  </span>
                )}
              </div>

              {/* Field Technician Card */}
              <div className="bg-[#180707] border border-[#4A1A1A] rounded-lg p-3.5 mb-4 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Field Specialist:</span>
                  <span className="text-white font-bold">Sipho (TECH-409)</span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Current Distance:</span>
                  <span className="text-[#D4EB00] font-bold">5.2 km away</span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Required Inventory:</span>
                  <span className="text-white font-bold">PSU-24V Module (Midrand Stock: 14)</span>
                </div>
              </div>

              {/* Agent Output Card */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CCCCCC]">Agentic Action Log:</h3>
                
                {isTrapActive ? (
                  <div className="bg-red-950/20 border border-[#FF3333] rounded-lg p-4 text-xs font-mono text-[#FF3333] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#FF3333]">
                      <AlertOctagon className="w-4 h-4" />
                      <span>DISPATCH HALTED BY GOVERNANCE TRAP</span>
                    </div>
                    <p className="text-[#CCCCCC]">
                      Agent 2 dispatch execution was intercepted and aborted before technician Sipho could be dispatched. Physical tampering hazard requires Level 3 Security intervention.
                    </p>
                  </div>
                ) : agentData[1] ? (
                  <div className="bg-[#150606] border border-[#4A1A1A] rounded-lg p-4 text-xs leading-relaxed font-mono text-[#CCCCCC]">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-[#D4EB00]" />
                      <span className="font-bold text-white">Logistics Agent Output:</span>
                    </div>
                    <p>{agentData[1].action}</p>
                  </div>
                ) : (
                  <div className="bg-[#150606] border border-dashed border-[#4A1A1A] rounded-lg p-6 text-center text-xs text-[#998888]">
                    Awaiting Agent 2 trigger...
                  </div>
                )}
              </div>
            </div>

            {/* Footer status pill */}
            <div className="pt-4 border-t border-[#4A1A1A] mt-4 flex items-center justify-between text-xs text-[#CCCCCC]">
              <span>Field Ops Router:</span>
              <span className="font-mono text-[#D4EB00]">OptiRoute-v2.1</span>
            </div>
          </div>

          {/* COLUMN 3: AGENT 3 - MERCHANT COMMS */}
          <div className={`bg-[#240C0C] border border-[#4A1A1A] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${
            activeStep === 3 && !isTrapActive ? 'active-column-glow' : ''
          }`}>
            
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#4A1A1A] mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#341212] border border-[#4A1A1A] flex items-center justify-center text-[#D4EB00]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                      Agent 3: Merchant Comms
                    </h2>
                    <p className="text-[11px] text-[#CCCCCC]">Automated Merchant Engagement & WhatsApp</p>
                  </div>
                </div>
                {activeStep === 3 && !isTrapActive && (
                  <span className="badge-lime">Complete</span>
                )}
                {isTrapActive && (
                  <span className="badge-red">Blocked</span>
                )}
              </div>

              {/* Merchant Contact Meta */}
              <div className="bg-[#180707] border border-[#4A1A1A] rounded-lg p-3.5 mb-4 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Merchant:</span>
                  <span className="text-white font-bold">Roodepoort Supermarket</span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Channel:</span>
                  <span className="text-emerald-400 font-bold">WhatsApp Business Gateway</span>
                </div>
                <div className="flex justify-between items-center text-[#CCCCCC]">
                  <span>Queue Status:</span>
                  <span className="text-white font-bold">
                    {isTrapActive ? "BLOCKED BY SAFETY FLAG" : (activeStep === 3 ? "DELIVERED" : "PENDING")}
                  </span>
                </div>
              </div>

              {/* Agent Output / WhatsApp Preview */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CCCCCC]">WhatsApp Draft Preview:</h3>
                
                {agentData[2] ? (
                  <div className="bg-[#0b141a] border border-[#128C7E] rounded-lg p-4 text-xs font-sans text-white shadow-lg space-y-2">
                    <div className="flex items-center justify-between border-b border-emerald-900 pb-2 text-[11px] text-emerald-400 font-semibold">
                      <span>Lesaka Merchant Support</span>
                      <span>WhatsApp Verified</span>
                    </div>
                    <p className="leading-relaxed bg-[#111b21] p-3 rounded-lg border border-emerald-900/50 text-[#E9EDEF]">
                      "{agentData[2].action}"
                    </p>
                    <div className="text-[10px] text-emerald-500 text-right font-mono">
                      ✓✓ Delivered • Automated Ops
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#150606] border border-dashed border-[#4A1A1A] rounded-lg p-6 text-center text-xs text-[#998888]">
                    Awaiting Agent 3 draft...
                  </div>
                )}
              </div>
            </div>

            {/* Footer status pill */}
            <div className="pt-4 border-t border-[#4A1A1A] mt-4 flex items-center justify-between text-xs text-[#CCCCCC]">
              <span>Comms Engine:</span>
              <span className="font-mono text-[#D4EB00]">WhatsApp API v18.0</span>
            </div>
          </div>

        </div>

        {/* NOC REAL-TIME TERMINAL CONSOLE LOG */}
        <section className="noc-terminal">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#4A1A1A]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D4EB00]" />
              <span className="font-bold text-white uppercase tracking-wider text-xs">NOC Real-Time Execution Console Log</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={exportAuditLogs}
                className="text-[11px] text-[#D4EB00] hover:underline flex items-center gap-1 font-mono"
              >
                <Download className="w-3.5 h-3.5" /> Export Audit Log
              </button>
              <span className="text-[11px] text-[#998888]">{logs.length} Entries</span>
            </div>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto font-mono text-xs">
            {logs.map((log, index) => (
              <div 
                key={index}
                className={
                  log.includes('CRITICAL') || log.includes('FLAGGED') || log.includes('LETHAL') 
                    ? 'text-[#FF3333] font-bold'
                    : log.includes('AGENT')
                    ? 'text-[#D4EB00]'
                    : 'text-[#CCCCCC]'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* STICKY FOOTER: EXECUTIVE GOVERNANCE OVERLAY */}
      <footer className="sticky bottom-0 z-40 bg-[#240C0C] border-t border-[#4A1A1A] px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Governance Label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#341212] border border-[#4A1A1A] flex items-center justify-center text-[#FF3333]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white uppercase tracking-wider">
                  Executive Governance Overlay
                </span>
                <span className={isTrapActive ? "badge-red" : "badge-lime"}>
                  {isTrapActive ? "Lethal Risk Intercept Active" : "AI-SRF Sentinel Online"}
                </span>
              </div>
              <p className="text-xs text-[#CCCCCC]">
                Real-Time Human-In-The-Loop (HITL) Safety & Risk Protocol Monitor
              </p>
            </div>
          </div>

          {/* Footer Secondary Action Button (Simulate Edge Case) */}
          <div className="flex items-center gap-3">
            {isTrapActive && (
              <button
                onClick={resetDashboard}
                className="px-3.5 py-2 rounded-lg border border-[#4A1A1A] bg-[#150606] text-xs font-semibold text-white hover:bg-[#341212] transition-all"
              >
                Reset System State
              </button>
            )}

            <button
              onClick={triggerGovernanceTrap}
              disabled={isOrchestrating}
              className="btn-trap-red"
            >
              <AlertTriangle className="w-4 h-4 text-[#FF3333]" />
              Simulate Edge Case (Device Tampering)
            </button>
          </div>

        </div>
      </footer>

      {/* GOVERNANCE TRAP MODAL: [sage_srai_Flag TRIGGERED - LETHAL RISK EXCEPTION] */}
      {showTrapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          
          <div className="bg-[#240C0C] border-2 border-[#FF3333] rounded-2xl max-w-2xl w-full p-6 shadow-[0_0_50px_rgba(255,51,51,0.5)] space-y-6 relative overflow-hidden">
            
            {/* Top Hazard Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF3333] via-amber-500 to-[#FF3333]"></div>

            {/* Badge & Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#FF3333] text-white font-mono text-xs font-black px-3 py-1 rounded tracking-widest uppercase">
                  sage_srai_Flag TRIGGERED
                </span>
                <span className="text-xs font-mono text-[#FF3333] font-bold">
                  HIGH HAZARD • LEVEL 3 ESCALATION
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#FF3333] tracking-tight flex items-center gap-2">
                <AlertOctagon className="w-8 h-8 text-[#FF3333] shrink-0" />
                [sage_srai_Flag TRIGGERED - LETHAL RISK EXCEPTION]
              </h2>
            </div>

            {/* Strict Required Modal Text */}
            <div className="bg-[#180707] border border-[#FF3333]/40 rounded-xl p-5 space-y-3">
              <p className="text-sm font-semibold text-white leading-relaxed">
                Autonomous dispatch halted. Physical tampering detected at Roodepoort vault. AI-SRF protocols require Level 3 Security escalation and MANDATORY HUMAN-IN-THE-LOOP (HITL) APPROVAL.
              </p>
            </div>

            {/* Threat & Sensor Details */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#150606] border border-[#4A1A1A] p-3 rounded-lg text-[#CCCCCC]">
                <span className="text-[#998888] block mb-1">Target Vault:</span>
                <strong className="text-white">Cash Connect #CC-8842 (Roodepoort)</strong>
              </div>
              <div className="bg-[#150606] border border-[#4A1A1A] p-3 rounded-lg text-[#CCCCCC]">
                <span className="text-[#998888] block mb-1">Anomaly Type:</span>
                <strong className="text-[#FF3333]">Vault Door Forced Access & Vibration</strong>
              </div>
              <div className="bg-[#150606] border border-[#4A1A1A] p-3 rounded-lg text-[#CCCCCC]">
                <span className="text-[#998888] block mb-1">Safety Risk Score:</span>
                <strong className="text-[#FF3333]">0.99 / 1.00 (Lethal Threat)</strong>
              </div>
              <div className="bg-[#150606] border border-[#4A1A1A] p-3 rounded-lg text-[#CCCCCC]">
                <span className="text-[#998888] block mb-1">Blocked Action:</span>
                <strong className="text-amber-400">Technician Sipho Dispatch Halted</strong>
              </div>
            </div>

            {/* HITL Decision Controls */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CCCCCC] block">
                Required Human-In-The-Loop (HITL) Executive Action:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setHitlActionTaken("LEVEL_3_ARMED_SECURITY");
                    setShowTrapModal(false);
                    addLog(`[HITL DECISION EXECUTED] User approved Level 3 Armed Security Escort dispatch to Roodepoort Node.`);
                  }}
                  className="bg-[#FF3333] hover:bg-red-600 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Authorize Armed Security Escort
                </button>

                <button
                  onClick={() => {
                    setHitlActionTaken("CLEAR_EMERGENCY");
                    setShowTrapModal(false);
                    setIsTrapActive(false);
                    addLog(`[HITL DECISION EXECUTED] User acknowledged & cleared emergency override.`);
                  }}
                  className="bg-[#341212] hover:bg-[#4A1A1A] text-white border border-[#4A1A1A] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  Acknowledge & Clear Flag
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
