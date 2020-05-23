import { Component, OnInit,ViewChild } from '@angular/core';
import { sampleData } from "./datasource";
import { PageSettingsModel,EditSettingsModel,TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";
import { SaveEventArgs, CommandModel } from "@syncfusion/ej2-grids";
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';
import {Apollo} from 'apollo-angular';
import {Actor} from '../types';
import {Router} from '@angular/router';

// 1
import {DELETE_ACTOR_MUTATION,UPDATE_ACTOR_MUTATION,CREATE_ACTOR_MUTATION, ALL_ACTORES_QUERY, CREATE_NEW_ACTOR_MUTATION} from '../graphql';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {

  allLinks: Actor[] = [];
  loading: boolean = true;
  public data: Object[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public taskData: ITaskModel;
  public numericParams: Object;
  @ViewChild(TreeGridComponent, { static: false }) treegrid: TreeGridComponent;

  constructor(public dialog: MatDialog, private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['actors'];
      this.loading = response.loading;
     }); 
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
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }else if(result.event == 'AddNew'){
        this.treegrid.editSettings.newRowPosition ="Bottom"
        this.addNewData(result.data);
      } 
    });
  }

  dataSource(){ 
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network', 
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['actors'];
      this.treegrid.dataBind();
     }); 
  }
 
  addRowData(row_obj,data){
    this.apollo.mutate({
      mutation: CREATE_ACTOR_MUTATION,
      variables: {
       name: row_obj.name,
       prioridad: parseInt(row_obj.prioridad),
       coments: row_obj.coments,
       id: data.id
      }
    }).subscribe((response) => {
        this.dataSource();
    });
  }

  addNewData(row_obj){
    this.apollo.mutate({
      mutation: CREATE_NEW_ACTOR_MUTATION,
      variables: {
       name: row_obj.name,
       prioridad: parseInt(row_obj.prioridad),
       coments: row_obj.coments,
      }
    }).subscribe((response) => {
        this.dataSource();
    });

    
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
  }

  updateRowData(row_obj){
    this.apollo.mutate({
      mutation: UPDATE_ACTOR_MUTATION,
      variables: {
       name: row_obj.name,
       prioridad: parseInt(row_obj.prioridad),
       coments: row_obj.coments,
       id: parseInt(row_obj.id)
      }
    }).subscribe((response) => {
        console.log(response)
        this.dataSource();
    });
  }
  
  deleteRowData(row_obj){
    this.apollo.mutate({
      mutation: DELETE_ACTOR_MUTATION,
      variables: {
       id: parseInt(row_obj.id)
      }
    }).subscribe((response) => {
        console.log(response)
        this.dataSource();
    });
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

