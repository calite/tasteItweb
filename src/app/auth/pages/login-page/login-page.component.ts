import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  formLogin: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  showPassword(hide) {
    if(hide) hide = false
    else hide = true
  }

  onSubmit() {
    if (this.formLogin.valid) {

      this.authService.login(this.formLogin.value)
        .then(response => { //almacenamos la repuesta de firebase en local
          console.log(response)
          sessionStorage.setItem('userFirebase', JSON.stringify(response.user))
          sessionStorage.setItem('accessToken', response.user['accessToken']);

          this.apiService.updateApiKey();

          this.apiService.getUserByToken(response.user.uid)
            .subscribe(response => { //almacenamos los datos del usuario desde neo en local
              sessionStorage.setItem('currentUser', JSON.stringify(response));
              this.router.navigate(['/home']);
            })

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

  // loginWithGoogle() {
  //   this.authService.loginWithGoogle()
  //     .then(response => {
  //       this.authService.saveUser(response.user);//guardamos al usuario en local
  //       this.router.navigate(['/home']);
  //     })
  //     .catch(error => console.log(error))
  // }

  sendToRegister() {
    this.router.navigate(['/register']);
  }

}
