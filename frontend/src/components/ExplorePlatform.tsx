import React, { useState, useMemo } from 'react';
import { useAuthStore } from '../stores/authStore';
import { ALL_DASHBOARDS_CATALOG, DashboardCatalogItem } from '../data/governanceData';
import {
  Compass,
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  Sparkles,
  Bot,
  LayoutDashboard,
  CheckCircle2,
  Calendar,
  Building2,
  Layers,
  MapPin,
  Share2,
  IndianRupee,
  TrendingUp,
  ShieldAlert,
  Briefcase,
  Award,
  Hammer,
  HeartHandshake,
  Shield,
  Users,
  MessagesSquare,
  BookOpen,
  RefreshCw,
  Lock,
  Scale,
  FileCheck2,
  Activity,
  FileText
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Sparkles,
  FileCheck2,
  Bot,
  Calendar,
  CheckCircle2,
  Building2,
  Layers,
  MapPin,
  Share2,
  IndianRupee,
  TrendingUp,
  ShieldAlert,
  Briefcase,
  Award,
  Hammer,
  HeartHandshake,
  Shield,
  Users,
  MessagesSquare,
  BookOpen,
  RefreshCw,
  Lock,
  Scale,
  Activity,
  FileText
};

export const ExplorePlatform: React.FC = () => {
  const { language, setCurrentRoute } = useAuthStore();
  const isTa = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All users');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const ROLE_FILTERS = [
    'All users',
    'Chief Minister',
    'Minister',
    'Principal Secretary',
    'District Collector',
    'Police',
    'Finance',
    'Department Officer',
    'Citizen'
  ];

  const CATEGORIES = [
    'ALL',
    'EXECUTIVE OFFICE',
    'GOVERNMENT INTELLIGENCE',
    'PERFORMANCE & FINANCE',
    'DELIVERY MONITORING',
    'PEOPLE & COLLABORATION',
    'INTELLIGENCE & KNOWLEDGE',
    'ADMINISTRATION'
  ];

  const filteredItems = useMemo(() => {
    return ALL_DASHBOARDS_CATALOG.filter((item) => {
      // Role filter
      if (selectedRole !== 'All users' && !item.roles.includes(selectedRole as any) && !item.roles.includes('All users')) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.titleEn.toLowerCase().includes(q) || item.titleTa.toLowerCase().includes(q);
        const matchDesc = item.descriptionEn.toLowerCase().includes(q) || item.descriptionTa.toLowerCase().includes(q);
        const matchAi = item.aiCapabilityEn.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchAi;
      }
      return true;
    });
  }, [searchQuery, selectedRole, selectedCategory]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-700 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              {isTa ? 'முழுமையான தளம் அட்டவணை' : 'Complete Platform Directory'}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {isTa ? 'அனைத்து டாஷ்போர்டுகள் & அரசு தொகுதிகள்' : 'Explore Platform & Dashboards'}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {isTa
                ? 'வெற்றி தமிழ்நாடு AI OS தளத்தின் அனைத்து 22+ தலைமை நிர்வாகப் பக்கங்கள், துறைகள், நிதி தணிக்கை மற்றும் மக்கள் சேவை தொகுதிகள்.'
                : 'Comprehensive catalogue of all executive command cockpits, departmental intelligence modules, public finance tracking, and citizen service monitors.'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Available Modules</div>
              <div className="text-2xl font-bold font-mono text-amber-400">{ALL_DASHBOARDS_CATALOG.length}</div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Filters</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{filteredItems.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTa ? "டாஷ்போர்டு அல்லது திறனைத் தேடுக..." : "Search dashboards, KPIs, or AI agents..."}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700/80 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Role Pills */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isTa ? 'பயனர் அதிகாரம் வாரியாக வடிகட்டு:' : 'Filter by Intended Role:'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ROLE_FILTERS.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isTa ? 'துறை வகை வாரியாக:' : 'Filter by Governance Category:'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid or List of Dashboards */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || LayoutDashboard;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/60 transition-all group"
              >
                <div className="space-y-3">
                  {/* Category and Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {item.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        item.dataStatus === 'LIVE_CONNECTED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}
                    >
                      {item.dataStatus === 'LIVE_CONNECTED' ? '● LIVE' : '● VERIFIED'}
                    </span>
                  </div>

                  {/* Title and Icon */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {isTa ? item.titleTa : item.titleEn}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {isTa ? item.descriptionTa : item.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Key Metrics & Signals</div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.kpis.map((kpi, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                        >
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Capability */}
                  <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-900/50 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-indigo-200">
                      {isTa ? item.aiCapabilityTa : item.aiCapabilityEn}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[10px] text-slate-400">
                    Roles: <span className="text-slate-300">{item.roles.slice(0, 2).join(', ')}</span>
                  </div>
                  <button
                    onClick={() => setCurrentRoute(item.route.replace(/^#/, ''))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>{isTa ? 'திறக்க' : 'Launch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-slate-800 divide-y divide-slate-800 overflow-hidden">
          {filteredItems.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || LayoutDashboard;
            return (
              <div
                key={item.id}
                className="p-4 hover:bg-slate-900/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        {isTa ? item.titleTa : item.titleEn}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {isTa ? item.descriptionTa : item.descriptionEn}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-indigo-300">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.aiCapabilityEn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex flex-wrap gap-1 max-w-[220px]">
                    {item.kpis.slice(0, 2).map((kpi, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentRoute(item.route.replace(/^#/, ''))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>{isTa ? 'திறக்க' : 'Launch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

