import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnsecureRoutingModule } from './unsecure-routing.module';
import { UnsecureComponent } from './unsecure.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

@NgModule({
  declarations: [
    UnsecureComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    UnsecureRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UnsecureModule { }

