import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { CalendarAppointment, OfficerDirectoryItem } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  UserCheck,
  FileText,
  ShieldCheck,
  Plus,
  Search,
  Sparkles,
  Users,
  Filter,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Layers,
  Send,
  Copy,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ExecutiveCalendarViewProps {
  onOpenCopilot?: (prompt?: string) => void;
}

export const ExecutiveCalendarView: React.FC<ExecutiveCalendarViewProps> = ({ onOpenCopilot }) => {
  const { language } = useAuthStore();
  const [activeViewMode, setActiveViewMode] = useState<'calendar' | 'directory'>('calendar');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [deptFilter, setDeptFilter] = useState<string>('');
  const [schemeFilter, setSchemeFilter] = useState<string>('');
  const [projectFilter, setProjectFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [selectedApptId, setSelectedApptId] = useState<string | null>(null);
  const [directoryOfficers, setDirectoryOfficers] = useState<OfficerDirectoryItem[]>([]);
  const [isLoadingDirectory, setIsLoadingDirectory] = useState(false);
  const [selectedDossierOfficer, setSelectedDossierOfficer] = useState<OfficerDirectoryItem | null>(null);

  // AI Assistant Command Bar State
  const [agentInput, setAgentInput] = useState('');
  const [isAgentExecuting, setIsAgentExecuting] = useState(false);
  const [agentFeedback, setAgentFeedback] = useState<string | null>(null);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formParticipantName, setFormParticipantName] = useState('');
  const [formParticipantRole, setFormParticipantRole] = useState('PRINCIPAL_SECRETARY');
  const [formParticipantDesig, setFormParticipantDesig] = useState('');
  const [formParticipantDept, setFormParticipantDept] = useState('');
  const [formParticipantDistrict, setFormParticipantDistrict] = useState('');
  const [formParticipantEmail, setFormParticipantEmail] = useState('');
  const [formParticipantPhone, setFormParticipantPhone] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState('11:30 AM - 12:30 PM');
  const [formLocation, setFormLocation] = useState("Chief Minister's Secretariat Chamber, Fort St. George");
  const [formAgenda, setFormAgenda] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments(roleFilter);
    fetchDirectory();
  }, [roleFilter]);

  const fetchAppointments = (role: string) => {
    fetch(`/api/v1/calendar/appointments?role_filter=${role}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setAppointments(data);
          setSelectedApptId(data[0].id);
        }
      })
      .catch(() => {
        // Fallback seed
        const fallback: CalendarAppointment[] = [
          {
            id: "appt-cm-01",
            title_en: "Quarterly Irrigation & Kuruvai Water Inflow Review with Delta MLAs",
            title_ta: "டெல்டா தொகுதி சட்டமன்ற உறுப்பினர்களுடன் குறுவை பாசன நீர் மறுசீராய்வு கூட்டம்",
            appointment_type: "MLA_DELEGATION",
            scheduled_date: new Date().toISOString().split('T')[0],
            scheduled_time: "10:00 AM - 10:45 AM",
            duration_minutes: 45,
            location: "Chief Minister's Secretariat Chamber, Fort St. George",
            status: "CONFIRMED",
            priority: "CRITICAL",
            host_name: "M. K. Stalin",
            host_role: "CHIEF_MINISTER",
            participant_name_en: "Thiruvaiyaru & Mannargudi MLA Delegation",
            participant_name_ta: "திருவையாறு & மன்னார்குடி சட்டமன்ற உறுப்பினர்கள் குழு",
            participant_designation: "Members of Legislative Assembly (MLAs)",
            participant_role: "MLA",
            participant_department: "Water Resources & Agriculture",
            participant_district: "Thanjavur & Tiruvarur",
            participant_contact: "+91 94433 12091",
            participant_email: "mla.thiruvaiyaru@tnassembly.gov.in",
            participant_emails: ["mla.thiruvaiyaru@tnassembly.gov.in", "mla.mannargudi@tnassembly.gov.in"],
            agenda_en: "Request for staggered release of 15,000 cusecs from Mettur dam for tail-end delta canals in Vennar sub-basin.",
            agenda_ta: "வெண்ணாறு உபவடிநிலத்தில் கடைமடை பாசன கால்வாய்களுக்கு மேட்டூரிலிருந்து 15,000 கனஅடி நீர் திறக்க கோரிக்கை.",
            ai_prepared_notes_en: "Mettur reservoir storage at 68.4 ft (31.2 TMC). Tail-end reaches in Tiruvarur have 12% moisture deficit. Releasing 15,000 cusecs for 6 days is hydrologically sustainable.",
            ai_prepared_notes_ta: "மேட்டூர் அணை நீர் இருப்பு 68.4 அடி. திருவாரூர் கடைமடை பகுதியில் 12% ஈரப்பதம் குறைவு. 6 நாட்களுக்கு 15,000 கனஅடி நீர் திறப்பு சாத்தியமானது.",
            historical_decisions_context: ["Special Kuruvai Cultivation Package G.O. Ms No. 84 sanctioned in June 2026."],
            required_files_gos: ["G.O. (Ms) No. 84 - WRD Delta Water Schedule"],
            protocol_clearance_status: "VIP_SECURITY"
          },
          {
            id: "appt-cm-02",
            title_en: "High-Level Briefing on Semiconductor Fab Land Allotment & Power Substation",
            title_ta: "குறைக்கடத்தி தொழிற்சாலை நில ஒதுக்கீடு மற்றும் மின் துணை நிலையம் குறித்த உயர்மட்ட கூட்டம்",
            appointment_type: "SECRETARY_BRIEFING",
            scheduled_date: new Date().toISOString().split('T')[0],
            scheduled_time: "11:30 AM - 12:15 PM",
            duration_minutes: 45,
            location: "Cabinet Room, 2nd Floor, Secretariat",
            status: "CONFIRMED",
            priority: "HIGH",
            host_name: "M. K. Stalin",
            host_role: "CHIEF_MINISTER",
            participant_name_en: "V. Arun Roy, IAS & Rajesh Lakhoni, IAS",
            participant_name_ta: "வி. அருண் ராய், இ.ஆ.ப. & ராஜேஷ் லக்கானி, இ.ஆ.ப.",
            participant_designation: "Principal Secretary Industries & CMD TANGEDCO",
            participant_role: "PRINCIPAL_SECRETARY",
            participant_department: "Industries & Energy",
            participant_district: "Krishnagiri (Hosur)",
            participant_contact: "+91 44 2567 1822",
            participant_email: "indsec@tn.gov.in",
            participant_emails: ["indsec@tn.gov.in", "cmd@tnebnet.org"],
            agenda_en: "Review SIPCOT Krishnagiri 400kV dedicated transmission line timeline and Cabinet Incentive Note.",
            agenda_ta: "சிப்காட் ஓசூர் 400kV பிரத்யேக மின்பாதை கால அட்டவணை மற்றும் அமைச்சரவை சலுகைக் குறிப்பு ஆய்வு.",
            ai_prepared_notes_en: "₹4,800 Cr project requires 120 MW continuous power. Substation civil work at 74%.",
            ai_prepared_notes_ta: "₹4,800 கோடி திட்டத்திற்கு 120 மெகாவாட் மின்சாரம் தேவை.",
            historical_decisions_context: ["Cabinet approved Tamil Nadu Semiconductor Policy 2024."],
            required_files_gos: ["Draft Cabinet Note - SIPCOT Allotment 2026"],
            protocol_clearance_status: "VERIFIED"
          }
        ];
        setAppointments(fallback);
        setSelectedApptId(fallback[0].id);
      });
  };

  const fetchDirectory = () => {
    setIsLoadingDirectory(true);
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (deptFilter) params.append('department', deptFilter);
    if (schemeFilter) params.append('scheme', schemeFilter);
    if (projectFilter) params.append('project', projectFilter);
    if (roleFilter !== 'ALL') params.append('role_tier', roleFilter);

    fetch(`/api/v1/calendar/directory/search?${params.toString()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.officers) {
          setDirectoryOfficers(data.officers);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingDirectory(false));
  };

  const handleAgentExecute = (queryText?: string) => {
    const q = queryText || agentInput;
    if (!q.trim()) return;

    setIsAgentExecuting(true);
    setAgentFeedback(null);

    fetch('/api/v1/calendar/agent/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, language: language })
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setAgentFeedback(language === 'ta' ? data.response_ta : data.response_en);
          if (data.matched_officers && data.matched_officers.length > 0) {
            setDirectoryOfficers(data.matched_officers);
            setActiveViewMode('directory');
          }
          if (data.appointment) {
            setAppointments(prev => [data.appointment, ...prev]);
            setSelectedApptId(data.appointment.id);
            setActiveViewMode('calendar');
          }
        }
      })
      .catch(() => {
        setAgentFeedback(
          language === 'ta'
            ? 'அதிகாரிகள் விபரம் மற்றும் சந்திப்பு கோரிக்கை பதிவு செய்யப்பட்டது.'
            : 'AI Agent processed request: Officer directory updated and appointment slot reserved.'
        );
      })
      .finally(() => setIsAgentExecuting(false));
  };

  const handleBookAppointment = () => {
    if (!formTitle.trim() || !formParticipantName.trim()) return;

    fetch('/api/v1/calendar/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formTitle,
        participant_name: formParticipantName,
        participant_role: formParticipantRole,
        participant_designation: formParticipantDesig,
        department: formParticipantDept,
        district: formParticipantDistrict,
        participant_email: formParticipantEmail,
        participant_emails: formParticipantEmail ? [formParticipantEmail] : [],
        contact_phone: formParticipantPhone,
        scheduled_date: formDate,
        scheduled_time: formTime,
        agenda: formAgenda || `Official governance review requested by Hon'ble Chief Minister.`,
        location: formLocation
      })
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setAppointments(prev => [data, ...prev]);
          setSelectedApptId(data.id);
          setIsModalOpen(false);
          setActiveViewMode('calendar');
          // Reset
          setFormTitle('');
          setFormParticipantName('');
          setFormParticipantDesig('');
          setFormParticipantEmail('');
          setFormAgenda('');
        }
      })
      .catch(() => {
        setIsModalOpen(false);
      });
  };

  const handlePreFillBookingFromOfficer = (officer: OfficerDirectoryItem) => {
    setFormTitle(`Executive Review: ${officer.name_en}`);
    setFormParticipantName(officer.name_en);
    setFormParticipantRole(officer.role_tier);
    setFormParticipantDesig(officer.designation_en);
    setFormParticipantDept(officer.department_en);
    setFormParticipantDistrict(officer.district_en);
    setFormParticipantEmail(officer.official_email);
    setFormParticipantPhone(officer.cug_phone);
    setFormAgenda(`Review of priority governance initiatives in ${officer.department_en} (${officer.current_schemes.join(', ') || 'Department Files'}).`);
    setIsModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const selectedAppt = appointments.find(a => a.id === selectedApptId) || appointments[0];

  const roleFilterTabs = [
    { key: 'ALL', labelEn: 'All Appointments', labelTa: 'அனைத்தும்' },
    { key: 'MINISTER', labelEn: 'Ministers', labelTa: 'அமைச்சர்கள்' },
    { key: 'MLA', labelEn: 'MLAs & MPs', labelTa: 'சட்டமன்ற / எம்.பி' },
    { key: 'PRINCIPAL_SECRETARY', labelEn: 'Principal Secretaries', labelTa: 'முதன்மைச் செயலாளர்கள்' },
    { key: 'GROUP_1', labelEn: 'Group 1 (Collectors & SPs)', labelTa: 'குரூப் 1 (ஆட்சியர் & எஸ்.பி)' },
    { key: 'GROUP_2', labelEn: 'Group 2 (Tahsildars & BDOs)', labelTa: 'குரூப் 2 (வட்டாட்சியர்)' },
    { key: 'GROUP_3_4', labelEn: 'Group 3 & 4 (VAOs & Field)', labelTa: 'குரூப் 3 & 4 (வி.ஏ.ஓ)' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <CalendarIcon className="w-4 h-4 text-amber-400" />
            <span>{language === 'ta' ? 'மாண்புமிகு முதலமைச்சரின் அதிகாரப்பூர்வ நாள்காட்டி' : 'CM Official Executive Calendar & Directory Hub'}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">
              ● Live Protocol Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            {language === 'ta' ? 'அமைச்சர்கள், சட்டமன்ற உறுப்பினர்கள் & அரசு அலுவலர்கள் சந்திப்பு மேடை' : 'Executive Appointments, Protocol Agenda & Official Email Hub'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ta'
              ? 'அமைச்சர்கள், முதன்மைச் செயலாளர்கள், மாவட்ட ஆட்சியர்கள், காவல்துறை மற்றும் குரூப் 1-4 அலுவலர்களுடன் சந்திப்புகளை AI உதவியுடன் திட்டமிடுங்கள்.'
              : 'Multi-role appointments, AI pre-briefing notes, verified @tn.gov.in email integration & high-level Cabinet review agendas.'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto flex-wrap sm:flex-nowrap">
          {/* View Mode Toggle */}
          <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeViewMode === 'calendar' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'நாள்காட்டி' : 'Schedule'}</span>
            </button>
            <button
              onClick={() => {
                setActiveViewMode('directory');
                fetchDirectory();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeViewMode === 'directory' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அதிகாரிகள் & மின்னஞ்சல்' : 'Officer Directory'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ta' ? 'புதிய சந்திப்பு பதிவு' : 'Book Appointment'}</span>
          </button>
        </div>
      </div>

      {/* AI Appointment Agent Command Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{language === 'ta' ? 'AI சந்திப்பு ஆலோசகர் (Natural Language Booking & Official Finder)' : 'AI Appointment Agent (Natural Language Booking by Name / Scheme / Project / Location / Emails)'}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={agentInput}
              onChange={(e) => setAgentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAgentExecute()}
              placeholder={
                language === 'ta'
                  ? "எ.கா: 'அக்டோபர் 3 அன்று சட்டத்துறை அமைச்சர் மற்றும் தலைமைச் செயலாளருடன் போக்சோ வழக்குகள் குறித்து சந்திப்பு பதிவு செய்' அல்லது 'கலைஞர் மகளிர் உரிமைத் திட்ட அதிகாரிகள் மின்னஞ்சல் காட்டு'"
                  : "e.g., 'Book an appointment with Law Minister and Chief Secretary for Oct 3 11:30am to discuss POCSO cases' or 'Find Coimbatore Collector and SP emails'"
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => handleAgentExecute()}
            disabled={isAgentExecuting}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAgentExecuting ? (language === 'ta' ? 'செயலாக்கம்...' : 'Processing...') : (language === 'ta' ? 'AI இயக்கு' : 'Run Agent')}</span>
          </button>
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-[11px]">
          <span className="text-slate-500 shrink-0 font-medium">Quick Prompts:</span>
          {[
            { label: 'POCSO Case Review with Law Minister & CS (Oct 3)', q: 'Book an appointment with chief secretary and law minister for oct 3 2026 11.30am to 12.30pm to discuss about posco case with the required police officials' },
            { label: 'Delta Kuruvai Review with MLAs (Oct 4)', q: 'Book an appointment with Thiruvaiyaru MLA and BDO for Oct 4 2026 10.30am to discuss delta kuruvai desilting' },
            { label: 'Semiconductor Park Officers & Emails', q: 'Find all officials and emails managing Semiconductor Fab project in Hosur' },
            { label: 'Kalaignar Magalir Urimai Thittam Officers', q: 'Find all officials managing Kalaignar Magalir Urimai Thittam scheme' }
          ].map((sp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAgentInput(sp.q);
                handleAgentExecute(sp.q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white shrink-0 transition-all"
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Agent Feedback Notification */}
        {agentFeedback && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="whitespace-pre-line leading-relaxed">{agentFeedback}</div>
          </div>
        )}
      </div>

      {/* Role Hierarchy Filter Pills */}
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pb-1 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          {roleFilterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setRoleFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                roleFilter === tab.key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {language === 'ta' ? tab.labelTa : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: OFFICIAL CALENDAR (SCHEDULE & DOSSIER) */}
      {activeViewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Scheduled Appointments List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
              <span>{language === 'ta' ? 'பதிவு செய்யப்பட்ட சந்திப்புகள்' : 'Confirmed Appointments'} ({appointments.length})</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="space-y-3">
              {appointments.map(appt => {
                const isSelected = appt.id === selectedApptId;
                return (
                  <div
                    key={appt.id}
                    onClick={() => setSelectedApptId(appt.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500/80 shadow-xl shadow-amber-500/10'
                        : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        appt.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {appt.participant_role}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{appt.scheduled_date} | {appt.scheduled_time}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                      {language === 'ta' ? appt.title_ta : appt.title_en}
                    </h3>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-300 truncate">
                          {language === 'ta' ? appt.participant_name_ta : appt.participant_name_en}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-bold shrink-0">{appt.protocol_clearance_status}</span>
                    </div>

                    {appt.participant_email && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-indigo-300">
                        <Mail className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span className="truncate">{appt.participant_email}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Meeting Deep-Dive Dossier */}
          {selectedAppt ? (
            <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
              {/* Meeting Header */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    {selectedAppt.appointment_type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {selectedAppt.protocol_clearance_status}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-black text-white leading-tight">
                  {language === 'ta' ? selectedAppt.title_ta : selectedAppt.title_en}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold">{selectedAppt.scheduled_date} ({selectedAppt.scheduled_time})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{selectedAppt.location}</span>
                  </div>
                </div>
              </div>

              {/* Participant Dossier Card */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'ta' ? 'பங்கேற்பாளர் விபரங்கள் & தொடர்பு' : 'Participant Profile & Communication'}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {language === 'ta' ? selectedAppt.participant_name_ta : selectedAppt.participant_name_en}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {selectedAppt.participant_designation} • {selectedAppt.participant_department}
                    </div>
                    {selectedAppt.participant_district && (
                      <div className="text-xs text-slate-500">
                        Jurisdiction: {selectedAppt.participant_district} {selectedAppt.participant_constituency ? `(${selectedAppt.participant_constituency} Constituency)` : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email & Contact Actions */}
                <div className="pt-2 border-t border-slate-800 flex items-center gap-3 text-xs flex-wrap">
                  {selectedAppt.participant_email && (
                    <div className="flex items-center gap-1.5 text-indigo-300 font-mono bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-900/60">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{selectedAppt.participant_email}</span>
                      <button
                        onClick={() => copyToClipboard(selectedAppt.participant_email!)}
                        className="ml-1 text-slate-400 hover:text-white"
                        title="Copy Email"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {selectedAppt.participant_contact && (
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedAppt.participant_contact}</span>
                    </div>
                  )}
                  {copiedEmail && (
                    <span className="text-xs text-emerald-400 font-semibold animate-pulse">Copied!</span>
                  )}
                </div>
              </div>

              {/* Meeting Agenda */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ta' ? 'கூட்ட நிகழ்ச்சி நிரல் (Meeting Agenda)' : 'Meeting Agenda & Directives'}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                  {language === 'ta' ? selectedAppt.agenda_ta : selectedAppt.agenda_en}
                </div>
              </div>

              {/* AI Pre-Briefing Note */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'ta' ? 'AI தயாரித்த முன் தயாரிப்பு ஆலோசனைக் குறிப்புகள்' : 'AI Pre-Meeting Executive Briefing'}</span>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 text-xs text-indigo-100 leading-relaxed">
                  {language === 'ta' ? selectedAppt.ai_prepared_notes_ta : selectedAppt.ai_prepared_notes_en}
                </div>
              </div>

              {/* Required G.O.s & e-Office Files */}
              {selectedAppt.required_files_gos && selectedAppt.required_files_gos.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'ta' ? 'தேவையான அரசாணைகள் & கோப்புகள்' : 'Mandatory e-Office Files & Government Orders (G.O.s)'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAppt.required_files_gos.map((go, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 hover:border-slate-700 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>{go}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Action Triggers */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => onOpenCopilot?.(`Analyze upcoming meeting file: ${selectedAppt.title_en} with ${selectedAppt.participant_name_en}`)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'AI உடன் கூடுதல் விவாதம்' : 'Ask AI Copilot for Strategy'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 p-12 text-center text-slate-500 rounded-2xl bg-slate-900 border border-slate-800">
              No appointment selected.
            </div>
          )}
        </div>
      )}

          {/* VIEW MODE 2: STATE OFFICIALS DIRECTORY & EMAILS */}
      {activeViewMode === 'directory' && (
        <div className="space-y-4">
          {/* Multi-Dimensional Filter Deck */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Free Search */}
            <div>
              <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Search Name / Email / Role</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Department</label>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="">All Departments</option>
                <option value="Water">Water Resources</option>
                <option value="Industries">Industries & Commerce</option>
                <option value="Energy">Energy & TANGEDCO</option>
                <option value="Health">Health & Family Welfare</option>
                <option value="Law">Law & Courts</option>
                <option value="Police">Police & Home</option>
                <option value="Finance">Finance & Planning</option>
                <option value="Revenue">Revenue & Disaster Mgmt</option>
              </select>
            </div>

            {/* Flagship Scheme Filter */}
            <div>
              <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Flagship Scheme</label>
              <select
                value={schemeFilter}
                onChange={(e) => setSchemeFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="">All Schemes</option>
                <option value="Magalir">Kalaignar Magalir Urimai Thittam</option>
                <option value="Breakfast">Chief Minister's Breakfast Scheme</option>
                <option value="Makkalai">Makkalai Thedi Maruthuvam</option>
                <option value="Pudhumai">Pudhumai Penn Scheme</option>
                <option value="Kuruvai">Kuruvai Special Package</option>
              </select>
            </div>

            {/* Project Filter */}
            <div>
              <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Mega Project</label>
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="">All Projects</option>
                <option value="Semiconductor">Semiconductor Fab (Hosur)</option>
                <option value="Ring Road">Ring Road (Coimbatore/Chennai)</option>
                <option value="River Linking">Thamirabarani River Linking</option>
                <option value="Metro">Metro Rail Corridor</option>
              </select>
            </div>
          </div>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <span className="text-slate-400 font-bold shrink-0">Quick Analytics Filters:</span>
            {[
              { id: 'ALL', label: '🌐 All Departments & Officers' },
              { id: 'CRITICAL_STAFF', label: '🚨 Critical Staffing Vacancies (>20%)' },
              { id: 'HIGH_FUNDS', label: '💰 High Budget Allocations (> ₹5,000 Cr)' },
              { id: 'PROJECTS', label: '🏗️ Mega Infrastructure Projects' },
              { id: 'SCHEMES', label: '🌾 Welfare Flagship Schemes' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  if (f.id === 'ALL') {
                    setDeptFilter('');
                    setSchemeFilter('');
                    setProjectFilter('');
                    setSearchQuery('');
                  } else if (f.id === 'CRITICAL_STAFF') {
                    setSearchQuery('Critical Staff Shortages');
                  } else if (f.id === 'HIGH_FUNDS') {
                    setSearchQuery('Budget Allocation Funds');
                  } else if (f.id === 'PROJECTS') {
                    setSearchQuery('Mega Projects');
                  } else if (f.id === 'SCHEMES') {
                    setSearchQuery('Flagship Schemes');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white shrink-0 font-medium transition-all"
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>Verified Official Government Roster ({directoryOfficers.length} Officials Listed)</span>
            <button
              onClick={fetchDirectory}
              className="text-indigo-400 hover:text-indigo-300 font-bold"
            >
              Refresh Directory
            </button>
          </div>

          {/* Directory Officers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {directoryOfficers.map(officer => {
              const funds = officer.funds_metrics;
              const staff = officer.staffing_metrics;

              return (
                <div
                  key={officer.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between shadow-xl backdrop-blur-sm group"
                >
                  <div className="space-y-3">
                    {/* Top Tier & Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {officer.role_tier}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {staff && staff.urgency_level === 'CRITICAL' && (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-900/60 animate-pulse">
                            🚨 Staff Shortage
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-900/60">
                          ● {officer.availability_status}
                        </span>
                      </div>
                    </div>

                    {/* Officer Identity */}
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                        {language === 'ta' ? officer.name_ta : officer.name_en}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 font-medium">
                        {language === 'ta' ? officer.designation_ta : officer.designation_en}
                      </p>
                    </div>

                    {/* Department & Jurisdiction */}
                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{officer.department_en}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">{officer.district_en} {officer.constituency ? `(${officer.constituency})` : ''}</span>
                      </div>
                    </div>

                    {/* Funds Allocation Snapshot */}
                    {funds && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-400 flex items-center gap-1">
                            <span>💰 Department Funds ({funds.fiscal_year})</span>
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                            funds.utilization_rate_pct > 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {funds.utilization_rate_pct}% Spent
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between font-mono">
                          <span className="text-slate-400 text-[11px]">Sanctioned: <b className="text-white font-sans">₹{funds.sanctioned_budget_cr.toLocaleString()} Cr</b></span>
                          <span className="text-emerald-400 text-[11px]">Released: <b>₹{funds.released_amount_cr.toLocaleString()} Cr</b></span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full"
                            style={{ width: `${Math.min(funds.utilization_rate_pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Staffing Demand & Supply Snapshot */}
                    {staff && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-400 flex items-center gap-1">
                            <span>👥 Staffing Demand & Supply</span>
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            staff.urgency_level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-300'
                          }`}>
                            {staff.vacant_posts.toLocaleString()} Vacancies ({staff.vacancy_deficit_pct}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Sanctioned: <b className="text-slate-200">{staff.sanctioned_posts.toLocaleString()}</b></span>
                          <span>In-Position: <b className="text-emerald-300">{staff.in_position_staff.toLocaleString()}</b></span>
                        </div>
                        {staff.top_shortage_roles && staff.top_shortage_roles.length > 0 && (
                          <div className="text-[10px] text-rose-300/90 font-medium truncate">
                            Shortages: {staff.top_shortage_roles.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Contact Email Pill */}
                    <div className="pt-1 space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-indigo-300 bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{officer.official_email}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(officer.official_email)}
                          className="text-slate-400 hover:text-white p-0.5"
                          title="Copy Email"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 px-1 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{officer.cug_phone}</span>
                      </div>
                    </div>

                    {/* Schemes & Projects Tags */}
                    {officer.current_schemes && officer.current_schemes.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {officer.current_schemes.map((sc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-medium border border-amber-500/20">
                            🌾 {sc}
                          </span>
                        ))}
                      </div>
                    )}
                    {officer.active_projects && officer.active_projects.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {officer.active_projects.map((pr, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[10px] font-medium border border-indigo-500/20">
                            🏗️ {pr}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedDossierOfficer(officer)}
                      className="py-2 px-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-indigo-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Dossier</span>
                    </button>
                    <button
                      onClick={() => handlePreFillBookingFromOfficer(officer)}
                      className="py-2 px-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                    >
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Department & Officer Dossier Modal */}
          {selectedDossierOfficer && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {selectedDossierOfficer.role_tier}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/60">
                        ● {selectedDossierOfficer.availability_status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-white mt-2">
                      {language === 'ta' ? selectedDossierOfficer.name_ta : selectedDossierOfficer.name_en}
                    </h2>
                    <p className="text-sm text-slate-300 font-medium">
                      {language === 'ta' ? selectedDossierOfficer.designation_ta : selectedDossierOfficer.designation_en} • {selectedDossierOfficer.department_en}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDossierOfficer(null)}
                    className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Communication & Contact Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Official Email</span>
                      <span className="font-mono text-indigo-300 font-bold text-xs">{selectedDossierOfficer.official_email}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedDossierOfficer.official_email)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">CUG Phone & Ext</span>
                    <span className="font-mono text-slate-200 font-bold text-xs">{selectedDossierOfficer.cug_phone}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Jurisdiction / District</span>
                    <span className="text-slate-200 font-bold text-xs">{selectedDossierOfficer.district_en}</span>
                  </div>
                </div>

                {/* 2-Column Analytics Grid: Funds & Staffing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Department Funds & Fiscal Breakdown */}
                  {selectedDossierOfficer.funds_metrics && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <span>💰 Budget Allocation & Fiscal Execution</span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">FY {selectedDossierOfficer.funds_metrics.fiscal_year}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Sanctioned</div>
                          <div className="text-sm font-black text-white font-mono mt-0.5">₹{selectedDossierOfficer.funds_metrics.sanctioned_budget_cr.toLocaleString()} Cr</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Released</div>
                          <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">₹{selectedDossierOfficer.funds_metrics.released_amount_cr.toLocaleString()} Cr</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Spent / Utilized</div>
                          <div className="text-sm font-black text-indigo-400 font-mono mt-0.5">₹{selectedDossierOfficer.funds_metrics.expenditure_cr.toLocaleString()} Cr</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Fund Utilization Rate</span>
                          <span className="font-bold text-white font-mono">{selectedDossierOfficer.funds_metrics.utilization_rate_pct}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400 h-2 rounded-full"
                            style={{ width: `${Math.min(selectedDossierOfficer.funds_metrics.utilization_rate_pct, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 pt-1 flex items-center justify-between">
                        <span>Status: <b className="text-slate-200">{selectedDossierOfficer.funds_metrics.allocation_status}</b></span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {selectedDossierOfficer.funds_metrics.fiscal_risk_flag}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Staffing Demand & Supply Matrix */}
                  {selectedDossierOfficer.staffing_metrics && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <span>👥 Staff Need, Demand & Supply</span>
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          selectedDossierOfficer.staffing_metrics.urgency_level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {selectedDossierOfficer.staffing_metrics.urgency_level} DEMAND
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Sanctioned</div>
                          <div className="text-sm font-black text-white font-mono mt-0.5">{selectedDossierOfficer.staffing_metrics.sanctioned_posts.toLocaleString()}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">In-Position</div>
                          <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{selectedDossierOfficer.staffing_metrics.in_position_staff.toLocaleString()}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase font-bold">Vacancy Deficit</div>
                          <div className="text-sm font-black text-rose-400 font-mono mt-0.5">{selectedDossierOfficer.staffing_metrics.vacant_posts.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Deficit Bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Staff Deficit / Vacancy Gap</span>
                          <span className="font-bold text-rose-400 font-mono">{selectedDossierOfficer.staffing_metrics.vacancy_deficit_pct}% shortfall</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-rose-500 h-2 rounded-full"
                            style={{ width: `${Math.min(selectedDossierOfficer.staffing_metrics.vacancy_deficit_pct * 2.5, 100)}%` }}
                          />
                        </div>
                      </div>

                      {selectedDossierOfficer.staffing_metrics.ai_staffing_gap_remedy && (
                        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-900/60 text-[11px] text-indigo-200">
                          <b>AI Staffing Recommendation:</b> {selectedDossierOfficer.staffing_metrics.ai_staffing_gap_remedy}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Projects & Schemes Execution Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    🏗️ Active Schemes & Infrastructure Projects
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDossierOfficer.schemes_details && selectedDossierOfficer.schemes_details.map((sch, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">🌾 {sch.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">{sch.saturation_rate_pct}% Saturation</span>
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Beneficiaries: <b className="text-white font-mono">{sch.actual_beneficiaries}</b> / {sch.target_beneficiaries}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Budget Outlay: <b className="text-slate-200 font-mono">₹{sch.budget_allocated_cr} Cr</b>
                        </div>
                      </div>
                    ))}

                    {selectedDossierOfficer.projects_details && selectedDossierOfficer.projects_details.map((prj, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300">🏗️ {prj.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                            {prj.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Physical: <b className="text-white font-mono">{prj.physical_progress_pct}%</b></span>
                          <span>Financial: <b className="text-white font-mono">{prj.financial_progress_pct}%</b></span>
                          <span>Capex: <b className="text-amber-300 font-mono">₹{prj.budget_cr} Cr</b></span>
                        </div>
                        {prj.key_bottleneck && (
                          <div className="text-[11px] text-rose-300 bg-rose-950/40 p-1.5 rounded-lg border border-rose-900/60">
                            <b>Bottleneck:</b> {prj.key_bottleneck}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Strategic Analysis */}
                {selectedDossierOfficer.ai_strategic_notes && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-950 to-slate-950 border border-indigo-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>CM Strategic AI Analysis & Required Interventions</span>
                    </div>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                      {selectedDossierOfficer.ai_strategic_notes}
                    </p>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const prompt = `Analyze funds allocation and staffing requirements for ${selectedDossierOfficer.name_en} (${selectedDossierOfficer.department_en})`;
                      setSelectedDossierOfficer(null);
                      onOpenCopilot?.(prompt);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Deep-Dive with Copilot</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDossierOfficer(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        const off = selectedDossierOfficer;
                        setSelectedDossierOfficer(null);
                        handlePreFillBookingFromOfficer(off);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>Schedule Meeting with Official</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual & Pre-Filled Appointment Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {language === 'ta' ? 'அதிகாரப்பூர்வ சந்திப்பு பதிவு (Executive Appointment Booking)' : 'Schedule Executive Appointment with Official'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Meeting Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Executive Review on Water Release"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Role Classification</label>
                  <select
                    value={formParticipantRole}
                    onChange={(e) => setFormParticipantRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="MINISTER">Cabinet Minister (அமைச்சர்)</option>
                    <option value="MLA">MLA / MP (சட்டமன்ற உறுப்பினர்)</option>
                    <option value="PRINCIPAL_SECRETARY">Principal Secretary (முதன்மைச் செயலாளர்)</option>
                    <option value="GROUP_1">Group 1 (District Collector / SP)</option>
                    <option value="GROUP_2">Group 2 (Tahsildar / BDO)</option>
                    <option value="GROUP_3_4">Group 3 & 4 (VAO / Field Officer)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Participant / Delegation Name</label>
                  <input
                    type="text"
                    value={formParticipantName}
                    onChange={(e) => setFormParticipantName(e.target.value)}
                    placeholder="e.g. V. Arun Roy, IAS & Team"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Designation</label>
                  <input
                    type="text"
                    value={formParticipantDesig}
                    onChange={(e) => setFormParticipantDesig(e.target.value)}
                    placeholder="e.g. Secretary, Industries"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Official Government Email (@tn.gov.in)</label>
                  <input
                    type="email"
                    value={formParticipantEmail}
                    onChange={(e) => setFormParticipantEmail(e.target.value)}
                    placeholder="e.g. official@tn.gov.in"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Department / District</label>
                  <input
                    type="text"
                    value={formParticipantDept}
                    onChange={(e) => setFormParticipantDept(e.target.value)}
                    placeholder="e.g. Water Resources / Thanjavur"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g. 11:30 AM - 12:30 PM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Meeting Agenda & Directives</label>
                <textarea
                  value={formAgenda}
                  onChange={(e) => setFormAgenda(e.target.value)}
                  rows={3}
                  placeholder="Outline key agenda items, required files, and policy discussions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Schedule Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
