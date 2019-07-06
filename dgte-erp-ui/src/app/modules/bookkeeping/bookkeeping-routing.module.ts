import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookkeepingComponent } from './bookkeeping.component';
import { TransactionListComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'transactions',
        component: TransactionListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookkeepingRoutingModule { }
