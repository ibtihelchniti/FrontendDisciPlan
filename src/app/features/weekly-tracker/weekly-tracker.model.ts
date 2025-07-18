export interface WeeklyGoal {
  id: number;
  title: string;
  description?: string;
  week: Date; // start of the week (Monday)
  daysStatus: ('none' | 'done' | 'missed')[]; // length 7
}
