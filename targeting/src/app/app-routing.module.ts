import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ActorComponent } from './actor/actor.component';
import { ThemeComponent } from './theme/theme.component';
import {ActoresComponent} from './actores/actores.component';
import {LinkListComponent} from './link-list/link-list.component';
import {CreateLinkComponent} from './create-link/create-link.component';
import { MatrizComponent } from "./matriz/matriz.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth/auth.guard';
import {MatrizesComponent} from './matrizes/matrizes.component';
import { RegisterComponent } from "./register/register.component";

import { MatSidenavModule } from "@angular/material/sidenav";


const routes: Routes = [
  {
    path: 'matrices', component: MatrizesComponent
  },
  {
    path: 'matriz', component: MatrizComponent
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'refresh', component: MatrizComponent
  },
  {
    path: 'refresh1', component: AboutComponent
  },

  {
    path: 'actor', component: ActorComponent
  },
  {
    path: 'temas', component: ThemeComponent
  },
  {
    path: 'actores', component: ActoresComponent
  },
  {
    path: 'list',
    component: LinkListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateLinkComponent,
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MatSidenavModule]
})
export class AppRoutingModule { }
