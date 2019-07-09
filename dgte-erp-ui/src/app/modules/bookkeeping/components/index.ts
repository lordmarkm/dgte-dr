import { BookkeepingComponent } from '../bookkeeping.component';
import { TransactionListComponent } from './transactions/transaction-list.component';
import { CoaComponent } from './chart-of-accounts/coa.component';
//modals
import { CreateTransactionModalComponent } from './create-transaction-modal/create-transaction-modal.component';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';

export const Components = [
    BookkeepingComponent,
    TransactionListComponent,
    CoaComponent,

    //modals
    CreateTransactionModalComponent,
    ViewTransactionModalComponent,
];

export const EntryComponents = [
  CreateTransactionModalComponent,
  ViewTransactionModalComponent,
];

export {
  BookkeepingComponent,
  TransactionListComponent,
  CoaComponent,
  //modals
  CreateTransactionModalComponent,
  ViewTransactionModalComponent,
};
