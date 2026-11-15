import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
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
  ChevronDown,
  ChevronRight,
  Compass,
  Menu,
  ChevronLeft,
  Search,
  Scale,
  Settings,
  Flame,
  FileText,
  Activity,
  FolderGit2,
  X
} from 'lucide-react';

interface SidebarSection {
  titleEn: string;
  titleTa: string;
  items: Array<{
    id: string;
    route: string;
    labelEn: string;
    labelTa: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: { count: number; color: 'red' | 'amber' | 'blue' | 'emerald' };
    roles?: string[];
  }>;
}

interface ExecutiveSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenCopilot: (query?: string) => void;
}

export const ExecutiveSidebar: React.FC<ExecutiveSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  onOpenCopilot
}) => {
  const {
    language,
    currentRoute,
    setCurrentRoute,
    sidebarCollapsed,
    toggleSidebar,
    activeRole
  } = useAuthStore();
  const isTa = language === 'ta';

  // State for accordion sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'EXECUTIVE OFFICE': true,
    'GOVERNMENT INTELLIGENCE': true,
    'PERFORMANCE & FINANCE': true,
    'DELIVERY MONITORING': true,
    'PEOPLE & COLLABORATION': true,
    'INTELLIGENCE & KNOWLEDGE': false,
    'EXPLORE PLATFORM': true,
    'ADMINISTRATION': false
  });

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  // Lock body scroll and listen for Escape key on mobile
  useEffect(() => {
    if (!mobileOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, onCloseMobile]);

  const SECTIONS: SidebarSection[] = [
    {
      titleEn: "EXECUTIVE OFFICE",
      titleTa: "தலைமை நிர்வாக அலுவலகம்",
      items: [
        {
          id: "cm-command",
          route: "cm-command",
          labelEn: "CM Command Center",
          labelTa: "முதல்வர் கட்டளை மையம்",
          icon: LayoutDashboard,
          badge: { count: 15, color: 'red' }
        },
        {
          id: "todays-briefing",
          route: "todays-briefing",
          labelEn: "Today's Briefing",
          labelTa: "இன்றைய தலைமைச் சுருக்கம்",
          icon: Sparkles
        },
        {
          id: "my-decisions",
          route: "my-decisions",
          labelEn: "My Decisions",
          labelTa: "எனது முடிவுகள்",
          icon: FileCheck2,
          badge: { count: 7, color: 'amber' }
        },
        {
          id: "copilot",
          route: "copilot",
          labelEn: "AI Executive Copilot",
          labelTa: "முதல்வர் AI ஆலோசகர்",
          icon: Bot
        },
        {
          id: "calendar",
          route: "calendar",
          labelEn: "Meetings & Calendar",
          labelTa: "கூட்டங்கள் & நாள்காட்டி",
          icon: Calendar,
          badge: { count: 4, color: 'blue' }
        },
        {
          id: "action-tracker",
          route: "action-tracker",
          labelEn: "Executive Action Tracker",
          labelTa: "செயல்பாட்டு கண்காணிப்பு",
          icon: CheckCircle2,
          badge: { count: 3, color: 'red' }
        }
      ]
    },
    {
      titleEn: "GOVERNMENT INTELLIGENCE",
      titleTa: "அரசு நுண்ணறிவு & கட்டமைப்பு",
      items: [
        {
          id: "ministries",
          route: "ministries",
          labelEn: "Ministries",
          labelTa: "அமைச்சரவை",
          icon: Building2
        },
        {
          id: "departments",
          route: "departments",
          labelEn: "Departments",
          labelTa: "அரசுத் துறைகள்",
          icon: Layers
        },
        {
          id: "sub-departments",
          route: "sub-departments",
          labelEn: "Sub-Departments",
          labelTa: "துணைத் துறைகள்",
          icon: FolderGit2
        },
        {
          id: "districts",
          route: "districts",
          labelEn: "Districts",
          labelTa: "மாவட்டங்கள்",
          icon: MapPin,
          badge: { count: 38, color: 'blue' }
        },
        {
          id: "taluks",
          route: "taluks",
          labelEn: "Taluks & Blocks",
          labelTa: "வட்டங்கள் & ஒன்றியங்கள்",
          icon: MapPin
        },
        {
          id: "constituencies",
          route: "constituencies",
          labelEn: "Constituencies",
          labelTa: "சட்டமன்றத் தொகுதிகள்",
          icon: LandmarkIcon
        },
        {
          id: "hierarchy",
          route: "hierarchy",
          labelEn: "Government Hierarchy",
          labelTa: "அரசு படிநிலை",
          icon: Share2
        }
      ]
    },
    {
      titleEn: "PERFORMANCE & FINANCE",
      titleTa: "செயல்திறன் & நிதி மேலாண்மை",
      items: [
        {
          id: "revenue",
          route: "revenue",
          labelEn: "Revenue Intelligence",
          labelTa: "வருவாய் நுண்ணறிவு",
          icon: IndianRupee
        },
        {
          id: "expenditure",
          route: "expenditure",
          labelEn: "Expenditure",
          labelTa: "செலவினங்கள்",
          icon: TrendingUp
        },
        {
          id: "budget",
          route: "budget",
          labelEn: "Budget Utilization",
          labelTa: "நிதிப் பயன்பாடு",
          icon: Scale
        },
        {
          id: "revenue-leakage",
          route: "revenue-leakage",
          labelEn: "Revenue Leakage",
          labelTa: "வருவாய் கசிவு",
          icon: ShieldAlert,
          badge: { count: 4, color: 'red' }
        },
        {
          id: "cost-optimization",
          route: "cost-optimization",
          labelEn: "Cost Optimization",
          labelTa: "செலவு உகப்பாக்கம்",
          icon: TrendingUp
        },
        {
          id: "procurement",
          route: "procurement",
          labelEn: "Procurement & Tenders",
          labelTa: "ஒப்பந்தப் புள்ளிகள்",
          icon: Briefcase
        },
        {
          id: "audit-findings",
          route: "audit-findings",
          labelEn: "Audit Findings",
          labelTa: "தணிக்கை முடிவுகள்",
          icon: ShieldCheckIcon
        }
      ]
    },
    {
      titleEn: "DELIVERY MONITORING",
      titleTa: "திட்டங்கள் & மக்கள் சேவை வழங்கல்",
      items: [
        {
          id: "projects",
          route: "projects",
          labelEn: "Projects",
          labelTa: "முக்கியத் திட்டங்கள்",
          icon: Hammer
        },
        {
          id: "schemes",
          route: "schemes",
          labelEn: "Schemes",
          labelTa: "அரசு நலத்திட்டங்கள்",
          icon: Award
        },
        {
          id: "infrastructure",
          route: "infrastructure",
          labelEn: "Infrastructure",
          labelTa: "உட்கட்டமைப்பு",
          icon: Building2
        },
        {
          id: "citizen-services",
          route: "citizen-services",
          labelEn: "Citizen Services",
          labelTa: "மக்கள் சேவைகள்",
          icon: HeartHandshake
        },
        {
          id: "public-safety",
          route: "public-safety",
          labelEn: "Public Safety",
          labelTa: "பொது பாதுகாப்பு & காவல்",
          icon: Shield
        },
        {
          id: "grievances",
          route: "grievances",
          labelEn: "Grievances",
          labelTa: "மக்களின் குறைகள் (1100)",
          icon: Activity
        }
      ]
    },
    {
      titleEn: "PEOPLE & COLLABORATION",
      titleTa: "மக்கள் & நிர்வாக ஒத்துழைப்பு",
      items: [
        {
          id: "directory",
          route: "directory",
          labelEn: "Government Directory",
          labelTa: "அரசு தொலைபேசி அடைவு",
          icon: Users
        },
        {
          id: "ministers-mlas",
          route: "ministers-mlas",
          labelEn: "Ministers & MLAs",
          labelTa: "அமைச்சர்கள் & எம்.எல்.ஏக்கள்",
          icon: Users
        },
        {
          id: "civil-services",
          route: "civil-services",
          labelEn: "IAS / IPS / IFS / IRS",
          labelTa: "அகில இந்திய பணிகள்",
          icon: Shield
        },
        {
          id: "messages",
          route: "messages",
          labelEn: "Messages",
          labelTa: "செய்தித் தளம்",
          icon: MessagesSquare,
          badge: { count: 3, color: 'emerald' }
        },
        {
          id: "task-assignments",
          route: "task-assignments",
          labelEn: "Task Assignments",
          labelTa: "பணி ஒதுக்கீடுகள்",
          icon: CheckCircle2
        },
        {
          id: "review-meetings",
          route: "review-meetings",
          labelEn: "Review Meetings",
          labelTa: "ஆய்வுக் கூட்டங்கள்",
          icon: Calendar
        }
      ]
    },
    {
      titleEn: "INTELLIGENCE & KNOWLEDGE",
      titleTa: "நுண்ணறிவு & அறிவு களஞ்சியம்",
      items: [
        {
          id: "ai-agents",
          route: "ai-agents",
          labelEn: "AI Agents",
          labelTa: "செயற்கை நுண்ணறிவு முகவர்கள்",
          icon: Bot
        },
        {
          id: "risk-intelligence",
          route: "risk-intelligence",
          labelEn: "Risk Intelligence",
          labelTa: "இடர் பகுப்பாய்வு",
          icon: Flame
        },
        {
          id: "government-orders",
          route: "government-orders",
          labelEn: "Government Orders",
          labelTa: "அரசாணைகள் (G.O.)",
          icon: FileText
        },
        {
          id: "policy-library",
          route: "policy-library",
          labelEn: "Policy & Scheme Library",
          labelTa: "கொள்கை & திட்ட நூலகம்",
          icon: BookOpen
        },
        {
          id: "knowledge-search",
          route: "knowledge-search",
          labelEn: "Knowledge Search",
          labelTa: "அறிவுசார் தேடல்",
          icon: Search
        },
        {
          id: "data-sources",
          route: "data-sources",
          labelEn: "Data Sources",
          labelTa: "அரசு தரவு மூலங்கள்",
          icon: RefreshCw
        }
      ]
    },
    {
      titleEn: "EXPLORE PLATFORM",
      titleTa: "தளத்தை ஆராய்க",
      items: [
        {
          id: "explore",
          route: "explore",
          labelEn: "All Dashboards",
          labelTa: "அனைத்து முகப்புத் தளங்கள்",
          icon: Compass
        }
      ]
    },
    {
      titleEn: "ADMINISTRATION",
      titleTa: "நிர்வாக அமைப்புகள்",
      items: [
        {
          id: "users-roles",
          route: "users-roles",
          labelEn: "Users & Roles",
          labelTa: "பயனர்கள் & அதிகாரங்கள்",
          icon: Users
        },
        {
          id: "data-sync",
          route: "data-sync",
          labelEn: "Data Synchronization",
          labelTa: "தரவு ஒத்திசைவு",
          icon: RefreshCw
        },
        {
          id: "audit-logs",
          route: "audit-logs",
          labelEn: "Audit Logs",
          labelTa: "தணிக்கை பதிவுகள்",
          icon: Lock
        },
        {
          id: "settings",
          route: "settings",
          labelEn: "Settings",
          labelTa: "அமைப்புகள்",
          icon: Settings
        }
      ]
    }
  ];

  const handleNavClick = (route: string) => {
    if (route === 'copilot') {
      onOpenCopilot();
    } else {
      setCurrentRoute(route);
    }
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-18' : 'w-72 max-w-[85vw]'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-3 sm:px-4 border-b border-slate-800/80 bg-slate-900/50">
          <button
            onClick={() => handleNavClick('cm-command')}
            className="flex items-center gap-2.5 sm:gap-3 text-left overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-800 to-rose-900/40 border border-amber-500/40 shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-amber-400 font-extrabold text-base">வெ</span>
            </div>
            {!sidebarCollapsed && (
              <div className="truncate">
                <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
                  <span>{isTa ? 'வெற்றி TN AI OS' : 'VETTRI TN AI OS'}</span>
                </div>
                <div className="text-[10px] text-amber-400 font-medium truncate">
                  {isTa ? 'தலைமை நிர்வாக தளம்' : 'Executive AI Governance'}
                </div>
              </div>
            )}
          </button>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              title="Close menu"
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin">
          {SECTIONS.map((section) => {
            const isExpanded = expandedSections[section.titleEn] ?? true;
            return (
              <div key={section.titleEn} className="space-y-1">
                {/* Section Header */}
                {!sidebarCollapsed ? (
                  <button
                    onClick={() => toggleSection(section.titleEn)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold tracking-wider text-slate-400 hover:text-slate-200 uppercase transition-colors"
                  >
                    <span>{isTa ? section.titleTa : section.titleEn}</span>
                    <span className="text-slate-400">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="h-2 border-b border-slate-900 my-1" />
                )}

                {/* Section Items */}
                {(sidebarCollapsed || isExpanded) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive =
                        currentRoute === item.route ||
                        (item.route === 'cm-command' && currentRoute === '');
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.route)}
                          title={isTa ? item.labelTa : item.labelEn}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                          } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isActive
                                ? 'text-amber-400 scale-110'
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          />
                          {!sidebarCollapsed && (
                            <>
                              <span className="truncate flex-1 text-left">
                                {isTa ? item.labelTa : item.labelEn}
                              </span>
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    item.badge.color === 'red'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                      : item.badge.color === 'amber'
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                      : item.badge.color === 'emerald'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                  }`}
                                >
                                  {item.badge.count}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Quick Profile / Status */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {!sidebarCollapsed && (
              <div className="text-[11px] text-slate-400 truncate">
                <span className="text-emerald-400 font-semibold font-mono">LIVE </span>
                <span>• State Portal Telemetry</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

function LandmarkIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function ShieldCheckIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

