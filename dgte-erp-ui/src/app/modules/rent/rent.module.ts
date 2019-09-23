import { NgModule } from '@angular/core';
import { SharedModule } from '@los/shared/shared.module';
import { RentRoutingModule } from './rent-routing.module';
import { Components, EntryComponents } from './components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { RentServices } from './services';

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    SharedModule,
    RentRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TreeModule.forRoot()
  ],
  entryComponents: [
    EntryComponents
  ],
  providers: [
    ...RentServices
  ]
})
export class RentModule { }
