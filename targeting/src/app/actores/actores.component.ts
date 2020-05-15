import { Component, OnInit,ViewChild } from '@angular/core';
import { sampleData } from "./datasource";
import { PageSettingsModel,EditSettingsModel,TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";
import { SaveEventArgs, CommandModel } from "@syncfusion/ej2-grids";
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {

  public data: Object[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public taskData: ITaskModel;
  public numericParams: Object;
  @ViewChild(TreeGridComponent, { static: false }) treegrid: TreeGridComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.data = sampleData;
    this.pageSettings = {pageSize: 12};
    this.editSettings =  {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      newRowPosition: 'Top',
      mode:'Dialog'
    };
    this.toolbar = ['Add','Edit','Delete','Update','Cancel'];
    this.numericParams = {params: {format: 'n'}};
  }

  insert(data: any) : void { 
    var value =  { taskID: 33333, taskName: 'Plan timeline'}; 
    this.treegrid.addRecord(value, data.index);
  // call addRecord method with data and index of parent record as parameters 
  } 
  
  openDialog(action,obj, data: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.treegrid.editSettings.newRowPosition ="Child"
        this.addRowData(result.data,data);
      }else if(result.event == 'Update'){
        
      }else if(result.event == 'Delete'){
        
      }else if(result.event == 'AddNew'){
        this.treegrid.editSettings.newRowPosition ="Bottom"
        this.addNewData(result.data);
      } 
    });
  }
 
  addRowData(row_obj,data){
    
    console.log(data);
    var childRow = {
      taskId: row_obj.id,
        taskName: row_obj.nombre,
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: row_obj.prioridad,
        priority: row_obj.comentario,
        approved: false,
        isInExpandState: true,
        parentId: data.taskId
    };
    this.treegrid.addRecord(childRow, data.index);

  }

  addNewData(row_obj){
    
    var childRow = {
      taskId: row_obj.id,
        taskName: row_obj.nombre,
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: row_obj.prioridad,
        priority: row_obj.comentario,
        approved: false,
        isInExpandState: true,
    };
    this.treegrid.addRecord(childRow, 0);
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

