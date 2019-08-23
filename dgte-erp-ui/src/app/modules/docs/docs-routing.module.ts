import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocsComponent } from './docs.component';
import { WizardListComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'wizard-designer', pathMatch: 'full' },
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: 'wizard-list',
        component: WizardListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
