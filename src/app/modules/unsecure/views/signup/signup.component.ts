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
  public fileData: File;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      image: [''],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.signupForm.get('email').value);
    formData.append('password', this.signupForm.get('password').value);
    formData.append('image', this.fileData);
    formData.append('name', this.signupForm.get('name').value);
 
    this.signupSubmited = true;
    this.authService.signup(formData)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      }, err => {
        this.signupSubmited = false;
        this.errors = _.keyBy(err.obj.error.data, 'param');
      });
  }
}
