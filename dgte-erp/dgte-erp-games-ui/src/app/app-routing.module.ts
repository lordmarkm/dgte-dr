import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@los/shared/components/404/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/landing/landing.module#LandingModule' },
  { path: 'user-profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
