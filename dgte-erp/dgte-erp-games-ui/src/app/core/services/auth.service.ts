import { Observable, } from 'rxjs';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  getUser(): Promise<any> {
      return this.afAuth.authState.pipe(first()).toPromise();
  }

  public authState(): Observable<firebase.User> {
      return this.afAuth.authState;
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log(result);
        this.afAuth.auth.currentUser.getIdToken().then(token => {
            console.log(token);
        });
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }

  public logout(): any {
      this.afAuth.auth.signOut();
  }

}