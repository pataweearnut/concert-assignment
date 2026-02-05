import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { apiFetch } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Concert } from '../../types/Concert';
import { Statistics } from '../../types/Statistic';
import { SummaryCard } from '@/src/components/SummaryCard';
import { SUMMARY_CARD_CONFIG } from '@/src/config/summaryCard';
import { CreateConcert } from '@/src/components/CreateConcert';
import { ConcertList } from '@/src/components/ConcertList';

export default function AdminDashboard() {
  const { userId, role } = useAuth();
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'create'>('overview');

  const fetchConcerts = () =>
    apiFetch<Concert[]>('/concerts', {
      method: 'GET',
      userId,
      role,
    }).then(setConcerts);

  const fetchSummaryStats = () =>
    apiFetch<Statistics>('/statistics', {
      method: 'GET',
      userId,
      role,
    }).then(setStatistics);

  useEffect(() => {
    fetchConcerts();
    fetchSummaryStats();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 xl:gap-6 mb-8">
          {SUMMARY_CARD_CONFIG.map((item, index) => {
            return (
              <SummaryCard
                key={index}
                title={item.title}
                value={statistics?.[item.key] ?? 0}
                icon={item.icon}
                bgcolor={item.bgcolor}
              />
            );
          })}
        </div>
        <div className="flex gap-8 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-3 text-[24px] cursor-pointer ${
              activeTab === 'overview'
                ? 'text-[#1692EC] border-b-2 border-[#1692EC] font-semibold'
                : 'text-[#5C5C5C] hover:text-[#1692EC]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2 px-3 text-[24px] cursor-pointer ${
              activeTab === 'create'
                ? 'text-[#1692EC] border-b-2 border-[#1692EC] font-semibold'
                : 'text-[#5C5C5C] hover:text-[#1692EC]'
            }`}
          >
            Create
          </button>
        </div>

        {activeTab === 'overview' ? (
          <ConcertList
            concerts={concerts}
            onDeleted={() => {
              fetchConcerts();
              fetchSummaryStats();
            }}
          />
        ) : (
          <CreateConcert
            onCreated={() => {
              fetchConcerts();
              fetchSummaryStats();
              setActiveTab('overview');
            }}
          />
        )}
      </div>
    </Layout>
  );
}
