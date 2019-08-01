import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ProfitAndLossComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'profit-and-loss', pathMatch: 'full' },
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'profit-and-loss',
        component: ProfitAndLossComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
