import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { IIFAComponent } from './iifa/iifa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '2auth', component: IIFAComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
