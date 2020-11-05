import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  isLoggedIn$: Observable<boolean>;

  constructor(private confirmation: ConfirmationService,private router: Router,private authService: AuthService) { }


  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  public onSidenavClose = () =>{
    this.sidenavClose.emit();
  }
}
