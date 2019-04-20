import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatusComponent } from './components/status/status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SecureComponent,
    DashboardComponent,
    NavbarComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecureModule { }
