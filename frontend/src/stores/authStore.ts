import { create } from 'zustand';
import { User, Language, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  language: Language;
  activeRole: UserRole;
  currentRoute: string;
  sidebarCollapsed: boolean;
  setLanguage: (lang: Language) => void;
  setActiveRole: (role: UserRole) => void;
  setCurrentRoute: (route: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'cm-super-01',
  email: 'cmcell@tn.gov.in',
  phone: '+91 44 2567 2345',
  fullNameEn: "Hon'ble Chief Minister of Tamil Nadu",
  fullNameTa: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
  role: 'CHIEF_MINISTER',
  designation: 'Chief Minister',
};

// Check local storage for language preference, defaulting to English as required
const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('vetri_app_language');
    if (saved === 'ta' || saved === 'en') {
      return saved;
    }
  } catch {
    // fallback if localStorage restricted
  }
  return 'en';
};

const getSavedSidebar = (): boolean => {
  try {
    const saved = localStorage.getItem('vetri_sidebar_collapsed');
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return false;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  token: 'mock-initial-session-token-2026',
  language: getSavedLanguage(),
  activeRole: 'CHIEF_MINISTER',
  currentRoute: window.location.hash.replace(/^#\/?/, '') || 'cm-command',
  sidebarCollapsed: getSavedSidebar(),
  setLanguage: (lang) => {
    try {
      localStorage.setItem('vetri_app_language', lang);
    } catch {
      // ignore
    }
    set({ language: lang });
  },
  setActiveRole: (role) => {
    let nameEn = "Hon'ble Chief Minister";
    let nameTa = "மாண்புமிகு முதலமைச்சர்";
    if (role === 'CHIEF_SECRETARY') {
      nameEn = "Dr. M. Sai Kumar, IAS (Chief Secretary)";
      nameTa = "முனைவர் எம். சாய் குமார், இ.ஆ.ப. (தலைமைச் செயலாளர்)";
    } else if (role === 'DISTRICT_COLLECTOR') {
      nameEn = "Thiru Pavankumar G Giriyappanavar, IAS., (Collector, Coimbatore)";
      nameTa = "கிராந்திகுமார் பாடி, இ.ஆ.ப. (மாவட்ட ஆட்சியர், கோவை)";
    } else if (role === 'DEPARTMENT_SECRETARY') {
      nameEn = "T. Udhayachandran, IAS (Finance Secretary)";
      nameTa = "த. உதயசந்திரன், இ.ஆ.ப. (நிதிச் செயலாளர்)";
    }
    set((state) => ({
      activeRole: role,
      user: state.user ? { ...state.user, role, fullNameEn: nameEn, fullNameTa: nameTa } : null,
    }));
  },
  setCurrentRoute: (route) => {
    const clean = route.replace(/^#\/?/, '');
    window.location.hash = `#${clean}`;
    set({ currentRoute: clean });
  },
  toggleSidebar: () => {
    set((state) => {
      const next = !state.sidebarCollapsed;
      try {
        localStorage.setItem('vetri_sidebar_collapsed', JSON.stringify(next));
      } catch {
        // ignore
      }
      return { sidebarCollapsed: next };
    });
  },
  setSidebarCollapsed: (collapsed) => {
    try {
      localStorage.setItem('vetri_sidebar_collapsed', JSON.stringify(collapsed));
    } catch {
      // ignore
    }
    set({ sidebarCollapsed: collapsed });
  },
  setUser: (user, token) => set({ user, token, activeRole: user.role }),
  logout: () => set({ user: null, token: null }),
}));
