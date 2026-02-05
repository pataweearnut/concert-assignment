import Image from 'next/image';
import { ibmPlexSansThaiFont } from '@/src/lib/font';

type ConfirmDeleteModalProps = {
  open: boolean;
  title: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  open,
  title,
  loading,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${ibmPlexSansThaiFont.className}`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="relative bg-white rounded-xl shadow-lg w-[420px] p-6 text-center z-10">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
            <Image src="/images/x-circle-red.svg" alt="close" width={48} height={48} />
          </div>
        </div>

        <h3 className="text-[20px] font-bold mb-2">Are you sure to delete?</h3>

        <p className="text-[20px] font-bold mb-6">
          “<span className="font-semibold">{title}</span>”
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-100 text-[16px] px-4 py-3 border border-gray-300 rounded-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-100 text-[16px] px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-sm disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
