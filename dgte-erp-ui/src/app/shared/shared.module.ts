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


// uncomment when needed
import { Components, EntryComponents } from './components';
import { Directives } from './directives';
import { Pipes } from './pipes';

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
    ...Components,
    ...Directives,
    ...Pipes,
  ],
  declarations: [
    ...Components,
    ...Directives,
    ...Pipes,
  ],
  entryComponents: [
    ...EntryComponents,
  ],
})
export class SharedModule { }
