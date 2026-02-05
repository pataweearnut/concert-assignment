import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.replace(role === 'ADMIN' ? '/admin' : '/user');
  }, [role]);

  return null;
}
