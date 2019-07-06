import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AdminComponent,
  EndorsementsComponent,
  AdminLoginComponent,
  AdminChangePasswordComponent,
  UserInfoComponent,
  LoanDetailsComponent,
  CompanyComponent,
  CompanyDetailsComponent
} from '@los/modules/admin/components';

const routes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'change-password',
    component: AdminChangePasswordComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'loans',
        component: EndorsementsComponent
      },
      {
        path: 'loans/:id',
        component: LoanDetailsComponent
      },
      {
        path: 'user',
        component: UserInfoComponent
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'company/:id',
        component: CompanyDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
