import { Component, OnInit, ViewChild,Directive, Output, EventEmitter, Input } from '@angular/core';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import {HIJO_TEMA_QUERY,PARENT_TEMA_QUERY, HIJO_ACTOR_QUERY,PARENT_ACTOR_QUERY, ALL_MATRIZ_QUERY} from '../graphql';
import {Actor, Tema, Matriz} from '../types';
import {Apollo} from 'apollo-angular';

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
  HijosTemas: Tema[] = [];
  ParentActor: Actor[] = [];
  HijosActor: Actor[] =[];
  DatosMatriz: Matriz[]=[];
  loading: boolean = true;
  public pivotData: IDataSet[];
  public dataSourceSettings: IDataOptions;

  constructor( private apollo: Apollo) { }

  ngOnInit(): void {
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
      console.log(this.DatosMatriz);
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
}
