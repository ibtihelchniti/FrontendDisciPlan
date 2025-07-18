export interface Goal {
  id: string;
  title: string;
  description?: string;
  category?: string;
  totalDays: number;
  selectedMonth: string; // format YYYY-MM
  progress: Record<number, boolean>; // ex: {1: true, 2: false, ...}
}
