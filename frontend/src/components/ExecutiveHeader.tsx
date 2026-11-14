import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../types';
import {
  Shield,
  Globe,
  Bell,
  MessageSquare,
  Calendar,
  Search,
  ChevronDown,
  Check,
  Menu,
  Clock,
  Sparkles,
  AlertTriangle,
  X,
  ExternalLink
} from 'lucide-react';
import { GOVERNANCE_ISSUES_MASTER } from '../data/governanceData';

interface ExecutiveHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenCopilot: (query?: string) => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  onToggleMobileMenu,
  onOpenCopilot
}) => {
  const {
    language,
    setLanguage,
    activeRole,
    setActiveRole,
    user,
    currentRoute,
    setCurrentRoute
  } = useAuthStore();
  const isTa = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [time, setTime] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(isTa ? 'ta-IN' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isTa]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { role: UserRole; labelEn: string; labelTa: string; subEn: string }[] = [
    { role: 'CHIEF_MINISTER', labelEn: 'Hon\'ble Chief Minister', labelTa: 'மாண்புமிகு முதலமைச்சர்', subEn: 'Head of Government' },
    { role: 'CHIEF_SECRETARY', labelEn: 'Chief Secretary', labelTa: 'தலைமைச் செயலாளர்', subEn: 'Dr. M. Sai Kumar, IAS' },
    { role: 'DISTRICT_COLLECTOR', labelEn: 'District Collector (Coimbatore)', labelTa: 'மாவட்ட ஆட்சியர் (கோவை)', subEn: 'Kranthi Kumar Pati, IAS' },
    { role: 'DEPARTMENT_SECRETARY', labelEn: 'Finance Secretary', labelTa: 'நிதிச் செயலாளர்', subEn: 'T. Udhayachandran, IAS' },
  ];

  const criticalIssues = GOVERNANCE_ISSUES_MASTER.filter(i => i.severity === 'CRITICAL');

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onOpenCopilot(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full glass-header px-3 sm:px-6 flex items-center justify-between border-b border-slate-800/80">
      {/* Left: Mobile hamburger + App Name / Workspace */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-slate-100">
              {isTa ? 'தலைமைச் செயலகம்' : 'Fort St. George Workspace'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-400 font-mono text-[11px]">CMO 2.0</span>
          </div>
        </div>
      </div>

      {/* Center: Global AI Search */}
      <div className="flex-1 min-w-[110px] max-w-md mx-1 sm:mx-6">
        <form onSubmit={handleGlobalSearch} className="relative">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isTa
                ? "AI தேடல்: 'சேலம் சாலை'..."
                : "Search or ask AI: 'Salem road'..."
            }
            className="w-full pl-8 sm:pl-9 pr-8 sm:pr-9 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/80 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 p-1"
            title="Ask Copilot"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Right Controls: Notifications, Messages, Calendar, Language, Role/Profile */}
      <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
        {/* Messages Shortcut */}
        <button
          onClick={() => setCurrentRoute('messages')}
          className="hidden sm:inline-flex relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          title={isTa ? "செய்திகள்" : "Messages"}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
        </button>

        {/* Calendar Shortcut */}
        <button
          onClick={() => setCurrentRoute('calendar')}
          className="hidden sm:inline-flex relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          title={isTa ? "நாள்காட்டி" : "Calendar & Meetings"}
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* Critical Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors touch-target-44 flex items-center justify-center"
            title={isTa ? "முக்கிய அறிவிப்புகள்" : "Critical Alerts"}
          >
            <Bell className="w-4 h-4" />
            {criticalIssues.length > 0 && (
              <span className="absolute top-1 right-1 px-1 min-w-[16px] h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                {criticalIssues.length}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-[-3rem] sm:right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-sm sm:w-96 rounded-2xl glass-card border border-slate-700 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {isTa ? 'அவசர முடிவுகள் தேவை' : 'Critical Governance Alerts'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                  {criticalIssues.length} Active
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 my-2">
                {criticalIssues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => {
                      setCurrentRoute('action-tracker');
                      setNotificationsOpen(false);
                    }}
                    className="py-2.5 px-2 hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-rose-300 truncate max-w-[200px]">
                        {issue.district} • {issue.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {issue.financialImpactCr ? `₹${issue.financialImpactCr} Cr` : 'High Impact'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium line-clamp-2">
                      {isTa ? issue.titleTa : issue.titleEn}
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>Owner:</span>
                      <span className="text-slate-300 font-medium">{issue.responsibleOfficial.nameEn}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentRoute('action-tracker');
                  setNotificationsOpen(false);
                }}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors text-center"
              >
                {isTa ? 'அனைத்து செயல்பாடுகளையும் காண்க' : 'Open Executive Action Tracker'}
              </button>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 text-xs font-semibold">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              language === 'en'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => setLanguage('ta')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              language === 'ta'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            தமிழ்
          </button>
        </div>

        {/* Persona Switcher / Profile Menu */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-slate-200 transition-colors touch-target-44"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[65px] sm:max-w-none">
              {isTa
                ? rolesList.find((r) => r.role === activeRole)?.labelTa
                : rolesList.find((r) => r.role === activeRole)?.labelEn}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-72 rounded-2xl glass-card border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isTa ? 'அதிகாரப் பார்வை மாற்றம்' : 'Switch Simulated Role'}
              </div>
              <div className="divide-y divide-slate-800/60 my-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setActiveRole(item.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                      activeRole === item.role
                        ? 'bg-amber-500/15 text-amber-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">
                        {isTa ? item.labelTa : item.labelEn}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.subEn}</div>
                    </div>
                    {activeRole === item.role && (
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
