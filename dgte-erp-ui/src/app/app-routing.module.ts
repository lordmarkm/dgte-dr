import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@los/shared/components/404/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'bookkeeping', pathMatch: 'full' },
  { path: 'welcome', loadChildren: './modules/landing/landing.module#LandingModule' },
  { path: 'bookkeeping', loadChildren: './modules/bookkeeping/bookkeeping.module#BookkeepingModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'reports', loadChildren: './modules/reports/reports.module#ReportsModule' },
  { path: 'docs', loadChildren: './modules/docs/docs.module#DocsModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
