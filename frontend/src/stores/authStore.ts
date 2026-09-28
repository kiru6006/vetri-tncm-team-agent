import { create } from 'zustand';
import { User, Language, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  language: Language;
  activeRole: UserRole;
  setLanguage: (lang: Language) => void;
  setActiveRole: (role: UserRole) => void;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'cm-super-01',
  email: 'cm@tn.gov.in',
  phone: '+919444000001',
  fullNameEn: "Hon'ble Chief Minister of Tamil Nadu",
  fullNameTa: "மாண்புமிகு தமிழ்நாடு முதலமைச்சர்",
  role: 'CHIEF_MINISTER',
  designation: 'Chief Minister',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  token: 'mock-initial-session-token-2026',
  language: 'ta', // Default to Tamil as primary official state language
  activeRole: 'CHIEF_MINISTER',
  setLanguage: (lang) => set({ language: lang }),
  setActiveRole: (role) => {
    let nameEn = "Hon'ble Chief Minister";
    let nameTa = "மாண்புமிகு முதலமைச்சர்";
    if (role === 'CHIEF_SECRETARY') {
      nameEn = "N. Muruganandam, IAS (Chief Secretary)";
      nameTa = "என். முருகானந்தம், இ.ஆ.ப. (தலைமைச் செயலாளர்)";
    } else if (role === 'DISTRICT_COLLECTOR') {
      nameEn = "Kranthi Kumar Pati, IAS (Collector, Coimbatore)";
      nameTa = "கிராந்திகுமார் பாடி, இ.ஆ.ப. (மாவட்ட ஆட்சியர், கோவை)";
    }
    set((state) => ({
      activeRole: role,
      user: state.user ? { ...state.user, role, fullNameEn: nameEn, fullNameTa: nameTa } : null,
    }));
  },
  setUser: (user, token) => set({ user, token, activeRole: user.role }),
  logout: () => set({ user: null, token: null }),
}));
