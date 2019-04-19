import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';



@Injectable()
export class CustomHttpService {

  constructor(private http: HttpClient,
              private router: Router) {}

  makeRequest(url, method, params?, body?) {
    return this.http.request.bind(url, {method, params, body})
      .map(res => res.json())
      .catch(error => {
        if (error.status === 401) {
          sessionStorage.removeItem('user');
          this.router.navigate(['/login', {url: this.router.url.slice(1)}]);
          return throwError('User is not logged in');
        }
        return throwError(error.json().message || 'An error occurred');
      });
  }

}
