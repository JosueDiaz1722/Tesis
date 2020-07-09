import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { GET_USER
  } from '../graphql';
  import {Apollo} from 'apollo-angular';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  Users: User[] = []
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private apollo: Apollo
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.apollo.watchQuery({
        query: GET_USER,
        variables: {
          name: user.userName
        }
      }).valueChanges.subscribe((response) => {
        this.Users = response.data['users'];
        if(Object.keys(this.Users).length === 0){
          
        }else{
          localStorage.setItem("Usuario", JSON.stringify(this.Users[0]));
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
       });
    }
  }

  logout() {
    localStorage.removeItem("Usuario");
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
