import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MbscModule } from '@mobiscroll/angular';
import { Ng5SliderModule } from 'ng5-slider';
import { NgBootstrapModule } from './modules/ng-bootstrap.module';
import { NgBusyModule } from 'ng-busy';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//Sidebar 
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// uncomment when needed
import { Components, EntryComponents } from './components';
import { Pipes } from './pipes';
import { Services } from './services';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MbscModule,
    Ng5SliderModule,
    NgBootstrapModule,
    NgBusyModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,
    NgbModule.forRoot(),
    NgxDatatableModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MbscModule,
    NgBootstrapModule,
    NgBusyModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    ...Components,
    ...Pipes,
  ],
  declarations: [
    ...Components,
    ...Pipes,
  ],
  entryComponents: [
    ...EntryComponents,
  ],
  providers: [
    ...Services,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
