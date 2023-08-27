import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth) { }

  getCurrentUser(): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(userUpdatedInfos: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = this.afAuth.currentUser.then(user => {
        user?.updateProfile({
          displayName: userUpdatedInfos.name,
          photoURL: userUpdatedInfos.photoURL
        }).then(res => {
          console.log(res);
          return resolve(res);
        }, err => reject(err));
      });
      });
  }
}
