import {Component,OnInit,ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Apollo} from 'apollo-angular';
import {Estado, Tema} from '../types';
import {Router} from '@angular/router';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { PageSettingsModel,EditSettingsModel,TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";


// 1
import { DELETE_TEMA_MUTATION,UPDATE_TEMA_MUTATION,CREATE_TEMA_MUTATION, 
  ALL_TEMAS_QUERY, CREATE_NEW_TEMA_MUTATION, CONNECT_TEMA,
  UPDATE_TEMA_PRIORIDAD_MUTATION,
  } from '../graphql';
import { StarRatingComponent } from 'ng-starrating';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'Add'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ThemeComponent {
  public cssClass: string = "custom";
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
  
  val2: number = 2;
  msg: string;

  constructor(public dialog: MatDialog, private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['temas'];
      this.loading = response.loading;
     });
     this.pageSettings = {pageSize: 30};
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
      width: '50%',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Crear'){
        this.treegrid.editSettings.newRowPosition ="Child"
        this.addRowData(result.data,data);
      }else if(result.event == 'Editar'){
        this.updateRowData(result.data);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result.data);
      }else if(result.event == 'Crear Padre'){
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
      query: ALL_TEMAS_QUERY
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
      }
    }).subscribe((response) => {
        let tema = response.data['createTema'];
        this.apollo.mutate({
          mutation: CONNECT_TEMA,
          variables: {
            idHijo: parseInt(tema.id),
            idPadre: parseInt(data.id),
          }
        }).subscribe((response) => {
          this.dataSource();
        });
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
        this.dataSource();
    });
  }
  
  deleteRowData(row_obj){
    this.apollo.mutate({
      mutation: DELETE_TEMA_MUTATION,
      variables: {
      id: parseInt(row_obj.id)
      }
    }).subscribe((response) => {
      this.dataSource(); 
    });   
  }

  handleRate(event,id) {
    this.apollo.mutate({
      mutation: UPDATE_TEMA_PRIORIDAD_MUTATION,
      variables: {
       prioridad: parseInt(event.value),
       id: parseInt(id)
      }
    }).subscribe((response) => {
      this.dataSource()
    });
  }

}

