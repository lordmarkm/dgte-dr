import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from '@los/shared/shared.module';
import { BorrowerRoutingModule } from './borrower-routing.module';
import { Components, EntryComponents } from './components';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ArchwizardModule,
    SharedModule,
    BorrowerRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  entryComponents: [
    EntryComponents
  ]
})
export class BorrowerModule { }
