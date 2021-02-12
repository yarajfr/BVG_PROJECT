import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from "./register";
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';
import { CreateComponent } from './all/create/create.component';
import { UpdateComponent } from './all/update/update.component';
import { DeleteComponent } from './all/delete/delete.component';
import { BusdatenReadComponent } from "./busdaten/busdaten-read/busdaten-read.component";
import { MeineListeComponent } from "./meine-liste/meine-liste.component";
import {PrueferComponent} from './pruefer/pruefer.component';
import { MapComponent } from './map/map.component';
import { FormularComponent} from "./formular/formular.component";
import { ProtokolleComponent} from "./protokolle/protokolle.component";


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'delete/:id', component: DeleteComponent },
  { path: 'busdaten', component: BusdatenReadComponent },
  { path: 'busdaten/:id', component: BusdatenReadComponent },
  { path: 'meine-liste', component: MeineListeComponent},
  { path: 'pruefer', component: PrueferComponent },
  { path: 'all', component: MapComponent},
  { path: '',   redirectTo: '/all', pathMatch: 'full' },
  { path: 'formular', component: FormularComponent},
  { path: 'protokolle', component: ProtokolleComponent},
  { path: "meine-liste", component:MeineListeComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

