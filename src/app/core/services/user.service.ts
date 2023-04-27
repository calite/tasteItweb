import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  currentUser : any;


  constructor(private auth: Auth) { }

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
    localStorage.removeItem('userNeo');
    return signOut(this.auth);
  }

  saveUser(user : any) {
    localStorage.setItem('currentUser',JSON.stringify(user)); //almacenamos el usuario
  }

  getUser(){
    this.currentUser = localStorage.getItem('currentUser'); //recogemos el usuario
    return JSON.parse(this.currentUser);
  }

  clearUser(){
    localStorage.removeItem('currentUser');
  }

}