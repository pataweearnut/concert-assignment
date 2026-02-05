export interface Reservation {
  id: number;
  userId: string;
  concertId: number;
  status: 'RESERVE' | 'CANCEL';
  createdAt: string;
}
