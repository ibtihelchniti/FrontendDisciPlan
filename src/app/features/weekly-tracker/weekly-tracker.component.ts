import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeeklyGoal } from './weekly-tracker.model';

@Component({
  standalone: true,
  selector: 'app-weekly-tracker',
  templateUrl: './weekly-tracker.component.html',
  styleUrls: ['./weekly-tracker.component.scss'],
  imports: [
    CommonModule,     // Pour *ngFor, *ngIf, date pipe, etc.
    FormsModule,      // Pour ngModel
    DatePipe          // Pour le pipe 'date'
  ]
})


export class WeeklyTrackerComponent {
  weeklyGoals: WeeklyGoal[] = [];

  weekStart: Date = this.getStartOfWeek(new Date());
  weekDays = Array.from({ length: 7 }, (_, i) =>
    new Date(this.weekStart.getTime() + i * 24 * 60 * 60 * 1000)
  );

  newGoalTitle = '';
  newGoalDescription = '';

  addWeeklyGoal() {
    if (!this.newGoalTitle.trim()) return;

    this.weeklyGoals.push({
      id: Date.now(),
      title: this.newGoalTitle,
      description: this.newGoalDescription,
      week: this.weekStart,
      daysStatus: Array(7).fill('none')
    });

    this.newGoalTitle = '';
    this.newGoalDescription = '';
  }

  toggleStatus(goal: WeeklyGoal, dayIndex: number) {
    const current = goal.daysStatus[dayIndex];
    goal.daysStatus[dayIndex] =
      current === 'none' ? 'done' : current === 'done' ? 'missed' : 'none';
  }

  getProgress(goal: WeeklyGoal): number {
    return goal.daysStatus.filter((d) => d === 'done').length;
  }

  getFeedback(progress: number): string {
    if (progress >= 6) return 'Excellent départ de semaine ! 🚀';
    if (progress >= 4) return 'Tu avances bien ✨';
    return 'Essaie de rester focus 💪';
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(date.setDate(diff));
  }
}
