import { NgModule } from '@angular/core';
import { ComakerRoutingModule } from '@los/modules/co-maker/comaker-routing.module';
import { SharedModule } from '@los/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { Components } from './components';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ArchwizardModule,
    SharedModule,
    ComakerRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class CoMakerModule { }
