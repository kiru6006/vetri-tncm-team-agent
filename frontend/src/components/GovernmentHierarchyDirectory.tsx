import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { HierarchyNode, OfficerDossier } from '../types';

interface GovernmentHierarchyDirectoryProps {
  onSelectOfficer?: (officer: OfficerDossier) => void;
  onOpenCopilot?: (query: string) => void;
}

export const GovernmentHierarchyDirectory: React.FC<GovernmentHierarchyDirectoryProps> = ({
  onSelectOfficer,
  onOpenCopilot
}) => {
  const { language } = useAuthStore();
  const isTa = language === 'ta';

  const [activeSubTab, setActiveSubTab] = useState<'hierarchy' | 'directory'>('hierarchy');
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set(['node-cm-01', 'node-cs-01']));

  // Directory Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<OfficerDossier[]>([]);
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerDossier | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Fetch hierarchy tree
    fetch('/api/v1/hierarchy/tree')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setHierarchyData(data);
          setSelectedNode(data);
        }
      })
      .catch(() => {
        // Mock fallback
        const mockRoot: HierarchyNode = {
          id: "node-cm-01",
          name_en: "M. K. Stalin",
          name_ta: "மு. க. ஸ்டாலின்",
          designation_en: "Hon'ble Chief Minister of Tamil Nadu",
          designation_ta: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
          tier_level: 1,
          tier_role: "CHIEF_MINISTER",
          department_en: "State Executive & Cabinet",
          department_ta: "மாநில தலைமை & அமைச்சரவை",
          cug_phone: "+91 44 2567 2345",
          official_email: "cmcell@tn.gov.in",
          office_address: "CMO, Secretariat, Fort St. George, Chennai",
          pending_approvals_count: 7,
          kpi_score: 96.4,
          active_projects_count: 180,
          active_schemes_count: 42,
          subordinates_count: 1350000,
          children: [
            {
              id: "node-cs-01",
              name_en: "N. Muruganandam, IAS",
              name_ta: "நா. முருகானந்தம், இ.ஆ.ப.",
              designation_en: "Chief Secretary to Government",
              designation_ta: "அரசு தலைமைச் செயலாளர்",
              tier_level: 4,
              tier_role: "CHIEF_SECRETARY",
              department_en: "Public & General Administration",
              department_ta: "பொது மற்றும் தலைமை நிர்வாகம்",
              cug_phone: "+91 44 2567 1555",
              official_email: "cs@tn.gov.in",
              office_address: "Secretariat, Fort St. George, Chennai",
              pending_approvals_count: 12,
              kpi_score: 94.8,
              active_projects_count: 45,
              active_schemes_count: 28,
              subordinates_count: 1200000,
              children: [
                {
                  id: "node-col-cbe",
                  name_en: "Krasthi Kumar Pati, IAS",
                  name_ta: "கிராந்தி குமார் பாடி, இ.ஆ.ப.",
                  designation_en: "District Collector, Coimbatore",
                  designation_ta: "மாவட்ட ஆட்சித்தலைவர், கோயம்புத்தூர்",
                  tier_level: 11,
                  tier_role: "DISTRICT_COLLECTOR",
                  district_name_en: "Coimbatore",
                  cug_phone: "+91 422 2301114",
                  official_email: "collr-cbe@nic.in",
                  office_address: "Collectorate, State Bank Road, Coimbatore",
                  pending_approvals_count: 5,
                  kpi_score: 93.6,
                  active_projects_count: 8,
                  active_schemes_count: 14,
                  subordinates_count: 320,
                  children: []
                },
                {
                  id: "node-sp-cbe",
                  name_en: "K. Karthikeyan, IPS",
                  name_ta: "கே. கார்த்திகேயன், இ.கா.ப.",
                  designation_en: "Superintendent of Police, Coimbatore Rural",
                  designation_ta: "காவல் கண்காணிப்பாளர், கோவை புறநகர்",
                  tier_level: 12,
                  tier_role: "SUPERINTENDENT_OF_POLICE",
                  district_name_en: "Coimbatore",
                  cug_phone: "+91 422 2300062",
                  official_email: "sp-cbe@tncctns.gov.in",
                  office_address: "DPO, State Bank Road, Coimbatore",
                  pending_approvals_count: 2,
                  kpi_score: 91.4,
                  active_projects_count: 3,
                  active_schemes_count: 2,
                  subordinates_count: 1450,
                  children: []
                }
              ]
            }
          ]
        };
        setHierarchyData(mockRoot);
        setSelectedNode(mockRoot);
      });

    // Initial directory load
    performSearch('Coimbatore');
  }, []);

  const performSearch = (q: string) => {
    setIsSearching(true);
    fetch(`/api/v1/directory/search?query=${encodeURIComponent(q)}&semantic=true`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.officers) {
          setSearchResults(data.officers);
          if (data.officers.length > 0 && !selectedOfficer) {
            setSelectedOfficer(data.officers[0]);
          }
        }
      })
      .catch(() => {})
      .finally(() => setIsSearching(false));
  };

  const toggleExpand = (nodeId: string) => {
    const next = new Set(expandedNodeIds);
    if (next.has(nodeId)) {
      next.delete(nodeId);
    } else {
      next.add(nodeId);
    }
    setExpandedNodeIds(next);
  };

  const renderHierarchyNode = (node: HierarchyNode, level: number = 0) => {
    const isExpanded = expandedNodeIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="space-y-1">
        <div
          onClick={() => setSelectedNode(node)}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          className={`flex items-center justify-between py-2.5 pr-3 rounded-xl cursor-pointer transition-all duration-150 ${
            isSelected
              ? 'bg-emerald-500/20 border border-emerald-500/50 text-white shadow-lg'
              : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            )}

            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">
                {isTa ? node.name_ta : node.name_en}
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
            {node.children.map(child => renderHierarchyNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isTa ? 'தமிழ்நாடு அரசு நிர்வாகப் படிநிலை & ஸ்மார்ட் அடைவு' : 'Tamil Nadu Government Hierarchy & Smart Directory'}
            </h1>
            <p className="text-xs text-slate-400">
              {isTa 
                ? '21 அடுக்கு தலைமைச் செயலகம் முதல் கிராம நிர்வாக அலுவலர் வரை ஒருங்கிணைந்த நிர்வாக அமைப்பு' 
                : '21-tier administrative structure from Chief Minister to Field Officers with AI semantic query resolution'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
          <button
            onClick={() => setActiveSubTab('hierarchy')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'hierarchy'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isTa ? 'நிர்வாக மரம்' : 'Hierarchy Tree'}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('directory')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'directory'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isTa ? 'ஸ்மார்ட் அடைவு தேடல்' : 'Smart Directory Search'}</span>
          </button>
        </div>
      </div>

      {/* VIEW A: HIERARCHY TREE & DOSSIER SPLIT */}
      {activeSubTab === 'hierarchy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Tree (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 max-h-[720px] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTa ? 'நிர்வாக அமைப்புக் கிளைகள்' : 'Administrative Org Chart'}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                21 Tiers • Active
              </span>
            </div>

            <div className="space-y-1">
              {hierarchyData && renderHierarchyNode(hierarchyData)}
            </div>
          </div>

          {/* Right: Selected Node Live Dossier (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedNode ? (
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                      {selectedNode.name_en.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-white">
                          {isTa ? selectedNode.name_ta : selectedNode.name_en}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                          Tier {selectedNode.tier_level}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-emerald-300 mt-0.5">
                        {isTa ? selectedNode.designation_ta : selectedNode.designation_en}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {selectedNode.office_address}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCopilot && onOpenCopilot(`Show complete briefing on ${selectedNode.name_en}, ${selectedNode.designation_en}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isTa ? 'AI ஆய்வு' : 'AI Dossier'}
                  </button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">KPI Performance</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{selectedNode.kpi_score}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Pending Approvals</div>
                    <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{selectedNode.pending_approvals_count}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Active Schemes</div>
                    <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5">{selectedNode.active_schemes_count}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Subordinates</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">{selectedNode.subordinates_count.toLocaleString()}</div>
                  </div>
                </div>

                {/* Official Contact & Direct Comms */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    {isTa ? 'அதிகாரப்பூர்வ தொடர்பு & தகவல் தொடர்பு' : 'Official Verified Contact'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono">{selectedNode.cug_phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span className="font-mono">{selectedNode.official_email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 rounded-2xl bg-slate-900/50 border border-slate-800">
                Select an administrative officer from the hierarchy tree to inspect dossier.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW B: SMART AI DIRECTORY SEARCH */}
      {activeSubTab === 'directory' && (
        <div className="space-y-6">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                performSearch(e.target.value);
              }}
              placeholder={isTa ? 'இயற்கை மொழியில் தேடவும்: "சுகாதாரத்துறை செயலாளர்", "கோயம்புத்தூர் ஆட்சியர்", "சென்னை மெட்ரோ பொறுப்பாளர்"...' : 'Search in natural language: "Principal Secretary for Health", "Coimbatore Collector", "Who manages Chennai Metro?"...'}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 shadow-2xl transition"
            />
          </div>

          {/* Search Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((officer) => (
              <div
                key={officer.id}
                onClick={() => setSelectedOfficer(officer)}
                className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 shadow-xl transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                      {isTa ? officer.name_ta : officer.name_en}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400">
                      {isTa ? officer.designation_ta : officer.designation_en}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {officer.cadre}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  {isTa ? officer.department_ta : officer.department_en}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    {officer.cug_phone}
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    KPI {officer.performance_kpi_score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
