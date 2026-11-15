import React, { useState } from 'react';
import { Settings, Globe, Bell } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const SettingsView: React.FC = () => {
  const { language, setLanguage } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-700 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Settings className="w-4 h-4" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Settings</h1>
        <p className="text-xs text-slate-300 mt-1">Personalise language, display, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Globe className="w-4 h-4 text-amber-400" /> Language</div>
          <div className="flex gap-3">
            {(['en', 'ta'] as const).map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${language === lang ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {lang === 'en' ? '🇬🇧 English' : '🇮🇳 தமிழ்'}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Bell className="w-4 h-4 text-amber-400" /> Notifications</div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-slate-300">Priority Alerts</span>
            <div className={`relative w-10 h-5 rounded-full transition-colors ${notifications ? 'bg-amber-500' : 'bg-slate-700'}`}
              onClick={() => setNotifications(!notifications)}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-slate-300">Compact View</span>
            <div className={`relative w-10 h-5 rounded-full transition-colors ${compactMode ? 'bg-amber-500' : 'bg-slate-700'}`}
              onClick={() => setCompactMode(!compactMode)}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${compactMode ? 'left-5' : 'left-0.5'}`} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
