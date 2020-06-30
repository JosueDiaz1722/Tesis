import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { Matriz, Actor, Tema} from '../types';
import {Router} from '@angular/router';
import { ALL_MATRIZ_QUERY, USER_MATRIZ_QUERY, ID_ACTORES, ID_TEMAS, CREAR_MATRIZ
  } from '../graphql';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-matrizes',
  templateUrl: './matrizes.component.html',
  styleUrls: ['./matrizes.component.css']
})


export class MatrizesComponent implements OnInit {
  responsiveOptions;
  cars: Object[] = [
    {
      brand: "Audi",
      year: 1999,
      color: "blanco"
    },
    {
      brand: "BMW",
      year: 1999,
      color: "blanco"
    },
    {
      brand: "Chev",
      year: 1999,
      color: "blanco"
    },
    {
      brand: "Tuson",
      year: 1999,
      color: "blanco"
    }
  ];
  constructor(private apollo: Apollo,private router: Router) {
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
   
  ngOnInit(): void {
    this.apollo.watchQuery({
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
     });

     this.sortOptions = [
      {label: 'Newest First', value: '!createdAt'},
      {label: 'Oldest First', value: 'createdAt'},
      {label: 'Usuario', value: 'User.name'}
     ];
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
          this.router.navigateByUrl('/matriz',{state:{id: data.id}});
        }); 
       });
     });
  }

  verMatriz(id){
    console.log(id);
    this.router.navigateByUrl('/matriz',{state:{id: id}});
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

}
