import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MonthlyGoalsComponent } from './features/monthly-goals/monthly-goals.component';
import { WeeklyTrackerComponent } from './features/weekly-tracker/weekly-tracker.component';
import { DailyTasksComponent } from './features/daily-tasks/daily-tasks.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'monthly-goals', component: MonthlyGoalsComponent },
  { path: 'weekly-tracker', component: WeeklyTrackerComponent },
  { path: 'daily-tasks', component: DailyTasksComponent },
  { path: '**', component: NotFoundComponent },
];
