import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { apiFetch } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Concert } from '../../types/Concert';
import { ConcertList } from '@/src/components/ConcertList';

export default function UserHome() {
  const { userId, role } = useAuth();
  const [concerts, setConcerts] = useState<Concert[]>([]);

  const fetchConcerts = () =>
    apiFetch<Concert[]>('/concerts/reservations', {
        method: 'GET',
        userId,
        role,
    }).then(setConcerts);

  useEffect(() => {
    fetchConcerts();
  }, [userId]);

  return (
    <Layout>
      <div className="min-h-screen p-10">
        <ConcertList
            concerts={concerts}
            onDeleted={fetchConcerts}
        />
      </div>
    </Layout>
  );
}
