import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookkeepingComponent } from './bookkeeping.component';
import { TransactionListComponent } from './components';
import { CoaComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: '',
    component: BookkeepingComponent,
    children: [
      {
        path: 'transactions',
        component: TransactionListComponent
      },
      { path: 'chart-of-accounts',
        component: CoaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookkeepingRoutingModule { }
