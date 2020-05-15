import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloBoostModule, ApolloBoost} from 'apollo-angular-boost';
import { HttpClientModule } from '@angular/common/http';


@NgModule({

  exports: [
    HttpClientModule,
    ApolloBoostModule
  ]
})
export class GraphqlModule { 
  constructor(apolloBoost: ApolloBoost){
    apolloBoost.create({uri: 'htpp://localhost:4000/graphql'});
  }
}
