import { Component, OnInit } from '@angular/core';
import { sampleData } from "./datasource";
import { PageSettingsModel,EditSettingsModel } from "@syncfusion/ej2-angular-treegrid";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public data: Object[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public numericParams: Object;
  constructor() { }

  ngOnInit(): void {
    this.data = sampleData;
    this.pageSettings = {pageSize: 6};
    this.editSettings =  {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode:'Dialog'
    };
    this.toolbar = ['Add','Edit','Delete','Update','Cancel'];
    this.numericParams = {params: {format: 'n'}};
   
  }
  

}
