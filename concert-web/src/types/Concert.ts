export interface Concert {
    id: number;
    name: string;
    description: string;
    totalSeats: number;
    availableSeats: number;
    isReservedByUser?: boolean;
  }