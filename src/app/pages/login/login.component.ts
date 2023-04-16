import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../core/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {

    var currentUser = this.userService.getUser(); // miramos a ver si hay un usuario

    if (currentUser != null) {
      this.router.navigate(['/home']);
    }

  }

  onSubmit() {

    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.userService.saveUser(response.user);//guardamos al usuario en local
        this.router.navigate(['/home']);
      })
      .catch(error =>  {
        console.log(error)
        alert("You dont have an account, you will be redirected to the register.");
        this.router.navigate(['/register']);
      });
        
        
  }

  loginWithGoogle() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.userService.saveUser(response.user);//guardamos al usuario en local
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error))
  }

  sendToRegister() {
    this.router.navigate(['/register']);
  }

}
