import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BorrowerComponent, LandingPageComponent, ContractConfirmationComponent, ApplicationFormComponent,
  CompletionPageComponent, VerifyPageComponent, LoanStatusPageComponent, LoanDetailsPageComponent,
  AcceptLoanPageComponent, AcceptLoanCompletionPageComponent } from './components';
import { LoanApplicationFlowGuard, CanDeactivateGuard } from '@los/core/services';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '/directory',
        component: DirectoryComponent,
      }
    ]
  },
  // show landing page with id and code
  {
    path: '',
    component: BorrowerComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'check-loan-status',
        component: VerifyPageComponent,
      },
      {
        path: 'loan-status',
        component: LoanStatusPageComponent,
      },
      {
        path: 'loan-details',
        component: LoanDetailsPageComponent,
      },
      {
        path: 'accept-loan',
        component: AcceptLoanPageComponent,
      },
      {
        path: 'accept-loan-completion',
        component: AcceptLoanCompletionPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowerRoutingModule { }
