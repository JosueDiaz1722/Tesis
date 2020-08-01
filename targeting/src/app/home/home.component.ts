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
  }

  Matriz(){
    this.router.navigate(['/matrices']);
  }
  Actores(){
    this.router.navigate(['/actores']);
  }
  Temas(){
    this.router.navigate(['/temas']);
  }
}
