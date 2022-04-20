import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo:'/Login', pathMatch: 'full' },
  { path: '**', redirectTo:'/Login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
