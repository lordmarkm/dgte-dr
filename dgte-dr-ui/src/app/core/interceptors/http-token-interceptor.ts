import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@los/core/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(protected authService: AuthService,
              protected router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token && !request.headers.get('Authorization')) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.get('Content-Type')) {
      // disable this for now
      // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 400:
              // change password
              if (err.error && err.error.error === "invalid_grant") {
                this.router.navigate(['/admin/change-password']);
              } else {
                return throwError(err);
              }
            case 401:
              // invalid credentials
              if (err.error && err.error.error === "unauthorized") {
                this.router.navigate(['/admin/login']);
              } else {
                return throwError(err);
              }
            case 404:
              // not found
          }
        }

        return throwError(err);
      })
    );
  }

}
