import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ActorComponent } from './actor/actor.component';
import { ThemeComponent } from './theme/theme.component';
import {ActoresComponent} from './actores/actores.component';
import {LinkListComponent} from './link-list/link-list.component';
import {CreateLinkComponent} from './create-link/create-link.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  
  {
    path: 'actor', component: ActorComponent
  },
  {
    path: 'theme', component: ThemeComponent
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
