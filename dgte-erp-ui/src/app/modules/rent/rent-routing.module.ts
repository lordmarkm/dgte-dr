import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentComponent } from './rent.component';
import { RoomsComponent, ApartmentDetailsComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'apartment-details', pathMatch: 'full' },
  {
    path: '',
    component: RentComponent,
    children: [
      {
        path: 'apartment-details',
        component: ApartmentDetailsComponent
      },
      {
        path: 'rooms',
        component: RoomsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
