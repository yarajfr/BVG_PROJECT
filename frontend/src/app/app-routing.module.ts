import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from "./register";
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
