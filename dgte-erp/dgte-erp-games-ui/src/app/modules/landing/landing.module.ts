import { NgModule } from '@angular/core';
import { SharedModule } from '@los/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { Components, EntryComponents } from './components';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule,
    LandingRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EntryComponents
  ]
})
export class LandingModule { }
