import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonthlyGoalsService } from './monthly-goals.service';
import { Goal } from './monthly-goals.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  standalone: true,
  selector: 'app-monthly-goals',
  imports: [CommonModule, FormsModule],
  templateUrl: './monthly-goals.component.html',
  styleUrls: ['./monthly-goals.component.scss']
})
export class MonthlyGoalsComponent implements OnInit {
  today = new Date();
  selectedMonth: string = this.today.toISOString().slice(0, 7); // format YYYY-MM
  daysInMonth = this.getDaysInMonth(this.selectedMonth);
  newGoal: Partial<Goal> = {};
  goals: Goal[] = [];
  customCategory = '';

  constructor(private goalService: MonthlyGoalsService) {}

  ngOnInit() {
    this.loadGoals();
    this.goalService.goals$.subscribe(goals => {
      this.goals = goals.filter(g => g.selectedMonth === this.selectedMonth);
    });
  }

  getDaysInMonth(month: string): number {
    const [year, monthNum] = month.split('-').map(Number);
    return new Date(year, monthNum, 0).getDate();
  }

  onMonthChange() {
    this.daysInMonth = this.getDaysInMonth(this.selectedMonth);
    this.loadGoals();
  }

  loadGoals() {
    this.goalService.fetchGoals(this.selectedMonth);
  }

  addGoal() {
    if (!this.newGoal.title) return;

    const goal = {
      id: uuidv4(),
      title: this.newGoal.title!,
      description: this.newGoal.description || '',
      category: this.customCategory || this.newGoal.category || '',
      totalDays: this.newGoal.totalDays || this.daysInMonth,
      selectedMonth: this.selectedMonth,
      progress: {},
    };

    this.goalService.addGoal(goal).subscribe(() => {
      this.loadGoals();
      this.newGoal = {};
      this.customCategory = '';
    });
  }

  toggleProgress(goal: Goal, day: number) {
    const newValue = !goal.progress[day];
    this.goalService.updateProgress(goal.id, day, newValue).subscribe(() => {
      goal.progress[day] = newValue;
    });
  }

  getCompletionRate(goal: Goal): number {
    const doneDays = Object.values(goal.progress).filter(v => v).length;
    return Math.round((doneDays / goal.totalDays) * 100);
  }

  getFeedback(rate: number): string {
    if (rate >= 80) return 'Super discipliné ! 🎯';
    if (rate >= 50) return 'En bonne voie 🚀';
    return 'À améliorer, tu peux y arriver 💪';
  }
}
