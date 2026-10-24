import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../types';
import { Shield, Globe, Clock, ChevronDown, Check } from 'lucide-react';

export const ExecutiveHeader: React.FC = () => {
  const { language, setLanguage, activeRole, setActiveRole, user } = useAuthStore();
  const [time, setTime] = useState<string>('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(language === 'ta' ? 'ta-IN' : 'en-US', {
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
  }, [language]);

  const rolesList: { role: UserRole; labelEn: string; labelTa: string }[] = [
    { role: 'CHIEF_MINISTER', labelEn: 'Chief Minister', labelTa: 'முதலமைச்சர்' },
    { role: 'CHIEF_SECRETARY', labelEn: 'Chief Secretary', labelTa: 'தலைமைச் செயலாளர்' },
    { role: 'DISTRICT_COLLECTOR', labelEn: 'Collector (Coimbatore)', labelTa: 'மாவட்ட ஆட்சியர்' },
    { role: 'DEPARTMENT_SECRETARY', labelEn: 'Finance Secretary', labelTa: 'நிதி செயலாளர்' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-slate-800/80">
      {/* State Emblem Branding */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-800 to-rose-900/30 border border-amber-500/30 shadow-lg shadow-amber-500/5 shrink-0">
          <span className="text-amber-400 font-extrabold text-base sm:text-lg tracking-tighter">வெ</span>
        </div>
        <div className="truncate">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <h1 className="text-sm sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
              <span>{language === 'ta' ? 'வெற்றி TN AI OS' : 'VETTRI TN AI OS'}</span>
              <span className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-semibold tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PROD
              </span>
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
            {language === 'ta'
              ? 'தமிழ்நாடு அரசு • தலைமை நிர்வாக தளம்'
              : 'Government of Tamil Nadu • Executive AI'}
          </p>
        </div>
      </div>

      {/* Center Live Telemetry Clock */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
        <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>IST {time}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
        <span className="text-[11px] text-emerald-400 font-sans font-medium">
          {language === 'ta' ? 'நேரலை' : 'LIVE'}
        </span>
      </div>

      {/* Right Controls: Role Switcher, Language Toggle, User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[90px] sm:max-w-none">
              {language === 'ta'
                ? rolesList.find((r) => r.role === activeRole)?.labelTa
                : rolesList.find((r) => r.role === activeRole)?.labelEn}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 sm:w-64 rounded-xl glass-card border border-slate-700/80 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'ta' ? 'அதிகாரப் பார்வை மாற்றம்' : 'Switch Persona View'}
              </div>
              {rolesList.map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    setActiveRole(item.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                    activeRole === item.role
                      ? 'bg-amber-500/15 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{language === 'ta' ? item.labelTa : item.labelEn}</span>
                  {activeRole === item.role && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Toggle (Tamil / English) */}
        <button
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/60 text-xs font-bold text-blue-300 transition-all shadow-sm cursor-pointer"
          title="Toggle Language / மொழியை மாற்றுக"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'Eng' : 'தமிழ்'}</span>
        </button>

        {/* User Identity Pill */}
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shrink-0">
            TN
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-white">
              {language === 'ta' ? user?.fullNameTa : user?.fullNameEn}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Secured • 2FA</div>
          </div>
        </div>
      </div>
    </header>
  );
};
