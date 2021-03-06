import { BookkeepingComponent } from '../bookkeeping.component';
import { TransactionListComponent } from './transactions/transaction-list.component';
import { CoaComponent } from './chart-of-accounts/coa.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { ComparativeBalanceSheetComponent } from './balance-sheet/comparative-balance-sheet.component';
import { AccountBalanceComponent } from './balance-sheet/account-balance.component';
import { ComparativeAccountBalanceComponent } from './balance-sheet/comparative-account-balance.component';
import { NotificationsComponent } from './notifications/notifications.component';
//modals
import { CreateTransactionModalComponent } from './create-transaction-modal/create-transaction-modal.component';
import { UpdateTransactionModalComponent } from './create-transaction-modal/update-transaction-modal.component';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { EditAccountModalComponent } from './chart-of-accounts/edit-account-modal/edit-account-modal.component';


export const Components = [
    BookkeepingComponent,
    TransactionListComponent,
    CoaComponent,
    BalanceSheetComponent,
    ComparativeBalanceSheetComponent,
    AccountBalanceComponent,
    ComparativeAccountBalanceComponent,
    NotificationsComponent,

    //modals
    CreateTransactionModalComponent,
    UpdateTransactionModalComponent,
    ViewTransactionModalComponent,
    CreateAccountModalComponent,
    EditAccountModalComponent,
];

export const EntryComponents = [
  CreateTransactionModalComponent,
  UpdateTransactionModalComponent,
  ViewTransactionModalComponent,
  CreateAccountModalComponent,
  EditAccountModalComponent,
];

export {
  BookkeepingComponent,
  TransactionListComponent,
  CoaComponent,
  BalanceSheetComponent,
  ComparativeBalanceSheetComponent,
  AccountBalanceComponent,
  ComparativeAccountBalanceComponent,
  NotificationsComponent,

  //modals
  CreateTransactionModalComponent,
  UpdateTransactionModalComponent,
  ViewTransactionModalComponent,
  CreateAccountModalComponent,
  EditAccountModalComponent,
};
