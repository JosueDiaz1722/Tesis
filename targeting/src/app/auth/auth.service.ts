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

  login(user: User[]) {
      this.Users = user;
      localStorage.setItem("Usuario", JSON.stringify(this.Users[0]));
      this.loggedIn.next(true);
      this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem("Usuario");
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
