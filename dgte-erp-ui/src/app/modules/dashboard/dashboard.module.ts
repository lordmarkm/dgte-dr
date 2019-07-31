import { NgModule } from '@angular/core';
import { SharedModule } from '@los/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Components, EntryComponents } from './components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    GoogleChartsModule,
  ],
  entryComponents: [
    EntryComponents
  ]
})
export class DashboardModule { }
