import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@los/shared/components/404/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/b', pathMatch: 'full' },
  { path: 'b',
    loadChildren: './modules/borrower/borrower.module#BorrowerModule' },
  { path: 'c',
    loadChildren: './modules/co-maker/comaker.module#CoMakerModule' },
  { path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
