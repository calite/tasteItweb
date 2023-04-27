import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {

    var currentUser = this.authService.getUser(); // miramos a ver si hay un usuario

    if (currentUser != null) {
      this.router.navigate(['/home']);
    }

  }

  onSubmit() {

    this.authService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.authService.saveUser(response.user);//guardamos al usuario en local
        this.router.navigate(['/home']);
      })
      .catch(error =>  {
        console.log(error)
        alert("You dont have an account, you will be redirected to the register.");
        this.router.navigate(['/register']);
      });
        
        
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.authService.saveUser(response.user);//guardamos al usuario en local
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error))
  }

  sendToRegister() {
    this.router.navigate(['/register']);
  }

}
