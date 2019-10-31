import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseTokenInterceptor implements HttpInterceptor {
  private authStateSub: any;
  private token: string;

  constructor(private afAuth: AngularFireAuth) {
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.afAuth.auth.currentUser.getIdToken().then(token => {
          this.token = token;
        });
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          'X-Firebase-Auth': `${this.token}`
        }
      });
    }

    return next.handle(request);
  }
}