import { NgModule } from '@angular/core';
import { SharedModule } from '@los/shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { Components, EntryComponents } from './components';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EntryComponents
  ]
})
export class UserProfileModule { }
