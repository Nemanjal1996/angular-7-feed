import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IError } from 'src/app/interfaces';
import { AuthService } from 'src/app/services';

import * as _ from 'lodash';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public errors: IError[];
  public signupSubmited: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.signupSubmited = true;
    this.authService.signup(this.signupForm.value)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      }, err => {
        this.signupSubmited = false;
        this.errors = _.keyBy(err.obj.error.data, 'param');
      });
  }
}
