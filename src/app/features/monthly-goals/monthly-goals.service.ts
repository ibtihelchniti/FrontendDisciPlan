import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Goal } from './monthly-goals.model';

@Injectable({ providedIn: 'root' })
export class MonthlyGoalsService {
  private goalsSubject = new BehaviorSubject<Goal[]>([]);
  goals$ = this.goalsSubject.asObservable();

  addGoal(goal: Goal) {
    const goals = this.goalsSubject.value;
    this.goalsSubject.next([...goals, goal]);
  }

  updateGoal(updated: Goal) {
    const goals = this.goalsSubject.value.map(g =>
      g.id === updated.id ? updated : g
    );
    this.goalsSubject.next(goals);
  }

  getGoalsForMonth(month: string): Goal[] {
    return this.goalsSubject.value.filter(g => g.selectedMonth === month);
  }
}
