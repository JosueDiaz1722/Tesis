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



const routes: Routes = [
  {
    path: 'matrices', component: MatrizesComponent
  },
  {
    path: 'matriz', component: MatrizComponent
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'refresh', component: MatrizComponent
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
