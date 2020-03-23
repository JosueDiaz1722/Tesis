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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    ActorComponent,
    DialogBoxComponent,

    ThemeComponent
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
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    FormsModule,                               
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [PageService, SortService, FilterService, EditService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
