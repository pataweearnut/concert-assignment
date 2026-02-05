import { Statistics } from './Statistic';

export interface SummaryCardItem {
  key: keyof Statistics;
  title: string;
  value: number;
  icon: string;
  bgcolor: string;
}
