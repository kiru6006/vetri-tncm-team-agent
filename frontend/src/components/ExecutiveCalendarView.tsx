import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Building2,
  Phone,
  Mail,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Filter,
  Shield,
  Layers,
  MapPin,
  ChevronRight,
  UserCheck,
  Award
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { CalendarAppointment } from '../types';

interface ExecutiveCalendarViewProps {
  onOpenCopilot?: (query: string) => void;
  onAppointmentBooked?: (appointment: CalendarAppointment) => void;
}

export const ExecutiveCalendarView: React.FC<ExecutiveCalendarViewProps> = ({
  onOpenCopilot,
  onAppointmentBooked
}) => {
  const { language } = useAuthStore();
  const isTa = language === 'ta';

  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [selectedApptId, setSelectedApptId] = useState<string>('appt-cm-01');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formParticipantName, setFormParticipantName] = useState('');
  const [formParticipantRole, setFormParticipantRole] = useState('PRINCIPAL_SECRETARY');
  const [formParticipantDesig, setFormParticipantDesig] = useState('Principal Secretary to Government');
  const [formAgenda, setFormAgenda] = useState('');
  const [formTime, setFormTime] = useState('02:00 PM - 02:45 PM');
  const [formLocation, setFormLocation] = useState("Chief Minister's Secretariat Chamber, Fort St. George");

  useEffect(() => {
    fetchAppointments(roleFilter);
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
            agenda_en: "Request for staggered release of 15,000 cusecs from Mettur dam for tail-end delta canals in Vennar sub-basin.",
            agenda_ta: "வெண்ணாறு உபவடிநிலத்தில் கடைமடை பாசன கால்வாய்களுக்கு மேட்டூரிலிருந்து 15,000 கனஅடி நீர் திறக்க கோரிக்கை.",
            ai_prepared_notes_en: "Mettur reservoir storage at 68.4 ft (31.2 TMC). Releasing 15,000 cusecs for 6 days is hydrologically sustainable.",
            ai_prepared_notes_ta: "மேட்டூர் அணை நீர் இருப்பு 68.4 அடி. 6 நாட்களுக்கு 15,000 கனஅடி நீர் திறப்பு சாத்தியமானது.",
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
        scheduled_date: selectedDate,
        scheduled_time: formTime,
        agenda: formAgenda,
        location: formLocation
      })
    })
      .then(res => res.ok ? res.json() : null)
      .then(newAppt => {
        if (newAppt) {
          setAppointments(prev => [newAppt, ...prev]);
          setSelectedApptId(newAppt.id);
          setBookingModalOpen(false);
          setFormTitle('');
          setFormParticipantName('');
          setFormAgenda('');
          if (onAppointmentBooked) onAppointmentBooked(newAppt);
        }
      })
      .catch(() => {
        setBookingModalOpen(false);
      });
  };

  const selectedAppt = appointments.find(a => a.id === selectedApptId) || appointments[0];

  const roleCategories = [
    { code: 'ALL', labelEn: 'All Appointments', labelTa: 'அனைத்து சந்திப்புகள்' },
    { code: 'MINISTER', labelEn: 'Cabinet Ministers', labelTa: 'அமைச்சர்கள்' },
    { code: 'MLA', labelEn: 'MLAs & Delegations', labelTa: 'சட்டமன்ற உறுப்பினர்கள்' },
    { code: 'PRINCIPAL_SECRETARY', labelEn: 'Principal Secretaries', labelTa: 'முதன்மைச் செயலாளர்கள்' },
    { code: 'GROUP_1', labelEn: 'Group 1 (Collectors & SPs)', labelTa: 'குரூப் 1 (ஆட்சியர்கள் / எஸ்.பி)' },
    { code: 'GROUP_2', labelEn: 'Group 2 (Tahsildars & BDOs)', labelTa: 'குரூப் 2 (வட்டாட்சியர்கள்)' },
    { code: 'GROUP_3_4', labelEn: 'Group 3 & 4 (VAOs & Staff)', labelTa: 'குரூப் 3 & 4 (விஏஓ / பணியாளர்கள்)' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isTa ? 'முதலமைச்சர் அதிகாரப்பூர்வ நாள்காட்டி & சந்திப்புகள்' : 'Chief Minister & Executive Official Calendar'}
            </h1>
            <p className="text-xs text-slate-400">
              {isTa 
                ? 'அமைச்சர்கள், சட்டமன்ற உறுப்பினர்கள், செயலாளர்கள் மற்றும் அனைத்து அடுக்கு அரசு அலுவலர்களின் சந்திப்பு அட்டவணை' 
                : 'Live Executive schedule across Ministers, MLAs, Principal Secretaries, District Collectors & Field Officers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenCopilot && onOpenCopilot('Book an appointment with District Collector Coimbatore for review meeting')}
            className="px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {isTa ? 'AI மூலம் பதிவு செய்' : 'AI Voice/Chat Booking'}
          </button>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            {isTa ? 'நேரடி சந்திப்பு பதிவு' : 'New Appointment'}
          </button>
        </div>
      </div>

      {/* ROLE FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 rounded-2xl bg-slate-900/90 border border-slate-800">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
        {roleCategories.map(cat => (
          <button
            key={cat.code}
            onClick={() => setRoleFilter(cat.code)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              roleFilter === cat.code
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isTa ? cat.labelTa : cat.labelEn}
          </button>
        ))}
      </div>

      {/* MAIN SPLIT: Left (Appointments List 5 Cols) / Right (Dossier & Agenda Reader 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Appointments Timeline */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {appointments.length} Confirmed Appointments Today
            </span>
            <span className="text-xs font-mono text-emerald-400">{selectedDate}</span>
          </div>

          <div className="space-y-3">
            {appointments.map(appt => (
              <div
                key={appt.id}
                onClick={() => setSelectedApptId(appt.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-150 border space-y-2.5 ${
                  selectedApptId === appt.id
                    ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {appt.scheduled_time}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    appt.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-emerald-300 border border-slate-700'
                  }`}>
                    {appt.participant_role.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-sm font-bold leading-snug line-clamp-2">
                  {isTa ? appt.title_ta : appt.title_en}
                </h4>

                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate font-semibold">{appt.participant_name_en}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="truncate">{appt.location.split(',')[0]}</span>
                  <span className="text-emerald-400 font-semibold">{appt.protocol_clearance_status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Detailed Appointment Dossier & Meeting Agenda */}
        <div className="lg:col-span-7 space-y-6">
          {selectedAppt ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedAppt.participant_role}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {selectedAppt.scheduled_time}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-white">
                    {isTa ? selectedAppt.title_ta : selectedAppt.title_en}
                  </h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {selectedAppt.location}
                  </p>
                </div>

                <button
                  onClick={() => onOpenCopilot && onOpenCopilot(`Generate briefing and past decisions context for meeting with ${selectedAppt.participant_name_en}`)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  {isTa ? 'AI முன் தயாரிப்பு' : 'AI Briefing Dossier'}
                </button>
              </div>

              {/* Participant Profile Card */}
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Participant / Delegation Head</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {isTa ? selectedAppt.participant_name_ta : selectedAppt.participant_name_en}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    {selectedAppt.participant_designation} {selectedAppt.participant_district ? `• ${selectedAppt.participant_district}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800 border border-slate-700">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono">{selectedAppt.participant_contact}</span>
                  </div>
                </div>
              </div>

              {/* Meeting Agenda */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Official Meeting Agenda & Discussion Objectives
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTa ? selectedAppt.agenda_ta : selectedAppt.agenda_en}
                </p>
              </div>

              {/* AI Prepared Strategic Notes */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> AI Pre-Meeting Intelligence & Live Telemetry
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isTa ? selectedAppt.ai_prepared_notes_ta : selectedAppt.ai_prepared_notes_en}
                </p>
              </div>

              {/* Historical Precedents & Attached GOs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Historical Decisions</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {selectedAppt.historical_decisions_context.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Referenced Files & G.O.s</span>
                  <ul className="list-disc list-inside text-emerald-300 space-y-1">
                    {selectedAppt.required_files_gos.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ) : null}
        </div>

      </div>

      {/* BOOK APPOINTMENT MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-amber-500/40 max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {isTa ? 'முதலமைச்சரின் புதிய சந்திப்பு பதிவு செய்தல்' : 'Schedule Official CM Appointment'}
              </h3>
              <button onClick={() => setBookingModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Irrigation Review with Thanjavur Farmers Association"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Participant / Member Name</label>
                  <input
                    type="text"
                    value={formParticipantName}
                    onChange={(e) => setFormParticipantName(e.target.value)}
                    placeholder="e.g. MLA / Secretary Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Member Role / Classification</label>
                  <select
                    value={formParticipantRole}
                    onChange={(e) => setFormParticipantRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="MINISTER">Cabinet Minister</option>
                    <option value="MLA">MLA / Legislative Delegation</option>
                    <option value="PRINCIPAL_SECRETARY">Principal Secretary</option>
                    <option value="GROUP_1">Group 1 (Collector / SP / DRO)</option>
                    <option value="GROUP_2">Group 2 (Tahsildar / BDO)</option>
                    <option value="GROUP_3_4">Group 3 & 4 (VAO / Field Staff)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Agenda & Objectives</label>
                <textarea
                  value={formAgenda}
                  onChange={(e) => setFormAgenda(e.target.value)}
                  rows={3}
                  placeholder="State the core issues, files, or grievances to be addressed during the meeting..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Confirm & Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
