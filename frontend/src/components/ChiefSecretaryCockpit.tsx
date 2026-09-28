import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { StalledProject } from '../types';
import { Shield, AlertTriangle, Clock, ArrowUpRight, CheckCircle2, UserCheck } from 'lucide-react';

export const ChiefSecretaryCockpit: React.FC = () => {
  const { language } = useAuthStore();
  const [stalledProjects, setStalledProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/executive/stalled-projects')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStalledProjects(data);
      })
      .catch(() => {});
  }, []);

  const projects = stalledProjects.length > 0 ? stalledProjects : [
    {
      id: 'proj-001',
      name_en: 'Coimbatore Western Ring Road (Phase II)',
      name_ta: 'கோவை மேற்கு புறவழிச்சாலை (இரண்டாம் கட்டம்)',
      department_en: 'Highways and Minor Ports',
      department_ta: 'நெடுஞ்சாலை துறை',
      district_name_en: 'Coimbatore',
      estimated_cost_cr: 480.0,
      delay_days: 180,
      bottleneck_reason_en: 'Land acquisition compensation dispute across 4.2 km stretch in Perur Taluk.',
      bottleneck_reason_ta: 'பேரூர் தாலுகாவில் 4.2 கிமீ நில எடுப்பு விவகாரம்.',
      action_required_en: 'District Collector to convene special tripartite mediation on Friday with DRO.',
      action_required_ta: 'மாவட்ட ஆட்சியர் வெள்ளிக்கிழமை சிறப்பு முத்தரப்பு பேச்சுவார்த்தை நடத்த வேண்டும்.',
    },
    {
      id: 'proj-002',
      name_en: 'SIPCOT Common Effluent Treatment Plant',
      name_ta: 'சிப்காட் பொது கழிவுநீர் சுத்திகரிப்பு நிலையம்',
      department_en: 'Industries Department',
      department_ta: 'தொழில்துறை',
      district_name_en: 'Ranipet',
      estimated_cost_cr: 125.0,
      delay_days: 120,
      bottleneck_reason_en: 'TNPCB zero-liquid discharge environmental clearance pending.',
      bottleneck_reason_ta: 'சுற்றுச்சூழல் துறை அனுமதி நிலுவை.',
      action_required_en: 'Environment Secretary to grant expedited conditional clearance.',
      action_required_ta: 'சுற்றுச்சூழல் துறை செயலாளர் விரைவான அனுமதி வழங்க வேண்டும்.',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CS Top Alert Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-blue-950/40 border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-sm font-bold text-white">
              {language === 'ta' ? 'தலைமைச் செயலாளர் ஒருங்கிணைப்பு மையம்' : 'Chief Secretary Inter-Departmental Command'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ta'
                ? 'தாமதமான முக்கிய திட்டங்கள் மற்றும் துறைச் செயலாளர்களின் செயல்திறன்'
                : 'Monitoring stalled projects >₹100 Cr and departmental secretary accountability'}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
          {projects.length} High-Stakes Bottlenecks
        </span>
      </div>

      {/* Stalled Projects Matrix */}
      <div className="space-y-4">
        {projects.map((p: any) => (
          <div
            key={p.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'ta' ? p.name_ta : p.name_en}
                </h4>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="text-amber-400 font-semibold">
                    {language === 'ta' ? p.department_ta : p.department_en}
                  </span>
                  <span>•</span>
                  <span>{p.district_name_en}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Outlay</div>
                  <div className="text-xs font-bold font-mono text-white">₹{p.estimated_cost_cr} Cr</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
                  +{p.delay_days} Days Delay
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Identified Root Bottleneck</div>
              <p className="text-slate-200">
                {language === 'ta' ? p.bottleneck_reason_ta : p.bottleneck_reason_en}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="text-xs text-cyan-400 flex items-center gap-1.5 font-medium">
                <UserCheck className="w-4 h-4" />
                <span>{language === 'ta' ? p.action_required_ta : p.action_required_en}</span>
              </div>

              <button className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow flex items-center gap-1">
                <span>Issue CS Order</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
