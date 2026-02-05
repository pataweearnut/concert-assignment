import { useState, useMemo } from 'react';
import Image from 'next/image';
import { apiFetch } from '@/src/lib/api';
import { useAuth } from '@/src/context/AuthContext';
import { Spinner } from './Spinner';
import { showToast } from './showToast';

interface CreateConcertForm {
  name: string;
  description: string;
  totalSeats: number;
};

export function CreateConcert({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const { userId, role } = useAuth();

  const [form, setForm] = useState<CreateConcertForm>({
    name: '',
    description: '',
    totalSeats: 0,
  });

  const [loading, setLoading] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.description.trim().length > 0 &&
      form.totalSeats > 0
    );
  }, [form]);

  const submit = async () => {
    if (!isValid || loading) return;

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        totalSeats: Number(form.totalSeats),
      };

      await apiFetch('/concerts', {
        method: 'POST',
        userId,
        role,
        body: JSON.stringify(payload),
      });

      showToast('success', 'Create successfully');

      setForm({
        name: '',
        description: '',
        totalSeats: 0,
      });

      onCreated();
    } catch (err) {
      showToast('error', 'Failed to create concert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black rounded-xl p-10 border border-[#C2C2C2]">
      <h2 className="text-[28px] md:text-[40px] font-semibold text-[#1692EC] mb-2">
        Create
      </h2>
      <hr className="mb-6 border-[#C2C2C2]" />
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[24px] mb-2">
              Concert Name
            </label>
            <input
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Please input concert name"
              className="w-full border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-[24px] mb-2">
              Total of seat
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.totalSeats}
                onChange={e =>
                  setForm({
                    ...form,
                    totalSeats: Number(e.target.value),
                  })
                }
                min={0}
                placeholder="500"
                className="w-full border border-gray-400 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Image
                src="/images/user-black.svg"
                alt="seat"
                width={24}
                height={24}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-[24px] mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Please input description"
            rows={4}
            className="w-full border border-gray-400 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={submit}
            disabled={!isValid || loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-md text-white transition
              ${!isValid || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }
            `}
          >
            {loading ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              <>
                <Image
                  src="/images/save.svg"
                  alt="save"
                  width={24}
                  height={24}
                />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
