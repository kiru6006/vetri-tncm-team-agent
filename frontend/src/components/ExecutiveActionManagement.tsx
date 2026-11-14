import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  INITIAL_EXECUTIVE_INSTRUCTIONS,
  ExecutiveInstruction,
  GOVERNANCE_ISSUES_MASTER,
  GovernanceIssue
} from '../data/governanceData';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Plus,
  Filter,
  Search,
  ChevronRight,
  Shield,
  FileText,
  UserCheck,
  Check,
  MessageSquare,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  X,
  ExternalLink,
  Flame,
  CheckCircle,
  Eye,
  Calendar
} from 'lucide-react';

interface ExecutiveActionManagementProps {
  onOpenCopilot?: (query: string) => void;
  onOpenMessage?: (officialEmail: string, issueRef: string) => void;
}

export const ExecutiveActionManagement: React.FC<ExecutiveActionManagementProps> = ({
  onOpenCopilot,
  onOpenMessage
}) => {
  const { language, activeRole, setCurrentRoute } = useAuthStore();
  const isTa = language === 'ta';

  // Persistence in localStorage
  const [instructions, setInstructions] = useState<ExecutiveInstruction[]>(() => {
    try {
      const saved = localStorage.getItem('vetri_executive_instructions_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_EXECUTIVE_INSTRUCTIONS;
  });

  const [selectedInstruction, setSelectedInstruction] = useState<ExecutiveInstruction | null>(
    instructions[0] || null
  );

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Direction Modal State
  const [directionModalOpen, setDirectionModalOpen] = useState(false);
  const [selectedIssueForDirection, setSelectedIssueForDirection] = useState<GovernanceIssue | null>(null);
  const [newInstructionText, setNewInstructionText] = useState('');
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM'>('CRITICAL');
  const [newDeadline, setNewDeadline] = useState('2026-11-25');
  const [requestExplanation, setRequestExplanation] = useState(true);

  // Update Progress Modal State
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [progressUpdateText, setProgressUpdateText] = useState('');
  const [newProgressPct, setNewProgressPct] = useState(50);

  // Save to localStorage whenever instructions change
  useEffect(() => {
    try {
      localStorage.setItem('vetri_executive_instructions_v2', JSON.stringify(instructions));
    } catch {
      // ignore
    }
  }, [instructions]);

  // Handle filtering
  const filteredInstructions = instructions.filter((inst) => {
    if (filterStatus !== 'ALL' && inst.status !== filterStatus) return false;
    if (filterPriority !== 'ALL' && inst.priority !== filterPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = inst.issueTitle.toLowerCase().includes(q);
      const matchOwner = inst.responsibleOwner.nameEn.toLowerCase().includes(q);
      const matchText = inst.instructionTextEn.toLowerCase().includes(q);
      return matchTitle || matchOwner || matchText;
    }
    return true;
  });

  // Action: Issue Direction
  const handleCreateDirection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssueForDirection || !newInstructionText.trim()) return;

    const newId = `DIR-CM-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry: ExecutiveInstruction = {
      id: newId,
      issueId: selectedIssueForDirection.id,
      issueTitle: selectedIssueForDirection.titleEn,
      issuingAuthority: "Hon'ble Chief Minister of Tamil Nadu",
      responsibleOwner: {
        id: selectedIssueForDirection.responsibleOfficial.id,
        nameEn: selectedIssueForDirection.responsibleOfficial.nameEn,
        designationEn: selectedIssueForDirection.responsibleOfficial.designationEn,
        email: selectedIssueForDirection.responsibleOfficial.email,
        phone: selectedIssueForDirection.responsibleOfficial.phone
      },
      departmentEn: selectedIssueForDirection.departmentEn,
      instructionTextEn: newInstructionText,
      instructionTextTa: newInstructionText,
      priority: newPriority,
      createdDate: new Date().toLocaleString('en-US', { hour12: true }),
      deadline: newDeadline,
      acknowledgment: {
        acknowledged: false
      },
      status: 'ISSUED',
      statusHistory: [
        {
          status: 'ISSUED',
          timestamp: new Date().toLocaleString('en-US', { hour12: true }),
          actor: 'Chief Minister Office (CMO)',
          notes: requestExplanation
            ? 'Executive direction issued with formal explanation requested within 48 hours.'
            : 'Executive direction issued for immediate milestone execution.'
        }
      ],
      evidenceAttachments: selectedIssueForDirection.evidenceAttachments.map((att) => ({
        name: att.name,
        type: att.type,
        timestamp: att.date,
        verificationStatus: 'PENDING'
      })),
      progressPct: 10
    };

    const updated = [newEntry, ...instructions];
    setInstructions(updated);
    setSelectedInstruction(newEntry);
    setDirectionModalOpen(false);
    setNewInstructionText('');
    setSelectedIssueForDirection(null);
  };

  // Action: Acknowledge Instruction (Official persona)
  const handleAcknowledge = (instructionId: string) => {
    const updated = instructions.map((inst) => {
      if (inst.id === instructionId) {
        return {
          ...inst,
          status: 'ACKNOWLEDGED' as const,
          acknowledgment: {
            acknowledged: true,
            acknowledgedAt: new Date().toLocaleString('en-US', { hour12: true }),
            acknowledgedBy: `${inst.responsibleOwner.nameEn} (${inst.responsibleOwner.designationEn})`,
            comments: 'Executive directive received and noted. Field teams instructed for immediate compliance.'
          },
          statusHistory: [
            ...inst.statusHistory,
            {
              status: 'ACKNOWLEDGED',
              timestamp: new Date().toLocaleString('en-US', { hour12: true }),
              actor: inst.responsibleOwner.nameEn,
              notes: 'Official CUG acknowledgment recorded.'
            }
          ]
        };
      }
      return inst;
    });
    setInstructions(updated);
    if (selectedInstruction?.id === instructionId) {
      setSelectedInstruction(updated.find((i) => i.id === instructionId) || null);
    }
  };

  // Action: Submit Progress
  const handleAddProgress = () => {
    if (!selectedInstruction || !progressUpdateText.trim()) return;

    const newStatus = newProgressPct === 100 ? ('RESOLUTION_SUBMITTED' as const) : ('IN_PROGRESS' as const);

    const updated = instructions.map((inst) => {
      if (inst.id === selectedInstruction.id) {
        return {
          ...inst,
          progressPct: newProgressPct,
          status: newStatus,
          statusHistory: [
            ...inst.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toLocaleString('en-US', { hour12: true }),
              actor: `${inst.responsibleOwner.nameEn}`,
              notes: progressUpdateText
            }
          ]
        };
      }
      return inst;
    });
    setInstructions(updated);
    setSelectedInstruction(updated.find((i) => i.id === selectedInstruction.id) || null);
    setProgressModalOpen(false);
    setProgressUpdateText('');
  };

  // Action: Verify Evidence & Close (CM / Chief Secretary)
  const handleVerifyAndClose = (instructionId: string) => {
    const updated = instructions.map((inst) => {
      if (inst.id === instructionId) {
        return {
          ...inst,
          status: 'CLOSED' as const,
          progressPct: 100,
          closureApproval: {
            approvedBy: "Hon'ble Chief Minister of Tamil Nadu",
            approvedAt: new Date().toLocaleString('en-US', { hour12: true }),
            verificationNotes: 'Independent audit report verified on-ground compliance and restored citizen services.'
          },
          statusHistory: [
            ...inst.statusHistory,
            {
              status: 'VERIFIED',
              timestamp: new Date().toLocaleString('en-US', { hour12: true }),
              actor: 'Quality & Audit Inspection Team',
              notes: 'Geotagged photographic and financial proof verified.'
            },
            {
              status: 'CLOSED',
              timestamp: new Date().toLocaleString('en-US', { hour12: true }),
              actor: 'CM Office',
              notes: 'Direction resolved and signed off.'
            }
          ]
        };
      }
      return inst;
    });
    setInstructions(updated);
    if (selectedInstruction?.id === instructionId) {
      setSelectedInstruction(updated.find((i) => i.id === instructionId) || null);
    }
  };

  // Action: Reopen / Escalate
  const handleEscalate = (instructionId: string) => {
    const updated = instructions.map((inst) => {
      if (inst.id === instructionId) {
        return {
          ...inst,
          status: 'ESCALATED' as const,
          priority: 'CRITICAL' as const,
          statusHistory: [
            ...inst.statusHistory,
            {
              status: 'ESCALATED',
              timestamp: new Date().toLocaleString('en-US', { hour12: true }),
              actor: 'CM Office',
              notes: 'Delayed milestone escalated to Chief Secretary and Department Secretary for daily review.'
            }
          ]
        };
      }
      return inst;
    });
    setInstructions(updated);
    if (selectedInstruction?.id === instructionId) {
      setSelectedInstruction(updated.find((i) => i.id === instructionId) || null);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner with Demo Simulation Label */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-700 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isTa ? 'முதல்வர் உத்தரவு மேலாண்மை' : 'Executive Action Management'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              SIMULATED DEMO ENVIRONMENT
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isTa ? 'முதல்வர் நேரடி உத்தரவுகள் & கண்காணிப்பு' : 'CM Directives & Action Execution Tracker'}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {isTa
              ? 'மாநில அளவிலான முக்கிய பிரச்சனைகளுக்கு மாண்புமிகு முதலமைச்சர் அவர்கள் பிறப்பிக்கும் உத்தரவுகள், பொறுப்பாளர் ஒப்புதல் மற்றும் முடிவு தணிக்கை தளம்.'
              : 'End-to-end accountability workflow: Issue selection, direct instruction issuance, official CUG acknowledgment, milestone tracking, and verified closure.'}
          </p>
        </div>

        {/* Issue Direction Button */}
        <button
          onClick={() => {
            setSelectedIssueForDirection(GOVERNANCE_ISSUES_MASTER[0]);
            setNewInstructionText(GOVERNANCE_ISSUES_MASTER[0].recommendedActionEn);
            setDirectionModalOpen(true);
          }}
          className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/15 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isTa ? 'புதிய முதல்வர் உத்தரவு பிறப்பிக்க' : 'Issue New CM Direction'}</span>
        </button>
      </div>

      {/* Lifecycle Stage Visualizer */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4 overflow-x-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
          {isTa ? 'உத்தரவு வாழ்க்கை சுழற்சி நிலை' : 'Statutory Executive Workflow Lifecycle'}
        </div>
        <div className="flex items-center min-w-[700px] justify-between text-xs font-semibold">
          {[
            { step: '1', title: 'Issue Identified', active: true },
            { step: '2', title: 'Evidence Reviewed', active: true },
            { step: '3', title: 'CM Direction Issued', active: true },
            { step: '4', title: 'Official Acknowledged', active: selectedInstruction?.status !== 'ISSUED' },
            { step: '5', title: 'Action In Progress', active: ['IN_PROGRESS', 'RESOLUTION_SUBMITTED', 'VERIFIED', 'CLOSED'].includes(selectedInstruction?.status || '') },
            { step: '6', title: 'Evidence Verified', active: ['VERIFIED', 'CLOSED'].includes(selectedInstruction?.status || '') },
            { step: '7', title: 'Closed & Audited', active: selectedInstruction?.status === 'CLOSED' },
          ].map((stage, idx, arr) => (
            <React.Fragment key={stage.step}>
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    stage.active
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {stage.step}
                </span>
                <span className={stage.active ? 'text-white' : 'text-slate-500'}>
                  {stage.title}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    stage.active ? 'bg-amber-400/50' : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Search, Filter & Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Instructions List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filters */}
          <div className="glass-card rounded-2xl border border-slate-800 p-3.5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isTa ? "உத்தரவுகளைத் தேடுக..." : "Search directions, officers, issues..."}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="ISSUED">Issued</option>
                <option value="ACKNOWLEDGED">Acknowledged</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLUTION_SUBMITTED">Resolution Submitted</option>
                <option value="CLOSED">Closed</option>
                <option value="ESCALATED">Escalated</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
              </select>

              <span className="text-[11px] font-mono text-slate-400">
                {filteredInstructions.length} items
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredInstructions.map((inst) => {
              const isSelected = selectedInstruction?.id === inst.id;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstruction(inst)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-amber-500/60 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700">
                      {inst.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inst.status === 'CLOSED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : inst.status === 'IN_PROGRESS'
                          ? 'bg-blue-500/20 text-blue-300'
                          : inst.status === 'ESCALATED'
                          ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2 mb-1.5">
                    {inst.issueTitle}
                  </h4>

                  <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">
                    {inst.instructionTextEn}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3 h-3 text-amber-400" />
                      <span className="truncate max-w-[140px] text-slate-300 font-medium">
                        {inst.responsibleOwner.nameEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-slate-300">
                      <span>Due:</span>
                      <span className="text-amber-400">{inst.deadline}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        inst.progressPct === 100 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${inst.progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Instruction Dossier (7 cols) */}
        <div className="lg:col-span-7">
          {selectedInstruction ? (
            <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {selectedInstruction.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Issued: {selectedInstruction.createdDate}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-1.5">
                    {selectedInstruction.issueTitle}
                  </h2>
                </div>

                {/* Priority Badge */}
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-bold self-start sm:self-auto ${
                    selectedInstruction.priority === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {selectedInstruction.priority} PRIORITY
                </span>
              </div>

              {/* Responsible Authority Details Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Accountable Officer & Department</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {selectedInstruction.responsibleOwner.nameEn}
                    </div>
                    <div className="text-xs text-slate-400">
                      {selectedInstruction.responsibleOwner.designationEn} • {selectedInstruction.departmentEn}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                      {selectedInstruction.responsibleOwner.email} • {selectedInstruction.responsibleOwner.phone}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenMessage) {
                        onOpenMessage(
                          selectedInstruction.responsibleOwner.email,
                          selectedInstruction.id
                        );
                      } else {
                        setCurrentRoute('messages');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Message Official</span>
                  </button>
                </div>
              </div>

              {/* Official Instruction Text */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Chief Minister Direction Text</div>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedInstruction.instructionTextEn}
                </div>
              </div>

              {/* Acknowledgment Status Card */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Officer Acknowledgment</div>
                  {selectedInstruction.acknowledgment.acknowledged ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Acknowledged</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Pending Acknowledgment</span>
                    </span>
                  )}
                </div>

                {selectedInstruction.acknowledgment.acknowledged ? (
                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="italic text-slate-200">
                      "{selectedInstruction.acknowledgment.comments}"
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      By: {selectedInstruction.acknowledgment.acknowledgedBy} at {selectedInstruction.acknowledgment.acknowledgedAt}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-slate-400">
                      Officer has not yet recorded official acknowledgment.
                    </p>
                    <button
                      onClick={() => handleAcknowledge(selectedInstruction.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Acknowledge as Officer
                    </button>
                  </div>
                )}
              </div>

              {/* Status History & Audit Log */}
              <div className="space-y-3">
                <div className="text-[10px] uppercase font-bold text-slate-400">Execution Audit Trail & Updates</div>
                <div className="relative pl-6 space-y-4 border-l-2 border-slate-800">
                  {selectedInstruction.statusHistory.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950" />
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{step.status}</span>
                        <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{step.actor}</div>
                      <p className="text-xs text-slate-300 mt-0.5">{step.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Attachments */}
              {selectedInstruction.evidenceAttachments.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Evidence & Proof Documents</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedInstruction.evidenceAttachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="truncate text-slate-200">{att.name}</span>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            att.verificationStatus === 'VERIFIED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {att.verificationStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons for CM / CS */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setProgressModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                >
                  Record Milestone Progress
                </button>

                {selectedInstruction.status !== 'CLOSED' && (
                  <>
                    <button
                      onClick={() => handleEscalate(selectedInstruction.id)}
                      className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Escalate Delay
                    </button>
                    <button
                      onClick={() => handleVerifyAndClose(selectedInstruction.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors cursor-pointer"
                    >
                      Verify Evidence & Close
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
              Select an executive instruction to view audit dossier.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Issue New CM Direction */}
      {directionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-slate-700 max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {isTa ? 'முதல்வர் நேரடி உத்தரவு வரைவு' : 'Draft Chief Minister Executive Direction'}
                </h3>
              </div>
              <button
                onClick={() => setDirectionModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDirection} className="space-y-4 text-xs">
              {/* Linked Issue Selector */}
              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Triggering Governance Issue:</label>
                <select
                  value={selectedIssueForDirection?.id}
                  onChange={(e) => {
                    const iss = GOVERNANCE_ISSUES_MASTER.find((i) => i.id === e.target.value);
                    if (iss) {
                      setSelectedIssueForDirection(iss);
                      setNewInstructionText(iss.recommendedActionEn);
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  {GOVERNANCE_ISSUES_MASTER.map((iss) => (
                    <option key={iss.id} value={iss.id}>
                      {iss.district} • {iss.titleEn} (₹{iss.financialImpactCr || 0} Cr)
                    </option>
                  ))}
                </select>
              </div>

              {/* Responsible Officer Card */}
              {selectedIssueForDirection && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Designated Responsible Authority:</div>
                    <div className="text-white font-bold">{selectedIssueForDirection.responsibleOfficial.nameEn}</div>
                    <div className="text-slate-400 text-[11px]">{selectedIssueForDirection.responsibleOfficial.designationEn}</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-slate-800 font-mono text-[10px] text-amber-400 font-bold">
                    {selectedIssueForDirection.responsibleOfficial.cadre}
                  </span>
                </div>
              )}

              {/* Instruction Textarea */}
              <div>
                <label className="block text-slate-400 font-bold mb-1">Official Directive Text (CM Mandate):</label>
                <textarea
                  rows={4}
                  value={newInstructionText}
                  onChange={(e) => setNewInstructionText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-amber-400 leading-relaxed"
                  placeholder="Specify clear, time-bound deliverables, statutory officers, and expected outcomes..."
                  required
                />
              </div>

              {/* Priority & Deadline */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Priority:</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL (Immediate)</option>
                    <option value="HIGH">HIGH (48 Hours)</option>
                    <option value="MEDIUM">MEDIUM (7 Days)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Target Deadline:</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Explanation Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={requestExplanation}
                  onChange={(e) => setRequestExplanation(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-400 focus:ring-0"
                />
                <span className="text-slate-300 text-xs">
                  Request formal explanation for project delay / supply shortage
                </span>
              </label>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDirectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  Issue Direction Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record Milestone Progress */}
      {progressModalOpen && selectedInstruction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-slate-700 max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Record Milestone Progress</h3>
              <button
                onClick={() => setProgressModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Progress Percentage ({newProgressPct}%):
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newProgressPct}
                  onChange={(e) => setNewProgressPct(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Progress Notes / Resolution Summary:
                </label>
                <textarea
                  rows={4}
                  value={progressUpdateText}
                  onChange={(e) => setProgressUpdateText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-amber-400"
                  placeholder="Detail field measurements, land awards passed, stocks replenished, or tenders awarded..."
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProgressModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProgress}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                >
                  Save Milestone Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

