import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';

import {MatToolbarModule} from '@angular/material/toolbar';

import { MatIconModule } from "@angular/material/icon";

import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { MatTableModule} from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { ActorComponent } from './actor/actor.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ThemeComponent } from './theme/theme.component';
import {DemoMaterialModule} from '../material-module';
import {MatExpansionModule} from '@angular/material/expansion';
import { TreeGridModule, PageService, SortService, FilterService, EditService, ToolbarService } from "@syncfusion/ej2-angular-treegrid";
import { NumericTextBoxAllModule } from "@syncfusion/ej2-angular-inputs";
import { CheckBoxAllModule } from "@syncfusion/ej2-angular-buttons";
import { DatePickerAllModule } from "@syncfusion/ej2-angular-calendars";
import { ActoresComponent } from './actores/actores.component';
import { GraphQLModule } from "./apollo.config";
import { LinkItemComponent } from './link-item/link-item.component';
import { LinkListComponent } from './link-list/link-list.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { MatrizComponent } from './matriz/matriz.component';
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MatrizesComponent } from './matrizes/matrizes.component';
import {CarouselModule} from 'primeng/carousel';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    ActorComponent,
    DialogBoxComponent,

    ThemeComponent,

    ActoresComponent,

    LinkItemComponent,

    LinkListComponent,

    CreateLinkComponent,

    MatrizComponent,

    LoginComponent,

    MatrizesComponent,
  ],
  imports: [
    DatePickerAllModule,
    CheckBoxAllModule,
    NumericTextBoxAllModule,
    TreeGridModule,
    BrowserModule,
    MatExpansionModule,
    DemoMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FormsModule,                               
    ReactiveFormsModule,
    GraphQLModule,
    PivotViewModule,
    HeatMapModule,
    MatButtonToggleModule,
    TableModule,
    ConfirmDialogModule,
    MatCheckboxModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MatCardModule,
    CarouselModule,
    ToastModule,
    TabViewModule,
    CodeHighlighterModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [PageService, SortService, FilterService, EditService, ToolbarService, ConfirmationService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
