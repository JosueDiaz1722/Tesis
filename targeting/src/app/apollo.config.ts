import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
// 1
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';


@NgModule({
  exports: [
    // 2
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  // 3
  constructor(apollo: Apollo, httpLink: HttpLink) {

    // 4
    const uri = 'http://localhost:4466';
    const http = httpLink.create({ uri });

    const ws = new WebSocketLink({
      uri: `ws://localhost:4466`,
      options: {
        reconnect: true,
        timeout: 30000
      }
    });

    const link = split(({ query }) => {
      const { kind, operation }: any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    }, ws, http);

    // 5

    apollo.create({
      link: link,
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}