import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IError } from 'src/app/interfaces';
import { AuthService } from 'src/app/services';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errors: IError[];
  public loginSubmited: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.loginSubmited = true;
    this.authService.login(this.loginForm.value)
      .subscribe((response) => {
        this.router.navigate(['/dashboard']);
      }, err => {
        this.loginSubmited = false;
        this.errors = _.keyBy(err.obj.error.data, 'param');
      });
  }

}
