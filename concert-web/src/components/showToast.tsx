import toast from 'react-hot-toast';
import { ibmPlexSansThaiFont } from '../lib/font';
import Image from 'next/image';

type ToastType = 'success' | 'error';

const STYLES = {
    success: {
        bg: '#DFF0D8',
        iconBg: '#4CAF50'
    },
    error: {
        bg: '#E84E4E',
        iconBg: '#E53935'
    },
};

export function showToast(type: ToastType, message: string) {
    toast.custom(t => {
        const style = STYLES[type];
        const isSuccess = type === 'success'
        return (
            <div
                className={`
          flex items-center justify-between gap-4
          px-5 py-4 rounded-sm min-w-[240px] ${ibmPlexSansThaiFont}
        `}
                style={{ background: style.bg }}
            >
                <div className="flex items-center gap-3">
                    {isSuccess ? (
                        <div
                            className="flex items-center justify-center"
                        >
                            <Image src="/images/check-circle.svg" alt="Success" width={20} height={20} />
                        </div>
                    ) : (
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: style.iconBg }}
                        >
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    )}

                    <span className={`text-[14px] ${!isSuccess ? 'text-white':''}`}>{message}</span>
                </div>

                {/* Close */}
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className={`text-gray-700 hover:text-gray-900 ${!isSuccess ? 'text-white':''}`}
                >
                    ✕
                </button>
            </div>
        );
    });
}
