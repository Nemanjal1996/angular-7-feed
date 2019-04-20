import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/modules/unsecure/unsecure.module#UnsecureModule'
  },
  {
    path: '',
    loadChildren: 'src/app/modules/secure/secure.module#SecureModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
