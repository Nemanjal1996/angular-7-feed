import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsecureComponent } from './unsecure.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { Guestuard } from 'src/app/services';

const routes: Routes = [
    {
        path: '',
        component: UnsecureComponent,
        canActivate: [ Guestuard ],
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnsecureRoutingModule { }
