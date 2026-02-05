import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Role } from '../types/role';

interface AuthState {
  userId: string;
  role: Role;
  switchRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function generateUserId() {
  return `user-${Math.random().toString(36).slice(2, 8)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('demo-user');
  const [role, setRole] = useState<Role>('ADMIN');

  useEffect(() => {
    const storedUserId = localStorage.getItem('demo-user-id');

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateUserId();
      localStorage.setItem('demo-user-id', newUserId);
      setUserId(newUserId);
    }
  }, []);

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
    const newUserId = generateUserId();
    localStorage.setItem('demo-user-id', newUserId);

    setUserId(newUserId);
    setRole('USER');
    router.push('/user');
  };

  return (
    <AuthContext.Provider
      value={{ userId, role, switchRole, logout }}
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
