import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser: any;


  constructor(private auth: Auth, private apiService: ApiService, private router: Router) {
   }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.clearUser();//removemos el usuario al hacer logout
    this.router.navigate(['./auth/login'])
    return signOut(this.auth);
  }

  saveUser(user: any) { //promesa para que se ejecute el metodo una vez se reciba la respuesta del servidor de firebase
    return new Promise<void>((resolve, reject) => {
      this.apiService.getUserByToken(user.uid)
        .subscribe(response => {
          sessionStorage.setItem('currentUser', JSON.stringify(response)); //almacenamos el usuario
          resolve();
        }, error => {
          reject(error);
        });
    });
  }

  getUser() {
    this.currentUser = sessionStorage.getItem('currentUser'); //recogemos el usuario
    return JSON.parse(this.currentUser);
  }

  clearUser() {
    sessionStorage.removeItem('currentUser');
  }

  checkAuth(): Observable<boolean> {
    if (!sessionStorage.getItem('currentUser')) return of(false)
    return of(true)
  }


  renewIdToken() {
    this.auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken(true).then(newToken => {
          sessionStorage.setItem('accessToken', newToken);
          console.log('good')
        }).catch(error => {
          console.log('ups')
        });
      }
    });
  }
  /*
  renewIdToken(): Observable<string> {
    return new Observable(observer => {
      const user = this.auth.currentUser;
      if (user) {
        user.getIdToken(true).then(newToken => {
          sessionStorage.setItem('accessToken', newToken);
          observer.next(newToken);
        }).catch(error => {
          observer.error(error);
        });
      } else {
        observer.error('No user is currently signed in.');
      }
    });
  }
  */

}