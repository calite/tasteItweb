import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential, User, getAuth, updatePassword } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { toastCoreConfig } from '@costlydeveloper/ngx-awesome-popup/ngx-awesome-popup/types/toast-notification/core/classes';
import { ToastService } from './toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser: any;


  constructor(private auth: Auth, private apiService: ApiService, private router: Router, private toastService: ToastService) {
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

  // saveUser(user: any) { //promesa para que se ejecute el metodo una vez se reciba la respuesta del servidor de firebase
  //   return new Promise<void>((resolve, reject) => {
  //     this.apiService.getUserByToken(user.uid)
  //       .subscribe(response => {
  //         sessionStorage.setItem('currentUser', JSON.stringify(response)); //almacenamos el usuario
  //         resolve();
  //       }, error => {
  //         reject(error);
  //       });
  //   });
  // }

  getUser() {
    this.currentUser = sessionStorage.getItem('currentUser'); //recogemos el usuario
    return JSON.parse(this.currentUser);
  }

  clearUser() {
    sessionStorage.clear();
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
        }).catch(error => {
          console.log('Fail to refresh token: ' + error)
        });
      }
    });
  }

  changePassword(newPassword) {
    const auth = getAuth()

    const user = auth.currentUser;

    updatePassword(user, newPassword).then(() => {
      this.toastService.toastGenerator('', 'password changed', 4, ToastPositionEnum.BOTTOM_RIGHT)
    }).catch(error => {
      if(error.code == 'auth/weak-password')
      this.toastService.toastGenerator('', 'Password should be at least 6 characters', 4, ToastPositionEnum.BOTTOM_RIGHT)
    })
  }


}