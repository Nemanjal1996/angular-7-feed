import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { UserLogin, SignupData, UserSignup, LoginData } from '../interfaces';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) { }

  login(data: UserLogin): Observable<LoginData> {
    return this.httpService.postData('auth/login', data, {
      headers: this.httpService.headers,
      options: this.httpService.options
    })
    .pipe(
      map((response: LoginData) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        return response;
      })
    );
  }

  signup(data: any): Observable<SignupData> {
    return this.httpService.putData('auth/signup', data, {
      headers: new HttpHeaders({
        Authorization: `bearer ${this.httpService.getToken()}`
      }),
      options: this.httpService.options
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
