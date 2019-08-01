import { NgModule } from '@angular/core';
import { SharedModule } from '@los/shared/shared.module';
import { BookkeepingRoutingModule } from './bookkeeping-routing.module';
import { Components, EntryComponents } from './components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule,
    BookkeepingRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TreeModule.forRoot()
  ],
  entryComponents: [
    EntryComponents
  ]
})
export class ReportsModule { }
