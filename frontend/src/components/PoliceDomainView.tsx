import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Shield, Radio, Video, Clock, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export const PoliceDomainView: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/departments/police')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const incidents = data?.recent_incidents || [
    {
      id: 'inc-901',
      station_name: 'Kangeyam PS',
      district: 'Tirupur',
      category: 'Industrial Labor Dispute',
      severity: 'MEDIUM',
      reported_time: '2 hours ago',
      status: 'UNDER_CONTROL',
      brief_en: 'Dyeing factory workers demonstration resolved peacefully through RDO conciliation.',
      brief_ta: 'சாயப்பட்டறை தொழிலாளர் போராட்டம் அமைதியாக சமரச பேச்சுவார்த்தை மூலம் தீர்க்கப்பட்டது.',
    },
    {
      id: 'inc-902',
      station_name: 'Flower Bazaar PS',
      district: 'Chennai',
      category: 'Commercial Fire Safety',
      severity: 'LOW',
      reported_time: '4 hours ago',
      status: 'RESOLVED',
      brief_en: 'Minor electrical panel spark safely contained by Fire & Rescue Services.',
      brief_ta: 'மின்சார கசிவு தீயணைப்புத்துறையினரால் விரைவாக அணைக்கப்பட்டது.',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Police KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'மாநில குற்றக் குறியீடு' : 'State Crime Index'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">12.4 / 100</div>
          <div className="text-xs text-slate-400">Lowest among large industrialized states</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'நெடுஞ்சாலை ரோந்து உதவி நேரம்' : 'Highway Patrol Response'}
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400">7.8 Mins</div>
          <div className="text-xs text-emerald-400 font-medium">94.2% Emergency Calls within 10 mins</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'CCTV கண்காணிப்பு கேமரா இயக்கம்' : 'CCTV Network Uptime'}
          </span>
          <div className="text-2xl font-bold font-mono text-white">96.4%</div>
          <div className="text-xs text-slate-400">1,42,000+ AI Integrated Street Feeds</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'அசம்பாவிதங்கள் அற்ற நிலை' : 'Communal Incident Metric'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">0 Reported</div>
          <div className="text-xs text-slate-400">100% Peace Score across 38 districts</div>
        </div>
      </div>

      {/* DGP Daily SITREP & Police Station Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily SITREP Summary */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ta' ? 'காவல்துறை தலைமை இயக்குநர் (DGP) நேரலை SITREP' : 'DGP Executive SITREP Feed'}
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">24H Live Stream</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {language === 'ta'
              ? 'தமிழகம் முழுவதும் சட்டம் ஒழுங்கு சீராக உள்ளது. கடந்த 24 மணி நேரத்தில் எந்தவொரு அசம்பாவிதமும் இன்றி அமைதி நிலவுகிறது. சென்னை மெட்ரோ, கோவை, மதுரை உட்பட அனைத்து மண்டலங்களிலும் ரோந்து பணிகள் தீவிரப்படுத்தப்பட்டுள்ளன.'
              : 'Law & order across Tamil Nadu remains peaceful and fully secured. Zero communal incidents reported state-wide in the past 24 hours. Night patrolling and highway response units are operating at optimal readiness.'}
          </div>

          {/* Zone Speeds */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Average Emergency Dispatch by Zone</div>
            {[
              { zone: 'Chennai Metro', time: '6.8 Mins', units: 180 },
              { zone: 'West Zone (CBE/TPR/SLM)', time: '7.4 Mins', units: 140 },
              { zone: 'South Zone (MDU/TNV/TUT)', time: '8.6 Mins', units: 165 },
              { zone: 'Central Zone (TRZ/TNJ)', time: '8.1 Mins', units: 110 },
            ].map((z) => (
              <div key={z.zone} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 text-xs">
                <span className="text-slate-300 font-medium">{z.zone}</span>
                <span className="font-mono text-cyan-400 font-bold">{z.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Station Feeds */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ta' ? 'காவல் நிலையங்கள் நேரலை நிகழ்வுகள்' : 'Live Station Incident Stream'}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">1,500+ Connected Stations</span>
          </div>

          <div className="space-y-3">
            {incidents.map((inc: any) => (
              <div key={inc.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-400">
                      {inc.station_name}
                    </span>
                    <span className="text-xs font-bold text-white">{inc.category}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{inc.reported_time}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {language === 'ta' ? inc.brief_ta : inc.brief_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
