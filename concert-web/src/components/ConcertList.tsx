'use client';

import { useState } from 'react';
import Image from 'next/image';
import { apiFetch } from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';
import { Concert } from '@/src/types/Concert';
import { ConfirmDeleteModal } from '@/src/components/ConfirmDeleteModel';
import { showToast } from './showToast';

type ConcertListProps = {
  concerts: Concert[];
  onDeleted: () => void;
};

export function ConcertList({ concerts, onDeleted }: ConcertListProps) {
  const { userId, role } = useAuth();
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteConcert = async () => {
    if (!selected) return;

    setLoading(true);
    try {
      await apiFetch(`/concerts/${selected.id}`, {
        method: 'DELETE',
        userId,
        role,
      });

      showToast('success', 'Delete successfuly');
      onDeleted();
    } catch (err) {
      showToast('error', 'Failed to delete concert');
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  const reserve = async (id: number) => {
    setLoading(true);
    try {
      await apiFetch(`/concerts/${id}/reserve`, {
        method: 'POST',
        userId,
        role,
      });

      showToast('success', 'Reserve successfuly');
      onDeleted();
    } catch (err) {
      showToast('error', 'Failed to reserve concert');
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  const cancel = async (id: number) => {
    setLoading(true);
    try {
      await apiFetch(`/concerts/${id}/cancel`, {
        method: 'POST',
        userId,
        role,
      });

      showToast('success', 'Cancel successfuly');
      onDeleted();
    } catch (err) {
      showToast('error', 'Failed to cancel concert');
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {concerts.map((c, k) => (
          <div key={k} className="bg-white text-black rounded-xl p-10 border border-[#C2C2C2]">
            <h3
              className={`text-[#1692EC] text-[28px] ${role === 'ADMIN' ? 'md:text-[32px]' : 'md:text-[40px]'} font-semibold mb-6`}
            >
              {c.name}
            </h3>

            <hr className="mb-4 border-[#C2C2C2]" />

            <p className="text-[18px] md:text-[24px] mb-6">{c.description}</p>

            <div className="flex items-center flex-col sm:flex-row gap-4 justify-between">
              <div className="flex items-center gap-2 text-[24px]">
                <Image src="/images/user-black.svg" alt="seats" width={32} height={32} />
                <span>{c.availableSeats}</span>
              </div>

              {role === 'ADMIN' ? (
                <button
                  onClick={() => setSelected({ id: c.id, name: c.name })}
                  className="flex items-center justify-center gap-[10px] text-[24px] bg-[#E84E4E] w-[160px] hover:bg-red-600 text-white px-[16px] py-[12px] rounded-md cursor-pointer"
                >
                  <Image src="/images/trash.svg" alt="delete" width={24} height={24} />
                  Delete
                </button>
              ) : c.isReservedByUser ? (
                <button
                  onClick={() => cancel(c.id)}
                  className="flex items-center justify-center gap-[10px] text-[24px] bg-[#E84E4E] w-[160px] hover:bg-red-600 text-white px-[16px] py-[12px] rounded-md cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => reserve(c.id)}
                  className="flex items-center justify-center gap-[10px] text-[24px] bg-[#1692EC] w-[160px] hover:bg-blue-500 text-white px-[16px] py-[12px] rounded-md cursor-pointer"
                >
                  Reserve
                </button>
              )}
            </div>
          </div>
        ))}

        {concerts.length === 0 && (
          <div className="text-center text-gray-400">No concerts found</div>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!selected}
        title={selected?.name ?? ''}
        onCancel={() => setSelected(null)}
        onConfirm={deleteConcert}
        loading={loading}
      />
    </>
  );
}
