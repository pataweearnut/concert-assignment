import { useEffect, useMemo, useState } from 'react';
import { Layout } from '../../components/Layout';
import { apiFetch } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { interFont } from '@/src/lib/font';
import { Reservation } from '@/src/types/Reservation';

const PAGE_SIZE = 10;

export default function History() {
  const { userId, role } = useAuth();
  const [history, setHistory] = useState<Reservation[]>([]);
  const [page, setPage] = useState(1);

  const fetchReservation = () =>
    apiFetch<Reservation[]>('/reservations', {
      method: 'GET',
      userId,
      role,
    }).then(setHistory);

  useEffect(() => {
    fetchReservation();
  }, []);

  const totalPages = Math.ceil(history.length / PAGE_SIZE);
  const headerClassNames = `border border-gray-400 px-3 py-[10px] text-left font-semibold text-20px`;
  const detailClassName = `border border-gray-400 px-4 py-3 ${interFont.className} font-thin`;
  const pagedHistory = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, page]);

  return (
    <Layout>
      <div className={`p-10 mt-4 ${interFont.className}`}>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 border-collapse">
            <thead>
              <tr>
                <th className={headerClassNames}>Date time</th>
                <th className={headerClassNames}>Username</th>
                <th className={headerClassNames}>Concert name</th>
                <th className={headerClassNames}>Action</th>
              </tr>
            </thead>

            <tbody>
              {pagedHistory.map((h) => (
                <tr key={h.id}>
                  <td className={detailClassName}>{new Date(h.createdAt).toLocaleString()}</td>
                  <td className={detailClassName}>{h.userId}</td>
                  <td className={detailClassName}>Concert #{h.concertId}</td>
                  <td className={detailClassName}>
                    {h.status === 'RESERVE' ? 'Reserve' : 'Cancel'}
                  </td>
                </tr>
              ))}

              {pagedHistory.length === 0 && (
                <tr>
                  <td colSpan={4} className={`text-center ${detailClassName}`}>
                    No history
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
