import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from '@angular/fire/auth';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth
 ) {}

  doFacebookLogin() {
    return this.authLogin(new FacebookAuthProvider());
  }

  doTwitterLogin() {
    return this.authLogin(new TwitterAuthProvider());
  }

  doGoogleLogin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  doRegister(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);   
  }

  doLogin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  doLogout() {
    return this.afAuth.signOut();
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkLogin(): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

}
