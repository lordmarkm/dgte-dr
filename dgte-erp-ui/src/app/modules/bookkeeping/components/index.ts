import { BookkeepingComponent } from '../bookkeeping.component';
import { TransactionListComponent } from './transactions/transaction-list.component';
import { CoaComponent } from './chart-of-accounts/coa.component';
//modals
import { CreateTransactionModalComponent } from './create-transaction-modal/create-transaction-modal.component';
import { UpdateTransactionModalComponent } from './create-transaction-modal/update-transaction-modal.component';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';

export const Components = [
    BookkeepingComponent,
    TransactionListComponent,
    CoaComponent,

    //modals
    CreateTransactionModalComponent,
    UpdateTransactionModalComponent,
    ViewTransactionModalComponent,
    CreateAccountModalComponent,
];

export const EntryComponents = [
  CreateTransactionModalComponent,
  UpdateTransactionModalComponent,
  ViewTransactionModalComponent,
  CreateAccountModalComponent,
];

export {
  BookkeepingComponent,
  TransactionListComponent,
  CoaComponent,
  //modals
  CreateTransactionModalComponent,
  UpdateTransactionModalComponent,
  ViewTransactionModalComponent,
  CreateAccountModalComponent,
};
