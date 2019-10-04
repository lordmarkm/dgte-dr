import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';
import { LandingPageComponent, ShoppingCartPageComponent, CheckoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
