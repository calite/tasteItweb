import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

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
