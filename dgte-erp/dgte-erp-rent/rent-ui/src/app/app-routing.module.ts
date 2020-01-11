import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, RentPaymentListComponent, RentPaymentAddComponent } from './components';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'rent-payment',
        component: RentPaymentListComponent
    },
    {
        path: 'rent-payment-add',
        component: RentPaymentAddComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
