import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential, User, getAuth, updatePassword, sendPasswordResetEmail, deleteUser } from '@angular/fire/auth';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { UserResponse } from '../interfaces/user.interface';

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

  getUser() {
    this.currentUser = sessionStorage.getItem('currentUser'); //recogemos el usuario
    return JSON.parse(this.currentUser);
  }

  clearUser() {
    sessionStorage.clear();
  }

  saveUser(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  checkAuth(): boolean {
    if (!sessionStorage.getItem('currentUser')) return false
    return true
  }

  checkAdmin() : boolean {
    
    let aux : UserResponse = JSON.parse(sessionStorage.getItem('currentUser'));

    if(aux.profile === 101) {
      return true;
    }else {
      return false;
    }

  }

  renewIdToken() {
    this.auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken(true).then(newToken => {
          sessionStorage.setItem('accessToken', newToken);
        }).catch(error => {
        });
      }
    });
  }

  changePassword(newPassword) {
    const auth = getAuth()

    const user = auth.currentUser;

    updatePassword(user, newPassword).then(() => {
    }).catch(error => {
      if (error.code == 'auth/weak-password')
        this.toastService.toastGenerator('', 'Password should be at least 6 characters', 4, ToastPositionEnum.BOTTOM_LEFT)
    })
  }

  resetPassword(email) {
    const auth = getAuth()

    sendPasswordResetEmail(auth, email).then(() => {
      this.toastService.alertGeneratorWithoutCancel('', `an email was send to ${email}`, 4)
    }).catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.toastService.toastGenerator('', 'that emails is not registered', 4, ToastPositionEnum.BOTTOM_LEFT)
      }
    })

  }

  deleteUser() {

    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });

  }


}