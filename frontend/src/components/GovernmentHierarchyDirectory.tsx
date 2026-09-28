import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Search,
  ChevronRight,
  ChevronDown,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Shield,
  Layers,
  Clock,
  Briefcase,
  FileCheck,
  CheckCircle2,
  Activity,
  Award,
  Video,
  MessagesSquare,
  Send,
  AlertTriangle,
  RefreshCw,
  Database,
  ExternalLink,
  UserCheck,
  Filter,
  Flame,
  Globe,
  FileText,
  UserPlus,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  Share2,
  Check
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import {
  OfficialGRMProfile,
  AutocompleteItem,
  CadreType,
  SyncConnector,
  SyncAuditLog,
  RelationshipIntelligenceResponse,
  RecommendedOfficerItem,
  OfficerDossier,
  HierarchyNode
} from '../types';

interface GovernmentHierarchyDirectoryProps {
  onSelectOfficer?: (officer: OfficerDossier | OfficialGRMProfile) => void;
  onOpenCopilot?: (query: string) => void;
}

export const GovernmentHierarchyDirectory: React.FC<GovernmentHierarchyDirectoryProps> = ({
  onSelectOfficer,
  onOpenCopilot
}) => {
  const { language } = useAuthStore();
  const isTa = language === 'ta';

  // Navigation Subtabs
  const [activeTab, setActiveTab] = useState<'directory' | 'hierarchy' | 'intelligence' | 'sync'>('directory');
  const [selectedCadre, setSelectedCadre] = useState<string>('ALL');

  // Search & Autocomplete State
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteItem[]>([]);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<OfficialGRMProfile[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [cadreCounts, setCadreCounts] = useState<{ [key: string]: number }>({});
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Executive Profile Dossier Drawer / Modal
  const [selectedProfile, setSelectedProfile] = useState<OfficialGRMProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 1-Click Action Modal State
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [activeActionModal, setActiveActionModal] = useState<{
    type: 'SCHEDULE' | 'CHAT' | 'DIRECTIVE' | 'ESCALATE' | 'VIDEO';
    officer: OfficialGRMProfile;
  } | null>(null);
  const [directiveNote, setDirectiveNote] = useState('');

  // Hierarchy Tree State
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode | null>(null);
  const [selectedHierarchyNode, setSelectedHierarchyNode] = useState<HierarchyNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['node-cm-01', 'node-cs-01']));

  // AI Relationship Intelligence State
  const [intelligenceQuery, setIntelligenceQuery] = useState('');
  const [intelligenceResult, setIntelligenceResult] = useState<RelationshipIntelligenceResponse | null>(null);
  const [isLoadingIntelligence, setIsLoadingIntelligence] = useState(false);

  // ETL Sync Connectors State
  const [syncConnectors, setSyncConnectors] = useState<SyncConnector[]>([]);
  const [syncAuditLogs, setSyncAuditLogs] = useState<SyncAuditLog[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Initial Load
  useEffect(() => {
    fetchDirectorySearch('');
    fetchHierarchyTree();
    fetchSyncConnectors();
    fetchSyncAuditLogs();

    // Click outside to close autocomplete
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Directory Search Results
  const fetchDirectorySearch = async (query: string, cadre: string = selectedCadre) => {
    setIsLoadingSearch(true);
    try {
      const cadreParam = cadre !== 'ALL' ? `&cadre=${cadre}` : '';
      const res = await fetch(`/api/v1/grm/search?q=${encodeURIComponent(query)}${cadreParam}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || []);
        setTotalMatches(data.total_matches || 0);
        setCadreCounts(data.cadre_counts || {});
        if (data.results && data.results.length > 0 && !selectedProfile) {
          setSelectedProfile(data.results[0]);
        }
      }
    } catch (err) {
      console.error('Failed to search GRM directory:', err);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  // Autocomplete Live Search
  const handleSearchInputChange = async (val: string) => {
    setSearchQuery(val);
    if (val.trim().length >= 1) {
      try {
        const res = await fetch(`/api/v1/grm/autocomplete?q=${encodeURIComponent(val)}`);
        if (res.ok) {
          const items = await res.json();
          setAutocompleteResults(items);
          setIsAutocompleteOpen(items.length > 0);
        }
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      }
    } else {
      setAutocompleteResults([]);
      setIsAutocompleteOpen(false);
      fetchDirectorySearch('', selectedCadre);
    }
  };

  // On Enter or Submit Search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAutocompleteOpen(false);
    fetchDirectorySearch(searchQuery, selectedCadre);
  };

  // Select Officer from Autocomplete Card
  const handleSelectAutocomplete = async (item: AutocompleteItem) => {
    setIsAutocompleteOpen(false);
    setSearchQuery(item.name_en);
    try {
      const res = await fetch(`/api/v1/grm/officers/${item.id}`);
      if (res.ok) {
        const profile = await res.json();
        setSelectedProfile(profile);
        setIsProfileModalOpen(true);
        if (onSelectOfficer) onSelectOfficer(profile);
      }
    } catch (err) {
      console.error('Error fetching officer details:', err);
    }
  };

  // Cadre Tab Selection
  const handleCadreChange = (cadre: string) => {
    setSelectedCadre(cadre);
    fetchDirectorySearch(searchQuery, cadre);
  };

  // Hierarchy Tree Fetch
  const fetchHierarchyTree = async () => {
    try {
      const res = await fetch('/api/v1/hierarchy/tree');
      if (res.ok) {
        const tree = await res.json();
        setHierarchyData(tree);
        setSelectedHierarchyNode(tree);
      }
    } catch (err) {
      console.error('Hierarchy fetch error:', err);
    }
  };

  // Sync Connectors Fetch
  const fetchSyncConnectors = async () => {
    try {
      const res = await fetch('/api/v1/grm/sync/connectors');
      if (res.ok) {
        const data = await res.json();
        setSyncConnectors(data.connectors || []);
      }
    } catch (err) {
      console.error('Sync connectors fetch error:', err);
    }
  };

  // Sync Audit Logs Fetch
  const fetchSyncAuditLogs = async () => {
    try {
      const res = await fetch('/api/v1/grm/sync/audit-logs');
      if (res.ok) {
        const logs = await res.json();
        setSyncAuditLogs(logs || []);
      }
    } catch (err) {
      console.error('Audit logs fetch error:', err);
    }
  };

  // Trigger ETL Sync
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/v1/grm/sync/trigger', { method: 'POST' });
      if (res.ok) {
        const syncResp = await res.json();
        setActionSuccessMsg(`ETL Sync Job ${syncResp.job_id} Completed: ${syncResp.total_records_synced} records verified & synchronized.`);
        fetchSyncConnectors();
        fetchSyncAuditLogs();
        fetchDirectorySearch(searchQuery, selectedCadre);
      }
    } catch (err) {
      console.error('Trigger sync error:', err);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    }
  };

  // AI Relationship Intelligence Run
  const handleRunRelationshipIntelligence = async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsLoadingIntelligence(true);
    try {
      const res = await fetch('/api/v1/grm/intelligence/recommend-participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt })
      });
      if (res.ok) {
        const data = await res.json();
        setIntelligenceResult(data);
      }
    } catch (err) {
      console.error('Relationship intelligence error:', err);
    } finally {
      setIsLoadingIntelligence(false);
    }
  };

  // Quick Action Triggers
  const handleExecuteAction = (actionType: 'SCHEDULE' | 'CHAT' | 'DIRECTIVE' | 'ESCALATE' | 'VIDEO', officer: OfficialGRMProfile) => {
    if (actionType === 'SCHEDULE') {
      setActionSuccessMsg(`Scheduled High-Level CM Review Meeting with ${officer.name_en} (${officer.designation_en}). Added to Executive Calendar.`);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } else if (actionType === 'CHAT') {
      setActionSuccessMsg(`Encrypted Official Channel initiated with ${officer.name_en}. Link: secure-tn-${officer.id}.gov.in`);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } else if (actionType === 'VIDEO') {
      setActionSuccessMsg(`State Video Conference Room #TN-${officer.id.slice(-4).toUpperCase()} provisioned. Invitation sent to ${officer.official_email}`);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } else if (actionType === 'DIRECTIVE') {
      setActiveActionModal({ type: 'DIRECTIVE', officer });
    } else if (actionType === 'ESCALATE') {
      setActionSuccessMsg(`Executive Governance Escalation dispatched to Chief Secretary & ${officer.reporting_officer?.name || 'Supervisory Authority'}.`);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    }
  };

  // Confirm Directive Action
  const handleConfirmDirective = () => {
    if (activeActionModal) {
      setActionSuccessMsg(`Official CM Secretariat Directive dished to ${activeActionModal.officer.name_en} (${activeActionModal.officer.designation_en}): "${directiveNote.slice(0, 50)}..."`);
      setActiveActionModal(null);
      setDirectiveNote('');
      setTimeout(() => setActionSuccessMsg(null), 5000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isTa ? 'ஆயத்தமாக உள்ளார்' : 'Available'}
          </span>
        );
      case 'IN_MEETING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {isTa ? 'கூட்டத்தில் உள்ளார்' : 'In Meeting'}
          </span>
        );
      case 'ON_TOUR':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            {isTa ? 'கள ஆய்வில்' : 'On Tour'}
          </span>
        );
      case 'IN_ASSEMBLY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {isTa ? 'சட்டப்பேரவையில்' : 'In Assembly'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-700/50 border border-slate-600 text-slate-300">
            {status}
          </span>
        );
    }
  };

  const getCadrePillColor = (cadre: string) => {
    switch (cadre) {
      case 'IAS':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'IPS':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'IRS':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'IFS':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'MINISTER':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MLA':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  // Render Hierarchy Tree Recursive Node
  const renderHierarchyTreeNode = (node: HierarchyNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedHierarchyNode?.id === node.id;

    return (
      <div key={node.id} className="space-y-1">
        <div
          onClick={() => setSelectedHierarchyNode(node)}
          style={{ paddingLeft: `${level * 22 + 12}px` }}
          className={`flex items-center justify-between py-2.5 pr-3 rounded-xl cursor-pointer transition-all duration-150 ${
            isSelected
              ? 'bg-indigo-600/20 border border-indigo-500/60 text-white shadow-lg'
              : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = new Set(expandedNodes);
                  if (next.has(node.id)) next.delete(node.id);
                  else next.add(node.id);
                  setExpandedNodes(next);
                }}
                className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 text-emerald-400" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            )}

            <div className="truncate">
              <div className="text-xs font-bold text-white truncate flex items-center gap-2">
                <span>{isTa ? node.name_ta : node.name_en}</span>
                {node.district_name_en && (
                  <span className="text-[10px] text-slate-400 font-normal">({node.district_name_en})</span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {isTa ? node.designation_ta : node.designation_en}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
              Tier {node.tier_level}
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children.map(child => renderHierarchyTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Toast / Notification Banner */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 shadow-2xl flex items-center justify-between animate-slideDown">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-indigo-950/60 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-amber-500 p-0.5 shadow-xl shadow-indigo-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
                <Building2 className="w-7 h-7" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {isTa ? 'தமிழ்நாடு அரசு தலைமை அடைவு & நிர்வாக ஒத்துழைப்பு தளம்' : 'Enterprise Government Directory & Collaboration Platform'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Single Source of Truth
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                {isTa
                  ? 'மாண்புமிகு முதலமைச்சரின் நேரடி மேற்பார்வையில் அனைத்து அரசு அதிகாரிகள் (IAS, IPS, IRS, IFS, மாவட்ட ஆட்சியர்கள், காவல்துறை கண்காணிப்பாளர்கள்) விவரங்கள், அறிவார்ந்த தேடல் மற்றும் 1-கிளிக் ஒருங்கிணைப்பு.'
                  : 'Comprehensive Government Relationship Management (GRM) for all officials across IAS, IPS, IRS, IFS, TNPSC, District Collectors, SPs & Secretariat with AI relationship intelligence and 1-click execution.'}
              </p>
            </div>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 shrink-0 shadow-inner">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'directory'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isTa ? 'அதிகாரிகள் அடைவு' : 'Unified Directory'}</span>
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'hierarchy'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isTa ? '21-அடுக்கு நிர்வாக மரம்' : 'Org Chart (21 Tiers)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('intelligence')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'intelligence'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'AI கூட்ட நுண்ணறிவு' : 'AI Relationship Intel'}</span>
            </button>
            <button
              onClick={() => setActiveTab('sync')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'sync'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-teal-400" />
              <span>{isTa ? 'தரவு ஒத்திசைவு (ETL)' : 'Data Sources & ETL'}</span>
            </button>
          </div>
        </div>

        {/* Global Search Bar with Real-time Autocomplete Popup */}
        <div ref={searchContainerRef} className="relative z-30">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-4.5 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onFocus={() => {
                if (autocompleteResults.length > 0) setIsAutocompleteOpen(true);
              }}
              placeholder={
                isTa
                  ? 'பெயர், துறை, மாவட்டம், கேடர் (IAS/IPS/IRS), திட்டம் அல்லது இயற்கை மொழியில் தேடவும்: "Kirubakaran IPS", "Kayalvizhi IRS", "சேலம் ஆட்சியர்", "நீர் வளத்துறை"...'
                  : 'Search by Name, Cadre (IAS/IPS/IRS/IFS), Department, District, Scheme: "Kirubakaran IPS", "Kayalvizhi IRS", "Collector Salem", "Water Resources"...'
              }
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-950/90 border border-slate-700/80 hover:border-indigo-500/60 focus:border-indigo-500 text-white placeholder-slate-400 text-sm focus:outline-none shadow-2xl transition duration-200"
            />
            <div className="absolute right-3 flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
              >
                <span>{isTa ? 'தேடு' : 'Search'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Autocomplete Instant Popover Card */}
          {isAutocompleteOpen && autocompleteResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-xl border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800 animate-in fade-in duration-150 max-h-[480px] overflow-y-auto">
              <div className="p-3 bg-slate-950/80 px-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-indigo-300">
                  {isTa ? 'உடனடி அதிகாரிகள் பரிந்துரைகள்' : 'Official Directory Instant Matches'}
                </span>
                <span>{autocompleteResults.length} {isTa ? 'பொருத்தங்கள்' : 'officers'}</span>
              </div>
              {autocompleteResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectAutocomplete(item)}
                  className="p-3.5 px-4 hover:bg-indigo-950/40 cursor-pointer transition flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.avatar_color || 'from-indigo-600 to-purple-700'} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}>
                      {item.name_en.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition truncate">
                          {isTa ? item.name_ta : item.name_en}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCadrePillColor(item.cadre)}`}>
                          {item.cadre} {item.batch_year ? `• '${item.batch_year.toString().slice(-2)}` : ''}
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="text-xs text-slate-300 truncate mt-0.5">
                        {item.designation_en}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate flex items-center gap-2 mt-0.5">
                        <span>{item.department_en}</span>
                        <span>•</span>
                        <span className="text-indigo-400 font-medium">{item.district_en}</span>
                      </div>
                    </div>
                  </div>

                  {/* Autocomplete Quick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 opacity-80 group-hover:opacity-100 transition">
                    <a
                      href={`tel:${item.cug_phone}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Call ${item.cug_phone}`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition shadow"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${item.official_email}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Email ${item.official_email}`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition shadow"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAutocomplete(item);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition"
                    >
                      {isTa ? 'சுயவிவரம்' : 'View Profile'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cadre Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Cadre Filter:
          </span>
          {[
            { id: 'ALL', label: 'All Officials', labelTa: 'அனைத்து அதிகாரிகள்' },
            { id: 'IAS', label: 'IAS Officers', labelTa: 'இ.ஆ.ப. அதிகாரிகள்' },
            { id: 'IPS', label: 'IPS Police', labelTa: 'இ.கா.ப. அதிகாரிகள்' },
            { id: 'IRS', label: 'IRS Revenue/Tax', labelTa: 'இ.வ.ப. வரித்துறை' },
            { id: 'IFS', label: 'IFS Forest', labelTa: 'இ.வ.ப. வனத்துறை' },
            { id: 'MINISTER', label: 'Cabinet Ministers', labelTa: 'அமைச்சர்கள்' },
            { id: 'COLLECTORS', label: 'District Collectors', labelTa: 'மாவட்ட ஆட்சியர்கள்' },
            { id: 'SPS', label: 'Superintendents (SP)', labelTa: 'காவல் கண்காணிப்பாளர்கள்' },
            { id: 'TNCS_GRP1', label: 'Group 1 & Field', labelTa: 'குரூப் 1 & கள அலுவலர்கள்' }
          ].map((cadre) => (
            <button
              key={cadre.id}
              onClick={() => handleCadreChange(cadre.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                selectedCadre === cadre.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{isTa ? cadre.labelTa : cadre.label}</span>
              {cadreCounts[cadre.id] !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/60 font-mono">
                  {cadreCounts[cadre.id]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: UNIFIED DIRECTORY & EXECUTIVE DOSSIER */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Officer Cards List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2 text-xs text-slate-400">
              <span className="font-semibold text-white flex items-center gap-2">
                <span>{isTa ? 'அரசு அதிகாரிகள் பட்டியல்' : 'Official Directory Roster'}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-mono text-[11px]">
                  {totalMatches} {isTa ? 'அதிகாரிகள்' : 'Found'}
                </span>
              </span>
              <span className="text-[11px] text-slate-500">
                Click any officer to inspect full dossier & 1-click action
              </span>
            </div>

            {isLoadingSearch ? (
              <div className="p-12 text-center text-slate-400 rounded-3xl bg-slate-900/80 border border-slate-800 flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
                <span>Synchronizing official directory index...</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-12 text-center text-slate-500 rounded-3xl bg-slate-900/80 border border-slate-800">
                No official records matched your search query. Try searching by officer name, cadre, or district.
              </div>
            ) : (
              <div className="space-y-3 max-h-[860px] overflow-y-auto pr-1">
                {searchResults.map((officer) => {
                  const isSelected = selectedProfile?.id === officer.id;
                  return (
                    <div
                      key={officer.id}
                      onClick={() => {
                        setSelectedProfile(officer);
                        if (onSelectOfficer) onSelectOfficer(officer);
                      }}
                      className={`group p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-950/60 to-slate-900 border-indigo-500/80 shadow-xl shadow-indigo-900/20'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${officer.avatar_color || 'from-indigo-600 to-purple-700'} flex items-center justify-center text-white font-extrabold text-base shadow-lg shrink-0`}>
                            {officer.name_en.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition truncate">
                                {isTa ? officer.name_ta : officer.name_en}
                              </h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getCadrePillColor(officer.cadre)}`}>
                                {officer.cadre} {officer.batch_year ? `• Batch ${officer.batch_year}` : ''}
                              </span>
                              {getStatusBadge(officer.status)}
                            </div>
                            <p className="text-xs font-semibold text-emerald-300 mt-1">
                              {isTa ? officer.designation_ta : officer.designation_en}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span className="truncate">{officer.department_en}</span>
                              <span>•</span>
                              <span className="text-indigo-400 font-semibold shrink-0">{officer.district_en}</span>
                            </p>
                          </div>
                        </div>

                        {/* Performance Score */}
                        <div className="text-right shrink-0">
                          <div className="text-[10px] uppercase font-bold text-slate-400">KPI Score</div>
                          <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">
                            {officer.performance_score}%
                          </div>
                        </div>
                      </div>

                      {/* Quick Meta Footer */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 gap-2 flex-wrap">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-slate-300 font-mono">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            {officer.cug_phone}
                          </span>
                          <span className="flex items-center gap-1 text-slate-300 font-mono">
                            <Mail className="w-3 h-3 text-indigo-400" />
                            {officer.official_email}
                          </span>
                        </div>

                        {/* 1-Click Action Shortcuts */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExecuteAction('SCHEDULE', officer);
                            }}
                            title="Schedule Meeting"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExecuteAction('VIDEO', officer);
                            }}
                            title="Start Video Meeting"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                          >
                            <Video className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExecuteAction('CHAT', officer);
                            }}
                            title="Start Secure Chat"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                          >
                            <MessagesSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfile(officer);
                              setIsProfileModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-[11px] font-bold transition"
                          >
                            {isTa ? 'விவரம்' : 'Dossier'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Selected Executive Profile Dossier (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {selectedProfile ? (
              <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-6 sticky top-24">
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProfile.avatar_color || 'from-indigo-600 to-purple-700'} flex items-center justify-center text-white font-black text-2xl shadow-xl shrink-0`}>
                      {selectedProfile.name_en.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-extrabold text-white">
                          {isTa ? selectedProfile.name_ta : selectedProfile.name_en}
                        </h2>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getCadrePillColor(selectedProfile.cadre)}`}>
                          {selectedProfile.cadre}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-emerald-300 mt-0.5">
                        {isTa ? selectedProfile.designation_ta : selectedProfile.designation_en}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {selectedProfile.district_en} {selectedProfile.taluk_en ? `• ${selectedProfile.taluk_en} Taluk` : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Expand Full Executive Dossier"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 1-Click Executive Collaboration Action Bar */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {isTa ? '1-கிளிக் மாண்புமிகு முதலமைச்சர் நேரடி நடவடிக்கைகள்' : '1-Click Executive Command Actions'}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleExecuteAction('SCHEDULE', selectedProfile)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isTa ? 'கூட்டம் பதிவு செய்' : 'Schedule Meet'}</span>
                    </button>
                    <button
                      onClick={() => handleExecuteAction('VIDEO', selectedProfile)}
                      className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{isTa ? 'வீடியோ சந்திப்பு' : 'Start Video'}</span>
                    </button>
                    <button
                      onClick={() => handleExecuteAction('DIRECTIVE', selectedProfile)}
                      className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{isTa ? 'பணி ஆணை வழங்கு' : 'Assign Directive'}</span>
                    </button>
                    <button
                      onClick={() => handleExecuteAction('ESCALATE', selectedProfile)}
                      className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{isTa ? 'அவசர தீவிரப்படுத்து' : 'Escalate Issue'}</span>
                    </button>
                  </div>
                </div>

                {/* Verified Contact Details Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isTa ? 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தொடர்புகள்' : 'Verified Official Coordinates'}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        CUG Phone:
                      </span>
                      <a href={`tel:${selectedProfile.cug_phone}`} className="font-mono text-emerald-400 font-bold hover:underline">
                        {selectedProfile.cug_phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        Official Email:
                      </span>
                      <a href={`mailto:${selectedProfile.official_email}`} className="font-mono text-indigo-300 hover:underline truncate max-w-[200px]">
                        {selectedProfile.official_email}
                      </a>
                    </div>
                    <div className="flex items-start justify-between text-slate-300 pt-1">
                      <span className="flex items-center gap-2 text-slate-400 shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        Office Address:
                      </span>
                      <span className="text-right text-slate-300 text-[11px] max-w-[220px]">
                        {selectedProfile.office_address_en}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reporting Lineage Mini-Trail */}
                {selectedProfile.reporting_officer && (
                  <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 space-y-1.5 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Reporting Officer (Superior)
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{selectedProfile.reporting_officer.name}</div>
                        <div className="text-[11px] text-slate-400">{selectedProfile.reporting_officer.designation}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-indigo-300 font-bold">
                        {selectedProfile.reporting_officer.cadre}
                      </span>
                    </div>
                  </div>
                )}

                {/* AI Executive Summary Snippet */}
                {selectedProfile.ai_profile_summary_en && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isTa ? 'AI நிர்வாகச் சுருக்கம்' : 'AI Executive Dossier Summary'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isTa ? selectedProfile.ai_profile_summary_ta : selectedProfile.ai_profile_summary_en}
                    </p>
                  </div>
                )}

                {/* Active Portfolios Count */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-bold text-slate-400">Projects</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      {selectedProfile.current_projects.length}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-bold text-slate-400">Schemes</div>
                    <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                      {selectedProfile.current_schemes.length}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-bold text-slate-400">Committees</div>
                    <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                      {selectedProfile.committees.length}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 rounded-3xl bg-slate-900/50 border border-slate-800">
                Select an official from the directory roster to inspect comprehensive dossier.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: 21-TIER INTERACTIVE HIERARCHY TREE */}
      {activeTab === 'hierarchy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 max-h-[820px] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTa ? '21 அடுக்கு நிர்வாகப் படிநிலை வரைபடம்' : 'Tamil Nadu 21-Tier Government Org Chart'}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CM to Field Officers
              </span>
            </div>

            <div className="space-y-1">
              {hierarchyData && renderHierarchyTreeNode(hierarchyData)}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {selectedHierarchyNode ? (
              <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-6 sticky top-24">
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                      {selectedHierarchyNode.name_en.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-white">
                          {isTa ? selectedHierarchyNode.name_ta : selectedHierarchyNode.name_en}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                          Tier {selectedHierarchyNode.tier_level}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-emerald-300 mt-0.5">
                        {isTa ? selectedHierarchyNode.designation_ta : selectedHierarchyNode.designation_en}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {selectedHierarchyNode.office_address}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenCopilot) onOpenCopilot(`Provide executive dossier and recent decisions for ${selectedHierarchyNode.name_en}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Review
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">KPI Performance</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{selectedHierarchyNode.kpi_score}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Pending Approvals</div>
                    <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{selectedHierarchyNode.pending_approvals_count}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Active Schemes</div>
                    <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5">{selectedHierarchyNode.active_schemes_count}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Subordinates</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">{selectedHierarchyNode.subordinates_count?.toLocaleString()}</div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    {isTa ? 'அதிகாரப்பூர்வ தகவல் தொடர்பு' : 'Official Communications Line'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono">{selectedHierarchyNode.cug_phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span className="font-mono">{selectedHierarchyNode.official_email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 rounded-3xl bg-slate-900/50 border border-slate-800">
                Select an administrative officer from the 21-tier tree to inspect structure.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: AI RELATIONSHIP INTELLIGENCE */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isTa ? 'அரசு தொடர்பு & கூட்ட நுண்ணறிவு இயந்திரம் (AI Relationship Intelligence)' : 'Government Relationship & Meeting Intelligence Engine'}
                </h2>
                <p className="text-xs text-slate-400">
                  Ask natural language questions: "Who should attend meeting on Salem Water Resources & Industrial GST?", "Who is responsible for POCSO trial velocity in Coimbatore?", "Who owns Chennai Peripheral Ring Road?"
                </p>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={intelligenceQuery}
                onChange={(e) => setIntelligenceQuery(e.target.value)}
                placeholder="Enter governance issue, scheme review, or meeting purpose..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleRunRelationshipIntelligence(intelligenceQuery)}
                disabled={isLoadingIntelligence || !intelligenceQuery.trim()}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg transition flex items-center gap-2 shrink-0"
              >
                {isLoadingIntelligence ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Analyze & Recommend</span>
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Sample Inquiries:</span>
              {[
                'Review POCSO trial velocity and fast-track forensics with DGP & Police',
                'Salem District Water Resources, Groundwater & GST Compliance',
                'Chennai Metro Phase 2 & Peripheral Ring Road Land Acquisition',
                'Coimbatore Industrial MSME Revival & Power Tariffs'
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIntelligenceQuery(sample);
                    handleRunRelationshipIntelligence(sample);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-900/60 hover:text-indigo-200 text-slate-300 transition text-[11px]"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* AI Intelligence Output Dossier */}
          {intelligenceResult && (
            <div className="space-y-6 animate-fadeIn">
              {/* Primary Lead & Recommended Attendees Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Primary Lead Officer Card */}
                <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/50 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      Designated Primary Lead Officer
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">
                      {intelligenceResult.primary_lead.cadre}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{intelligenceResult.primary_lead.name}</h3>
                    <p className="text-xs font-bold text-emerald-300">{intelligenceResult.primary_lead.designation}</p>
                    <p className="text-xs text-slate-400 mt-1">{intelligenceResult.primary_lead.department} • {intelligenceResult.primary_lead.district}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="text-[10px] font-bold text-amber-400 uppercase">Role Justification:</div>
                    <p>{intelligenceResult.primary_lead.role_justification}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <a href={`tel:${intelligenceResult.primary_lead.cug_phone}`} className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-center transition">
                      Call {intelligenceResult.primary_lead.cug_phone}
                    </a>
                  </div>
                </div>

                {/* Recommended Key Attendees (2 Cols) */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      Essential Meeting Attendees & Collaborators ({intelligenceResult.recommended_attendees.length})
                    </span>
                    <button
                      onClick={() => setActionSuccessMsg('Calendar Invitations & AI Meeting Dossiers dispatched to all recommended attendees.')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book All to Calendar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {intelligenceResult.recommended_attendees.map((att) => (
                      <div key={att.id} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-white text-xs">{att.name}</div>
                            <div className="text-[11px] text-emerald-400 font-semibold">{att.designation}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCadrePillColor(att.cadre)}`}>
                            {att.cadre}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {att.role_justification}
                        </p>
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{att.district}</span>
                          <span className="font-mono text-indigo-300">{att.cug_phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Meeting Preparation Dossier (Agenda, Critical Questions, Relevant GOs, Risks) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    AI Pre-Meeting Briefing & Strategy Dossier
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Recommended Agenda */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                      Recommended Agenda
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {intelligenceResult.ai_meeting_briefing.recommended_agenda.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Critical Questions to Ask */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                      Questions for Hon'ble CM
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {intelligenceResult.ai_meeting_briefing.critical_questions_to_ask.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold shrink-0">?</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Relevant Government Orders */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      Pertinent G.O. References
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {intelligenceResult.ai_meeting_briefing.relevant_government_orders.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-mono text-[11px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Factors */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                      Identified Governance Risks
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {intelligenceResult.ai_meeting_briefing.risk_factors.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: OFFICIAL DATA SOURCES & ETL CONNECTORS */}
      {activeTab === 'sync' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {isTa ? 'அரசு அதிகாரப்பூர்வ தரவு ஒத்திசைவு & ETL இணைப்பிகள்' : 'Official Government Data Sources & ETL Connectors'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Automated bi-directional synchronization from Tamil Nadu Government Portal, IAS/IPS Gazette, Police CCTNS, IFHRMS Treasury & e-District.
                  </p>
                </div>
              </div>

              <button
                onClick={handleTriggerSync}
                disabled={isSyncing}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Synchronizing Connectors...' : 'Trigger Synchronize All (ETL)'}</span>
              </button>
            </div>
          </div>

          {/* Connectors Status Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {syncConnectors.map((conn) => (
              <div key={conn.id} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{conn.name}</h3>
                    <p className="text-xs text-teal-400 font-mono mt-0.5">{conn.source_category}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {conn.last_sync_status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Endpoint:</span>
                    <span className="font-mono text-[11px] text-slate-300 truncate max-w-[180px]">{conn.endpoint_url}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Cron Schedule:</span>
                    <span className="font-mono text-indigo-300">{conn.frequency_cron}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Sync Latency:</span>
                    <span className="font-mono text-emerald-400">{conn.latency_ms} ms</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-bold">Processed</div>
                    <div className="font-mono font-bold text-white mt-0.5">{conn.records_processed}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-bold">Updated</div>
                    <div className="font-mono font-bold text-emerald-400 mt-0.5">{conn.records_updated}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 font-bold">Flagged</div>
                    <div className="font-mono font-bold text-amber-400 mt-0.5">{conn.flagged_outdated}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sync Audit Trail Logs */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Cryptographic Sync Audit Trail & Provenance History
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Immutable Audit Chain</span>
            </div>

            <div className="space-y-2">
              {syncAuditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">{log.connector_name}</div>
                      <div className="text-[11px] text-slate-400">{new Date(log.executed_at).toLocaleString()} • Verified by {log.verified_by}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="text-emerald-400 font-semibold font-mono">+{log.records_added} added / {log.records_modified} modified</span>
                    <span className="font-mono text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-800">
                      Hash: {log.audit_hash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: FULL EXECUTIVE DOSSIER MODAL */}
      {isProfileModalOpen && selectedProfile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-start gap-4">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedProfile.avatar_color || 'from-indigo-600 to-purple-700'} flex items-center justify-center text-white font-black text-3xl shadow-2xl shrink-0`}>
                  {selectedProfile.name_en.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl font-extrabold text-white">
                      {isTa ? selectedProfile.name_ta : selectedProfile.name_en}
                    </h2>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getCadrePillColor(selectedProfile.cadre)}`}>
                      {selectedProfile.cadre} {selectedProfile.batch_year ? `• Batch ${selectedProfile.batch_year}` : ''}
                    </span>
                    {getStatusBadge(selectedProfile.status)}
                  </div>
                  <p className="text-base font-bold text-emerald-300 mt-1">
                    {isTa ? selectedProfile.designation_ta : selectedProfile.designation_en}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{selectedProfile.office_name}</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold">{selectedProfile.district_en}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              <button
                onClick={() => {
                  handleExecuteAction('SCHEDULE', selectedProfile);
                  setIsProfileModalOpen(false);
                }}
                className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Meeting</span>
              </button>
              <button
                onClick={() => {
                  handleExecuteAction('VIDEO', selectedProfile);
                  setIsProfileModalOpen(false);
                }}
                className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-2 transition shadow"
              >
                <Video className="w-4 h-4" />
                <span>Video Conference</span>
              </button>
              <button
                onClick={() => {
                  handleExecuteAction('DIRECTIVE', selectedProfile);
                  setIsProfileModalOpen(false);
                }}
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition shadow"
              >
                <Zap className="w-4 h-4" />
                <span>Issue Directive</span>
              </button>
              <button
                onClick={() => {
                  handleExecuteAction('ESCALATE', selectedProfile);
                  setIsProfileModalOpen(false);
                }}
                className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center gap-2 transition shadow"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Escalate Matter</span>
              </button>
            </div>

            {/* Coordinates & Contact Table */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Official Coordinates & Governance Registry
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-slate-500">CUG Phone:</div>
                  <a href={`tel:${selectedProfile.cug_phone}`} className="font-mono text-emerald-400 font-bold hover:underline">
                    {selectedProfile.cug_phone}
                  </a>
                </div>
                <div>
                  <div className="text-slate-500">Official Email:</div>
                  <a href={`mailto:${selectedProfile.official_email}`} className="font-mono text-indigo-300 hover:underline truncate block">
                    {selectedProfile.official_email}
                  </a>
                </div>
                <div>
                  <div className="text-slate-500">Service Category:</div>
                  <div className="font-semibold text-white">{selectedProfile.service_category}</div>
                </div>
              </div>
            </div>

            {/* Reporting Hierarchy Trail */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                21-Tier Reporting Hierarchy Lineage
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
                {selectedProfile.reporting_hierarchy.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      <div className="font-bold text-white">{step.name}</div>
                      <div className="text-[11px] text-slate-400">{step.designation}</div>
                    </div>
                    {idx < selectedProfile.reporting_hierarchy.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Responsibilities, Schemes, Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  Responsibilities ({selectedProfile.responsibilities.length})
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedProfile.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Active Flagship Schemes
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProfile.current_schemes.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Current Key Projects
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProfile.current_projects.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Provenance & Audit Metadata */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Source: <strong className="text-slate-200">{selectedProfile.data_source.source_name}</strong></span>
              </div>
              <div className="font-mono text-[11px] text-slate-500">
                Audit Record Hash: {selectedProfile.data_source.record_hash}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ISSUE DIRECTIVE DIALOG */}
      {activeActionModal && activeActionModal.type === 'DIRECTIVE' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>Issue Official CM Secretariat Directive</span>
              </div>
              <button onClick={() => setActiveActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Directing: <strong className="text-white">{activeActionModal.officer.name_en}</strong> ({activeActionModal.officer.designation_en})
            </p>

            <textarea
              rows={4}
              value={directiveNote}
              onChange={(e) => setDirectiveNote(e.target.value)}
              placeholder="Specify official executive instructions, priority, and required completion deadline..."
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveActionModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDirective}
                disabled={!directiveNote.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition shadow"
              >
                Dispatch Directive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
