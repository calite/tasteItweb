import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

    var currentUser = this.authService.getUser(); // miramos a ver si hay un usuario

    if (currentUser != null) {
      this.router.navigate(['/home']);
    }

  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value)
        .then(response => {
          
          sessionStorage.setItem('userFirebase',JSON.stringify(response.user))

          sessionStorage.setItem('accessToken', response.user['accessToken']);
          this.authService.saveUser(response.user)
            .then(() => { //se ejecutra el metodo save user con una promesa
              this.router.navigate(['/home']);
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          this.toastService.alertGenerator('Ups!', 'Looks like you dont have and account, do you want to register?', 4)
            .subscribe((result) => {
              if (result.success === true) {
                this.router.navigate(['/auth/register']);
              }
            });
        });
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(response => {
        this.authService.saveUser(response.user);//guardamos al usuario en local
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error))
  }

  sendToRegister() {
    this.router.navigate(['/register']);
  }

}
