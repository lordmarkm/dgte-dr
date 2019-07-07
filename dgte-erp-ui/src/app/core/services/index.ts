export * from './http-cancel.service';
export * from './store.service';
export * from './admin.service';
export * from './auth.service';
export * from './loans.service';
export * from './confirmation-modal/confirmation-modal.service';
export * from './loan-application-flow.guard.service';
export * from './can-deactivate-guard.service';
export * from './person.service';
export * from './transaction.service';
export * from './project.service';
export * from './account.service';

import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { LoansService } from './loans.service';
import { PersonService } from './person.service';
import { TransactionService } from './transaction.service';
import { ProjectService } from './project.service';
import { AccountService } from './account.service';

export const ApiServices = [
  AuthService,
  AdminService,
  LoansService,
  PersonService,
  TransactionService,
  ProjectService,
  AccountService
]
