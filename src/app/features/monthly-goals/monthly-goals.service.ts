import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Goal } from './monthly-goals.model';

interface GoalCreate extends Partial<Goal> {
  title: string;
  selectedMonth: string;
}

@Injectable({ providedIn: 'root' })
export class MonthlyGoalsService {
  private goalsSubject = new BehaviorSubject<Goal[]>([]);
  goals$ = this.goalsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchGoals(month: string): void {
    this.http.get<Goal[]>(`/api/goals/?month=${month}`).subscribe(goals => {
      this.goalsSubject.next(goals);
    });
  }

  addGoal(goal: GoalCreate): Observable<Goal> {
    return this.http.post<Goal>('/api/goals/', goal);
  }

  updateProgress(goalId: string, day: number, value: boolean): Observable<any> {
    return this.http.patch(`/api/goals/${goalId}/progress/`, { day, value });
  }
}
