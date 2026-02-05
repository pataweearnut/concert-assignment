import { SummaryCardItem } from '@/src/types/SummaryCard';

export const SUMMARY_CARD_CONFIG: Omit<SummaryCardItem, 'value'>[] = [
  {
    key: 'totalSeats',
    title: 'Total of seats',
    icon: '/images/user.svg',
    bgcolor: '#0070A4',
  },
  {
    key: 'totalReserved',
    title: 'Reserve',
    icon: '/images/award.svg',
    bgcolor: '#00A58B',
  },
  {
    key: 'totalCanceled',
    title: 'Cancel',
    icon: '/images/x-circle.svg',
    bgcolor: '#F96464',
  },
];
