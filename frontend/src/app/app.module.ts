import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeComponent } from './liste/liste.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReadComponent } from './all/read/read.component';
import {BackendService} from "./shared/backend.service";
import { CreateComponent } from './all/create/create.component';
import { UpdateComponent } from './all/update/update.component';
import { DeleteComponent } from './all/delete/delete.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { PencilSquare } from 'ngx-bootstrap-icons';
import { BusdatenReadComponent } from './busdaten/busdaten-read/busdaten-read.component';
import { MapComponent } from './map/map.component';

const icons = {
  PencilSquare,
};


@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    DashboardComponent,
    AboutComponent,
    TasksComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    BusdatenReadComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(icons)

  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
