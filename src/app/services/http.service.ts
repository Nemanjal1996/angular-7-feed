import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers = this.getHeaders();
  public options = this.getOptions();
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUrl(): string {
    return environment.apiUrl;
  }

  getOptions(): any {
    return {
      observe: 'response'
    };
  }

  getHeaders(): any {
    if (this.isLoggedIn()) {
      return new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `bearer ${this.getToken()}`
      });
    } else {
      return new HttpHeaders({
        'Content-type': 'application/json'
      });
    }
  }

  public getData(params: string, dataOptions: any): Observable<any> {
    const url: string = this.getUrl() + params;
    return this.http.get(url, dataOptions).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.handleError);
      })
    );
  }

  public postData(
    params: string,
    body: any,
    dataOptions: any
  ): Observable<any> {
    const url: string = this.getUrl() + params;
    return this.http.post(url, body, dataOptions).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError({ message: this.handleError, obj: error });
      })
    );
  }

  public putData(
    params: string,
    body?: any,
    dataOptions?: any
  ): Observable<any> {
    const url: string = this.getUrl() + params;
    return this.http.put(url, body, dataOptions).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError({ message: this.handleError, obj: error });
      })
    );
  }

  public deleteData(params: string, dataOptions: any): Observable<any> {
    const url: string = this.getUrl() + params;
    return this.http.delete(url, dataOptions).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError({ message: this.handleError, obj: error });
      })
    );
  }

  private isResponseOkCallBack(error) {
    if (error.status === 404) {
      this.router.navigate(['/not-found']);
    } else if (error.status === 401) {
      this.router.navigate(['home'], {
        queryParams: { error: 'unauthorized' }
      });
      // location.reload(true);
      return throwError('Unauthorized');
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return throwError(errMsg);
  }

  public isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }

  public getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : '';
  }
}
