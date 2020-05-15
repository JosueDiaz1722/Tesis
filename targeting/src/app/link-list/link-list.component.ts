import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Link} from '../types';

// 1
import {ALL_LINKS_QUERY, AllLinkQueryResponse, ALL_ACTORES_QUERY} from '../graphql';

@Component({
  selector: 'hn-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  // 2
  allLinks: Link[] = [];
  loading: boolean = true;

  // 3
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {

    // 4
    this.apollo.watchQuery({
      query: ALL_LINKS_QUERY
    }).valueChanges.subscribe((response) => {
      // 5
      this.allLinks = response.data['links'];
      this.loading = response.loading;
     });

     this.apollo.watchQuery({
      query: ALL_ACTORES_QUERY
    }).valueChanges.subscribe((response) => {
      console.log(response.data);
     });

  }

}