import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { Matriz} from '../types';
import {Router} from '@angular/router';
import { ALL_MATRIZ_QUERY, USER_MATRIZ_QUERY
  } from '../graphql';
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

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: ALL_MATRIZ_QUERY
    }).valueChanges.subscribe((response) => {
      this.Matrices = response.data['matrizes'];
      console.log(this.Matrices);
     });
     this.apollo.watchQuery({
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
}
