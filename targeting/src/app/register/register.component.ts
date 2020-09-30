import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
import { CREAR_USER
  } from '../graphql';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) { }

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

  atras(){
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.get("userName").value);
      this.apollo.mutate({
        mutation: CREAR_USER,
        variables: {
         name: this.form.get("userName").value
        }
      }).subscribe((response) => {
          this.router.navigate(['login']);
        });
    }
    this.formSubmitAttempt = true;
  }
}
