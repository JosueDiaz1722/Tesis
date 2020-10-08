import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { SelectItem, ConfirmationService, Message } from 'primeng/api';
import { User } from './../auth/user';
import { GET_USER
} from '../graphql';
import {Apollo} from 'apollo-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  msgs: Message[] = [];
  Users: User[] = [];
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.userName !== '' && this.form.value.password !== '' ) {
        this.apollo.watchQuery({
          query: GET_USER,
          variables: {
            name: this.form.value.userName
          }
        }).valueChanges.subscribe((response) => {
          this.Users = response.data['users'];
          if(Object.keys(this.Users).length === 0){
            this.msgs = [{severity:'info', summary:'Rechazado', detail:'Credenciales Incorrectos'}];
          }else{
            this.authService.login(this.Users);
          }
         });
    } else{
      this.msgs = [{severity:'info', summary:'Rechazado', detail:'Credenciales Incorrectos'}];
    }
    this.formSubmitAttempt = true;
  }
  }
  crearUser(){
    this.router.navigate(['register']);
  }
}
