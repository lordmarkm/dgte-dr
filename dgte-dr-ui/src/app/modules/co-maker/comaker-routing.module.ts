import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComakerComponent } from '@los/modules/co-maker/comaker.component';
import { ComakerLoginComponent, ContractConfirmationComponent, ApplicationFormComponent, CompletionPageComponent }
  from '@los/modules/co-maker/components';
import { LoanApplicationFlowGuard, CanDeactivateGuard } from '@los/core/services';


const routes: Routes = [
  {
    path: ':code/:id/:referenceId/:coMakerId',
    component: ComakerComponent,
    children: [
      {
        path: '',
        component: ComakerLoginComponent,
      },
      {
        path: 'confirmation',
        component: ContractConfirmationComponent,
        canActivate: [LoanApplicationFlowGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'application-form',
        component: ApplicationFormComponent,
        canActivate: [LoanApplicationFlowGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'completion',
        component: CompletionPageComponent,
        canActivate: [LoanApplicationFlowGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComakerRoutingModule { }
