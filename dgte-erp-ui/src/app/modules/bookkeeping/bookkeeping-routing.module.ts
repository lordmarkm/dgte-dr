import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookkeepingComponent } from './bookkeeping.component';
import { TransactionListComponent, CoaComponent, BalanceSheetComponent, ComparativeBalanceSheetComponent, NotificationsComponent } from './components';

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
      },
      {
        path: 'balance-sheet',
        component: BalanceSheetComponent
      },
      {
        path: 'comparative-balance-sheet',
        component: ComparativeBalanceSheetComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookkeepingRoutingModule { }
