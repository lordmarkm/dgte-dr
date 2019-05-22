import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, ObfuscationHttpInterceptor } from '@los/core/interceptors';
import { SharedModule } from '@los/shared/shared.module';

import { Components, EntryComponents } from './components';

import { ApiServices } from '@los/core/services';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule
  ],
  providers: [
    ...ApiServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ObfuscationHttpInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    ...EntryComponents
  ]
})
export class CoreModule { }
