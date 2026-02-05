import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Role } from '../types';

interface AuthState {
  userId: string;
  role: Role;
  switchRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userId, setUserId] = useState('demo-user');
  const [role, setRole] = useState<Role>('ADMIN');

  useEffect(() => {
    if (router.pathname.startsWith('/admin')) {
      setRole('ADMIN');
    } else if (router.pathname.startsWith('/user')) {
      setRole('USER');
    }
  }, [router.pathname]);

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    router.push(newRole === 'ADMIN' ? '/admin' : '/user');
  };

  const logout = () => {
    setRole('USER');
    setUserId('demo-user');
    router.push('/user');
  };

  return (
    <AuthContext.Provider
      value={{ role, userId, switchRole, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
