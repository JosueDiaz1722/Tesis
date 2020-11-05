import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class NavbarComponent implements OnInit{

  @Output() public sidenavToggle = new EventEmitter();
  isLoggedIn$: Observable<boolean>;

  constructor(private confirmation: ConfirmationService,private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  confirmDropDatabaseDialogVisible = false;

  dropDatabase(event: Event) {
    if (event.defaultPrevented) return;
    event.preventDefault();

    this.confirmation.confirm({
      key: 'confirm-drop-database',
      message: 'Are you sure to remove all data?',
      accept: () => { this._dropDatabase(); },
      reject: () => { this.old();}
    });
  }

  private _dropDatabase() {
    console.log('NUEVO');
    this.router.navigate(['/matriz']);
  }

  private old(){
    console.log('OLD')
  }

  onLogout() {
    this.authService.logout();
  }

  public onToggleSidenav = () =>{
    this.sidenavToggle.emit();
  }
}
