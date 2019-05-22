import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HttpTokenInterceptor, ObfuscationHttpInterceptor } from '@los/core/interceptors';
import { ApiServices } from '@los/core/services';
import { SharedModule } from '@los/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { Components, EntryComponents } from './components';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    NgxDatatableModule,
    SharedModule
  ],
  entryComponents: [
    ...EntryComponents
  ],
  providers: [
    ...ApiServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ObfuscationHttpInterceptor,
      multi: true
    },
  ],
})
export class AdminModule { }
