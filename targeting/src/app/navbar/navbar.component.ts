import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class NavbarComponent implements OnInit{

  constructor(private confirmation: ConfirmationService,private router: Router) { }

  ngOnInit(): void {
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

}
