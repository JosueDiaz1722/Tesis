import { Component, OnInit } from '@angular/core';
import { sampleData } from "./datasource";
import { PageSettingsModel,EditSettingsModel } from "@syncfusion/ej2-angular-treegrid";
import { SaveEventArgs } from "@syncfusion/ej2-grids";
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public data: Object[];
  isDisabled= false;
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public taskData: ITaskModel;
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
  
  actionBegin(args:SaveEventArgs): void
  {
    if(args.requestType == "beginEdit"||args.requestType=="add")
    {
      this.taskData = Object.assign({},args.rowData);
    }
  }

  onValChange(value){
    console.log(value);

  }

}
export interface ITaskModel{
    taskId?: Number;
    taskName?: String;
    startDate?: Date;
    endDate?: Date;
    duration?: Number;
    progress?: Number;
    priority?: String;
}
