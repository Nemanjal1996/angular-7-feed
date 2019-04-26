import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  getUserStatus(): Observable<UserData> {
    return this.httpService.getData('user/status', {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }

  updateUserStatus(status: string): Observable<UserData> {
    return this.httpService.putData('user/status', { status }, {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }

  getUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }
}
