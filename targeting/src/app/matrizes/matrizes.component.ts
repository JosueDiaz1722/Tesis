import { Component, OnInit, Inject, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Location } from "@angular/common";
import {Apollo} from 'apollo-angular';
import { Matriz, Actor, Tema, User} from '../types';
import {Router, RouterModule, NavigationEnd} from '@angular/router';
import { ALL_MATRIZ_QUERY, USER_MATRIZ_QUERY, ID_ACTORES, ID_TEMAS, CREAR_MATRIZ, DELETE_MATRIZ_QUERY,
  ALL_TEMAS_QUERY, ALL_ACTORES_QUERY, UPDATE_MATRIZ,DELETE_CELL_MUTATION
  } from '../graphql';
import { SelectItem, ConfirmationService, Message } from 'primeng/api';
import { PageSettingsModel, EditSettingsModel, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';
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
   ActoresFinal: Actor[]=[];
   TemasFinal: Tema[]=[];
   user: User;
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
    
    this.user = JSON.parse(localStorage.getItem("Usuario"));
    console.log(this.user.id);
    this.dataSource();
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
     if(this.user.name === "Admin"){
        this.apollo.watchQuery({
          fetchPolicy: 'network-only',
          query: ALL_MATRIZ_QUERY
        }).valueChanges.subscribe((response) => {
          this.MatricesUsuario = response.data['matrizes'];
        });
     } else{
      this.apollo.watchQuery({
        fetchPolicy: 'network-only',
        query: USER_MATRIZ_QUERY,
        variables: {
          id: this.user.id
         }
      }).valueChanges.subscribe((response) => {
        this.MatricesUsuario = response.data['matrizes'];
       });  
     }
  }

  formatDate = function(date){
    var dateOut = new Date(date);
    return dateOut;
};

transform1(){
  this.Actores.forEach(actor=>{
    this.Temas.forEach(tema=>{
      delete tema.__typename;
      delete actor.__typename;
    });
  });
}

celdas(){
  this.Celdas = [];
  this.ActoresFinal.forEach(actor=>{
    this.TemasFinal.forEach(tema=>{
      delete tema.__typename;
      delete actor.__typename;
      let celda = {
        prioridad: 0,
        tiempo: 0,
        TemaParent: {"connect": {"id": tema.id}},
        ActorParent: {"connect": {"id": actor.id}}
      }
      this.Celdas.push(celda);
    });
  });
}

maxcolspan(Items){
  var lista = [];
  Items.forEach(element => {
       if(element.hijos.length){
        element.hijos.forEach(element => {
          if(element.hijos.length){
            element.hijos.forEach(element => {
              if(element.hijos.length){
                element.hijos.forEach(element => {
                  lista.push(element)
                });
              }else{
                lista.push(element)
              }
            });
          }else{
            lista.push(element)
          }
        });
       }else{
         lista.push(element)
       }
  });
  return lista  
}

  nuevaMatriz(){
    this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ID_ACTORES
    }).valueChanges.subscribe((response) => {
      this.Actores = this.transform2(response.data["actors"])
     });
     this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ID_TEMAS
    }).valueChanges.subscribe((response) => {
      this.Temas = this.transform2(response.data["temas"]);
    });
    this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.TemasFinal = this.maxcolspan(response.data['temas']);
     });
     this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.ActoresFinal = this.maxcolspan(response.data['actors']);
     });

    setTimeout(async () => { 
      let first = new Promise<void>((resolve, reject) => {
        this.celdas();
        resolve()
      })
      
      let second = new Promise<void>((resolve, reject) => {
        this.apollo.mutate({
          mutation: CREAR_MATRIZ,
          variables: {
            id: this.user.id,
            actors: this.Actores,
            temas: this.Temas,
            celdas: this.Celdas
          }
        }).subscribe((response) => {
          let data = response.data['createMatriz']
          this.router.navigateByUrl('/matriz',{state:{id: data.id, nombre: this.user.name}});
        });
        resolve();
      })
      
      await Promise.all([first, second])
      
    }, 500);
  }

  verMatriz(matriz){
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
  
  confirm3(id) {
    this.confirmationService.confirm({
        key:"positionDialog",
        acceptLabel:"Si",
        rejectLabel: "No",
        message: 'Seguro que quiere actualizar esta matriz? ESTO ELIMINARA LOS CAMBIOS QUE SE HAN HECHO EN LA MATRIZ',
        header: 'Actualizar Matriz',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmado', detail:'Se actualizo la matriz'}];
            this.actualizarMatriz(id);
            this.ngOnInit();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rechazado', detail:'Ha Cancelado'}];
        }
    });
  }

  refresh(){
    this._router.navigateByUrl("/refresh1", {skipLocationChange: true}).then(()=>{
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }


  actualizarMatriz(idmatriz){

    this.apollo.mutate({
      mutation: DELETE_CELL_MUTATION,
      variables: {
        matriz: idmatriz
      }
    }).subscribe((response) => {
        console.log(response)
    });
    
    this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ID_ACTORES
    }).valueChanges.subscribe((response) => {
      this.Actores = this.transform2(response.data["actors"])
     });
     this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ID_TEMAS
    }).valueChanges.subscribe((response) => {
      this.Temas = this.transform2(response.data["temas"]);
    });
    this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.TemasFinal = this.maxcolspan(response.data['temas']);
     });
     this.apollo.watchQuery({
      fetchPolicy: 'network-only',
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.ActoresFinal = this.maxcolspan(response.data['actors']);
     });

    setTimeout(async () => { 
      let first = new Promise<void>((resolve, reject) => {
        this.celdas();
        resolve()
      })
      
      let second = new Promise<void>((resolve, reject) => {
        console.log(this.Celdas);
        this.apollo.mutate({
          mutation: UPDATE_MATRIZ,
          variables: {
            matriz: idmatriz,
            actors: this.Actores,
            temas: this.Temas,
            celdas: this.Celdas
          }
        }).subscribe((response) => {
          console.log(response.data);
          this.router.navigateByUrl('/matriz',{state:{id: idmatriz, nombre: this.user.name}});
        });
        resolve();
      })
      
      await Promise.all([first, second])
    }, 500);
  }
  


  transform2(arreglo){
    arreglo.forEach(element=>{
      delete element.__typename;
    });
    return arreglo
  }

}
