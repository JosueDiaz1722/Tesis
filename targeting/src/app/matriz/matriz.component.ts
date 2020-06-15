import { Component, OnInit, ViewChild,Directive, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import {HIJO_TEMA_QUERY,PARENT_TEMA_QUERY, HIJO_ACTOR_QUERY,PARENT_ACTOR_QUERY, 
  ALL_MATRIZ_QUERY, UPDATE_CELL_PRIORIDAD_MUTATION, DELETE_CELL_MUTATION, 
  CREATE_CELL_MUTATION,UPDATE_ESTADO_TEMA_MUTATION,UPDATE_ESTADO_ACTOR_MUTATION,
ESTADO_QUERY} from '../graphql';
import {Actor, Tema, Matriz,Estado} from '../types';
import {Apollo} from 'apollo-angular';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent implements OnInit {
  public params = ['par1', 'par2', 'par3', 'par4', 'par5'];
  public modes = ['mode1', 'mode2', 'mode3'];
  combinations = [];
  ParentTemas: Tema[] = [];
  Estado: Estado[] = [];
  HijosTemas: Tema[] = [];
  ParentActor: Actor[] = [];
  HijosActor: Actor[] =[];
  DatosMatriz: Matriz[]=[];
  loading: boolean = true;
  public pivotData: IDataSet[];
  public dataSourceSettings: IDataOptions;

  constructor( private apollo: Apollo) { }

  async ngOnInit(): Promise<void> {
    this.datasource();
    this.childData();
    this.matriz();
    this.combinations = this.getCombinationsArray();
  }

  matriz(){
    this.apollo.watchQuery({
      query: ALL_MATRIZ_QUERY
    }).valueChanges.subscribe((response) => {
      this.DatosMatriz = response.data['matrizes'];
      this.loading = response.loading;
      if(this.DatosMatriz.length === 0){
        console.log("Esta Vacio");
        this.createCell();
      }else{
        console.log(this.DatosMatriz);
      }
    });
  }

  datasource(){
    this.apollo.watchQuery({
      query: PARENT_TEMA_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentTemas = response.data['temas'];
      this.loading = response.loading;
    });
    
    this.apollo.watchQuery({
      query: PARENT_ACTOR_QUERY
    }).valueChanges.subscribe((response) => {
      this.ParentActor = response.data['actors'];
      this.loading = response.loading;
    }); 
    this.apollo.watchQuery({
      query: ESTADO_QUERY
    }).valueChanges.subscribe((response) => {
      this.Estado = response.data['estadoes'];
      console.log(this.Estado);
    });
  }

  getCombinationsArray = function() {
    var combinations = [];
    for (var i = 0; i < this.getNumCombinations(); i++) {
      combinations.push(i)
    }
    return combinations;
  };

  getNumCombinations = function() {
    return this.params.length * this.modes.length;
  };

  getModule = function(index){
    return index % this.params.length;
  };
  
  childData(){
    this.apollo.watchQuery({
      query: HIJO_TEMA_QUERY
    }).valueChanges.subscribe((response) => {
      this.HijosTemas = response.data['temas'];
      this.loading = response.loading;
    }); 

    this.apollo.watchQuery({
      query: HIJO_ACTOR_QUERY
    }).valueChanges.subscribe((response) => {
      this.HijosActor = response.data['actors'];
      this.loading = response.loading;
    });
  }

  refresh(){
    this.ngOnInit;
  }

  onValChange(value,temaid,actorid,cellid){
    var vm = this;
    this.DatosMatriz.filter(function(item) {
      let actor = item["ActorParent"];
      let tema = item["TemaParent"];
      if(actor["id"] === actorid && tema["id"]===temaid){
        console.log("Si existe");
        vm.updatePrioridadData(value,cellid)
      }else{
        console.log("Crea Nuevo");
      }
    });  
  }

  onTimeChange(value,actor,tema,cellid){
    console.log(value)
  }


  public updatePrioridadData(prioridad,cellid){
    this.apollo.mutate({
      mutation: UPDATE_CELL_PRIORIDAD_MUTATION,
      variables: {
      
       prioridad: parseInt(prioridad),
       id: String(cellid)
      }
    }).subscribe((response) => {
        console.log(response)
    });
  }

  public createCell(){
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
  }  

  valorfunction(temaid,actorid){
    this.DatosMatriz.filter(function(item) {
      let actor = item["ActorParent"];
      let tema = item["TemaParent"];
      if(actor["id"] === actorid && tema["id"]===temaid){
        console.log("si existe");
        console.log(item);
        return item.tiempo;
      }else{
        return 0;
      }
    });
  }

  deleteAll(){

    //DO WITh DELETEMANY
    var vm = this;
    this.DatosMatriz.forEach(element => {
      vm.apollo.mutate({
        mutation: DELETE_CELL_MUTATION,
        variables: {
         id: element.id
        }
      }).subscribe((response) => {
        console.log(response);
      });
    });
    vm.apollo.mutate({
      mutation: UPDATE_ESTADO_ACTOR_MUTATION,
      variables: {
       id: vm.Estado[0].id,
       NumActor: 0,
      }
    }).subscribe((response) => {
        console.log(response);
    });
    vm.apollo.mutate({
      mutation: UPDATE_ESTADO_TEMA_MUTATION,
      variables: {
       id: vm.Estado[0].id,
       NumActor: 0,
      }
    }).subscribe((response) => {
        console.log(response);
    });

  }
}
