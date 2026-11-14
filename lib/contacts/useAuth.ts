import { useState, useEffect } from 'react';
import { UserRole, UserSession } from '@/types/contacts';

const DEFAULT_USER: UserSession = {
  user_id: 'usr-cm-001',
  name: "Hon'ble Chief Minister / CMO Secretariat",
  role: 'CM',
  department: 'Public / CMO',
};

export function useAuth() {
  const [user, setUser] = useState<UserSession>(DEFAULT_USER);
  const [role, setRoleState] = useState<UserRole>('CM');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('vetri_contacts_user_role') as UserRole | null;
      if (storedRole && ['CM', 'PS', 'SECRETARY', 'ANALYST', 'READONLY'].includes(storedRole)) {
        setRoleState(storedRole);
        setUser((prev) => ({ ...prev, role: storedRole }));
      }
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser((prev) => ({ ...prev, role: newRole }));
    if (typeof window !== 'undefined') {
      localStorage.setItem('vetri_contacts_user_role', newRole);
    }
  };

  return { user, role, setRole };
}
