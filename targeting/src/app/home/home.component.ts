import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {Actor, Tema, Estado} from '../types';
import {Apollo} from 'apollo-angular';
import {ALL_ACTORES_QUERY, ALL_TEMAS_QUERY, ESTADO_QUERY,CREATE_CELL_MUTATION,
  DELETE_ALL_MATRIZ_QUERY,
  UPDATE_ESTADO_ACTOR_MUTATION, UPDATE_ESTADO_TEMA_MUTATION} from '../graphql';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class HomeComponent implements OnInit {

  constructor(private confirmation: ConfirmationService, private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    /*this.apollo.watchQuery({
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentTemas = response.data['temas'];
      console.log(this.ParentTemas.length)
    });
    
    this.apollo.watchQuery({
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentActor = response.data['actors'];
      console.log(this.ParentActor.length);
    });
    
    this.apollo.watchQuery({
      query: ESTADO_QUERY
    }).valueChanges.subscribe((response) => {
      this.Estado = response.data['estadoes'];
      console.log(this.Estado);
    });*/
  }

  Matriz(){
    this.router.navigate(['/matrices']);
  }
  /*ParentTemas: Tema[] = [];
  ParentActor: Actor[] = [];
  confirmDropDatabaseDialogVisible = false;
  Estado: Estado[] = [];

  crearMatriz(event: Event) {

    this.datasource();
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'Crear Matriz',
      message: 'Abrir nueva matriz o matriz actual?',
      accept: () => { this.nuevo(); },
      reject: () => { }
    });
  }

  private nuevo() {
    this.apollo.mutate({
      mutation: DELETE_ALL_MATRIZ_QUERY,
    }).subscribe((response) => {
      this.ParentActor.forEach(actor => {
        this.ParentTemas.forEach(tema => {
          this.apollo.mutate({
            mutation: CREATE_CELL_MUTATION,
            variables: {
              idTema: parseInt(tema.id),
              idActor: parseInt(actor.id),
              prioridad: 0,
              tiempo: 0,
              coment: ""
            }
          }).subscribe((response) => {
              console.log(response)
          }); 
        });
      });
    }); 
    setTimeout(() => { this.router.navigate(['/matriz']); }, 2000);
  }

  old(){
    var vm = this;
    this.Estado.filter(function (item){
      if(item.NumTemas === 0 && item.NumActor === 0){
        vm.nuevo();
      }
      else if(item.NumTemas === vm.ParentTemas.length && item.NumActor === vm.ParentActor.length){
        console.log('MISMO ESTADO');
        vm.router.navigate(['/matriz']);
      }else if (item.NumTemas !== vm.ParentTemas.length && item.NumActor === vm.ParentActor.length){
        console.log('Diferente Temas');
        for(let j = 0; j<vm.ParentActor.length; j++ ){
          for(let i= item.NumTemas; i<vm.ParentTemas.length; i++){
            console.log(vm.ParentTemas[i].id);
            console.log(vm.ParentActor[j].id);
            vm.apollo.mutate({
              mutation: CREATE_CELL_MUTATION,
              variables: {
                idTema: parseInt(vm.ParentTemas[i].id),
                idActor: parseInt(vm.ParentActor[j].id),
                prioridad: 0,
                tiempo: 0,
                coment: ""
              }
            }).subscribe((response) => {
                console.log(response)
            }); 
          }
        }
        vm.apollo.mutate({
          mutation: UPDATE_ESTADO_TEMA_MUTATION,
          variables: {
           id: vm.Estado[0].id,
           NumActor: vm.ParentTemas.length,
          }
        }).subscribe((response) => {
            console.log(response);
        });
       setTimeout(() => { vm.router.navigate(['/matriz']); }, 2000);
      }else if (item.NumTemas === vm.ParentTemas.length && item.NumActor !== vm.ParentActor.length){
        console.log('Diferentes Actores');
        for(let j = item.NumActor; j<vm.ParentActor.length; j++ ){
          for(let i= 0; i<vm.ParentTemas.length; i++){
            console.log(vm.ParentTemas[i].id);
            console.log(vm.ParentActor[j].id);
            vm.apollo.mutate({
              mutation: CREATE_CELL_MUTATION,
              variables: {
                idTema: parseInt(vm.ParentTemas[i].id),
                idActor: parseInt(vm.ParentActor[j].id),
                prioridad: 0,
                tiempo: 0,
                coment: ""
              }
            }).subscribe((response) => {
                
            });
          }
        }
        vm.apollo.mutate({
          mutation: UPDATE_ESTADO_ACTOR_MUTATION,
          variables: {
           id: vm.Estado[0].id,
           NumActor: vm.ParentActor.length,
          }
        }).subscribe((response) => {
            console.log(response);
        });
        setTimeout(() => { vm.router.navigate(['/matriz']); }, 2600);
      }else{
        console.log('Diferente Actores y Temas');
        for(let j = item.NumActor; j<vm.ParentActor.length; j++ ){
          for(let i= item.NumTemas; i<vm.ParentTemas.length; i++){
            console.log(vm.ParentTemas[i].id);
            console.log(vm.ParentActor[j].id);
            vm.apollo.mutate({
              mutation: CREATE_CELL_MUTATION,
              variables: {
                idTema: parseInt(vm.ParentTemas[i].id),
                idActor: parseInt(vm.ParentActor[j].id),
                prioridad: 0,
                tiempo: 0,
                coment: ""
              }
            }).subscribe((response) => {
                console.log(response)
            });
          }
        }
        vm.apollo.mutate({
          mutation: UPDATE_ESTADO_ACTOR_MUTATION,
          variables: {
           id: vm.Estado[0].id,
           NumActor: vm.ParentActor.length,
          }
        }).subscribe((response) => {
            console.log(response);
        });
        vm.apollo.mutate({
          mutation: UPDATE_ESTADO_TEMA_MUTATION,
          variables: {
           id: vm.Estado[0].id,
           NumActor: vm.ParentTemas.length,
          }
        }).subscribe((response) => {
            console.log(response);
        });
        
        setTimeout(() => { vm.router.navigate(['matriz']);}, 2000);
      }
    });
  }

  datasource(){
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network',
      query: ALL_TEMAS_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentTemas = response.data['temas'];
      console.log(this.ParentTemas.length)
    });
    
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network',
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentActor = response.data['actors'];
      console.log(this.ParentActor.length);
    });
    
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network',
      query: ESTADO_QUERY
    }).valueChanges.subscribe((response) => {
      this.Estado = response.data['estadoes'];
      console.log(this.Estado);
    });
  }*/

}
