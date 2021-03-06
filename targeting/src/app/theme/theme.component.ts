import {Component,OnInit,ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Apollo} from 'apollo-angular';
import {Estado, Tema} from '../types';
import {Router} from '@angular/router';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { PageSettingsModel,EditSettingsModel,TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";

// 1
import {DELETE_TEMA_MUTATION,UPDATE_TEMA_MUTATION,CREATE_TEMA_MUTATION, 
  ALL_TEMAS_QUERY, CREATE_NEW_TEMA_MUTATION,DELETE_HIJO_TEMA_MUTATION,
  ESTADO_QUERY, DELETE_TEMA_CELL_MUTATION, UPDATE_ESTADO_TEMA_MUTATION,
  PARENT_TEMA_QUERY,
  DELETE_HIJO_ACTOR_MUTATION} from '../graphql';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ThemeComponent {
  allLinks: Tema[] = [];
  loading: boolean = true;
  ParentTemas: Tema[] = [];
  Estado: Estado[] = [];
  public data: Object[];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: string[];
  public numericParams: Object;
  @ViewChild(TreeGridComponent, { static: false }) treegrid: TreeGridComponent;

  constructor(public dialog: MatDialog, private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['temas'];
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

      setTimeout(() => { 
        this.apollo.watchQuery({
          query: ESTADO_QUERY
        }).valueChanges.subscribe((response) => {
          this.Estado = response.data['estadoes'];
          console.log(this.Estado[0].id);
        });
        this.apollo.watchQuery({
          query: PARENT_TEMA_QUERY
        }).valueChanges.subscribe((response) => {
          this.ParentTemas = response.data['temas'];
          this.loading = response.loading;
        });
      }, 1000);
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
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['temas'];
      this.treegrid.dataBind();
     }); 
  }
 
  parents(){
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network', 
      query: PARENT_TEMA_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentTemas = response.data['temas'];
     }); 
  }
  addRowData(row_obj,data){
    this.apollo.mutate({
      mutation: CREATE_TEMA_MUTATION,
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
      mutation: CREATE_NEW_TEMA_MUTATION,
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
      mutation: UPDATE_TEMA_MUTATION,
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
    let estado = this.ParentTemas.length-1;
    console.log(estado);
    this.apollo.mutate({
      mutation: DELETE_HIJO_ACTOR_MUTATION,
      variables: {
       id: parseInt(row_obj.id)
      }
    }).subscribe((response) => {
      this.apollo.mutate({
        mutation: DELETE_TEMA_CELL_MUTATION,
        variables: {
         id: parseInt(row_obj.id),
        }
      }).subscribe((response) => {
        this.apollo.mutate({
          mutation: DELETE_TEMA_MUTATION,
          variables: {
           id: parseInt(row_obj.id)
          }
        }).subscribe((response) => {
          if(row_obj.parent == null){
            console.log("entro al if");
            this.apollo.mutate({
            mutation: UPDATE_ESTADO_TEMA_MUTATION,
            variables: {
             id: this.Estado[0].id,
             NumActor: estado,
            }
          }).subscribe((response) => {
              console.log(response);
              this.dataSource();
              this.parents();
          });
          }else{
            this.dataSource();
          }
          
        });
      });     
    });
  }
  
}