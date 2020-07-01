import { Component, OnInit, Inject, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Location } from "@angular/common";
import {Apollo} from 'apollo-angular';
import { Matriz, Actor, Tema} from '../types';
import {Router, RouterModule, NavigationEnd} from '@angular/router';
import { ALL_MATRIZ_QUERY, USER_MATRIZ_QUERY, ID_ACTORES, ID_TEMAS, CREAR_MATRIZ, DELETE_MATRIZ_QUERY
  } from '../graphql';
import { SelectItem, ConfirmationService, Message } from 'primeng/api';
import { PageSettingsModel, EditSettingsModel, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-matrizes',
  templateUrl: './matrizes.component.html',
  styleUrls: ['./matrizes.component.css']
})


export class MatrizesComponent implements OnInit {
  responsiveOptions;

  constructor(private ref: ChangeDetectorRef,public _router: Router,public _location: Location,private apollo: Apollo,private router: Router, private confirmationService: ConfirmationService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

   Matrices: Matriz[] = [];
   MatricesUsuario: Matriz[] = [];
   Actores: Actor[] =[];
   Temas: Tema[] =[];
   Celdas: any[] =[];
   sortOptions: SelectItem[];
   selectedMatriz: Matriz;
   displayDialog: boolean;
   sortField: string;
   sortOrder: number;
   sortKey: string;
   sortField1: string;
   sortOrder1: number;
   sortKey1: string;
   msgs: Message[] = [];
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   dataSource1: MatTableDataSource<Matriz>;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit(): void {
    this.dataSource();
    /*this.apollo.watchQuery({
      query: ALL_MATRIZ_QUERY
    }).valueChanges.subscribe((response) => {
      this.Matrices = response.data['matrizes'];
     });
     this.apollo.watchQuery({
      query: USER_MATRIZ_QUERY,
      variables: {
        id: "ckbzihtfh00dv0725emf839fh"
       }
    }).valueChanges.subscribe((response) => {
      this.MatricesUsuario = response.data['matrizes'];
     });*/

     this.sortOptions = [
      {label: 'Newest First', value: '!createdAt'},
      {label: 'Oldest First', value: 'createdAt'},
      {label: 'Usuario', value: 'User.name'}
     ];
     
  }
  dataSource(){ 
    this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ALL_MATRIZ_QUERY
    }).valueChanges.subscribe((response) => {
      this.Matrices = response.data['matrizes'];
     });
     this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: USER_MATRIZ_QUERY,
      variables: {
        id: "ckbzihtfh00dv0725emf839fh"
       }
    }).valueChanges.subscribe((response) => {
      this.MatricesUsuario = response.data['matrizes'];
    
     });
  }

  formatDate = function(date){
    var dateOut = new Date(date);
    return dateOut;
};

  nuevaMatriz(){
    this.apollo.watchQuery({
      query: ID_ACTORES
    }).valueChanges.subscribe((response) => {
      this.Actores = response.data["actors"];
      this.apollo.watchQuery({
        query: ID_TEMAS
      }).valueChanges.subscribe((response) => {
        this.Temas = response.data["temas"];
        this.Actores.forEach(actor=>{
          this.Temas.forEach(tema=>{
            let celda = {
              prioridad: 0,
              tiempo: 0,
              TemaParent: {"connect": {"id": tema.id}},
              ActorParent: {"connect": {"id": actor.id}}
            }
            this.Celdas.push(celda);
          })
        })
        this.apollo.mutate({
          mutation: CREAR_MATRIZ,
          variables: {
            id: "ckbzihtfh00dv0725emf839fh",
            actors: this.Actores,
            temas: this.Temas,
            celdas: this.Celdas
          }
        }).subscribe((response) => {
          let data = response.data['createMatriz']
          this.router.navigateByUrl('/matriz',{state:{id: data.id, nombre: data.User.name}});
        }); 
       });
     });
  }

  verMatriz(matriz){
    console.log(matriz);
    this.router.navigateByUrl('/matriz',{state:{id: matriz.id,nombre: matriz.User.name}});
  }

  selectCar(event: Event, matriz: Matriz) {
    this.selectedMatriz = matriz;
    this.displayDialog = true;
    event.preventDefault();
  }
  onSortChange(event) {
    let value = event.value;
    console.log(value)

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        console.log(this.sortField)
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
        console.log(this.sortField)
    }
  }

  onSortChange1(event) {
    let value = event.value;
    console.log(value)

    if (value.indexOf('!') === 0) {
        this.sortOrder1 = -1;
        this.sortField1 = value.substring(1, value.length);
        console.log(this.sortField1)
    }
    else {
        this.sortOrder1 = 1;
        this.sortField1 = value;
        console.log(this.sortField1)
    }
  }

  borrarMatriz(id){
    this.apollo.mutate({
      mutation: DELETE_MATRIZ_QUERY,
      variables: {
        id: id,
      }
    }).subscribe((response) => {
      this.refresh();
    }); 
  }

  confirm1() {
    this.confirmationService.confirm({
        key:"positionDialog",
        acceptLabel:"Si",
        rejectLabel: "No",
        message: 'Seguro que quiere crear una nueva matriz?',
        header: 'Crear Nueva Matriz',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmado', detail:'Se creo nueva matriz'}];
            this.nuevaMatriz();
            this.ngOnInit();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rechazado', detail:'Ha Cancelado'}];
        }
    });
}

confirm2(id) {
    this.confirmationService.confirm({
        acceptLabel:"Si",
        rejectLabel: "No",
        key:"positionDialog",
        message: 'Seguro que quiere borrar esta matriz?',
        header: 'Eliminar Matriz',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmacion', detail:'Matriz Eliminada'}];
            this.borrarMatriz(id);
            this.ngOnInit();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rechazado', detail:'Ha cancelado'}];
        }
    });
  }
  
  
  refresh(){
    this._router.navigateByUrl("/refresh1", {skipLocationChange: true}).then(()=>{
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }

}
