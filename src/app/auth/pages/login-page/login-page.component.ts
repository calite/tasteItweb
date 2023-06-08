import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  formLogin: FormGroup;
  hide = true;
  loginInto = false;

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
    private resetPasswordDialog: MatDialog,
  ) {

    var temp = sessionStorage.getItem('temp')

    this.formLogin = new FormGroup({
      email: new FormControl(temp, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.translate.use(localStorage.getItem('language'))
  }

  showPassword() {
    if (this.hide) this.hide = false
    else this.hide = true
  }

  onSubmit() {
    if (this.formLogin.valid) {

      this.loginInto = true;

      this.authService.login(this.formLogin.value)
        .then(response => { //almacenamos la repuesta de firebase en local
          sessionStorage.setItem('userFirebase', JSON.stringify(response.user))
          sessionStorage.setItem('accessToken', response.user['accessToken']);

          this.apiService.updateApiKey();

          this.apiService.getUserByToken(response.user.uid)
            .subscribe(response => { //almacenamos los datos del usuario desde neo en local
              sessionStorage.removeItem('temp');
              sessionStorage.setItem('currentUser', JSON.stringify(response));
              this.loginInto = false;
              this.router.navigate(['/taste-it']);
            })

        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            this.loginInto = false;
            this.toastService.alertGeneratorWithoutCancel('Error!', this.translate.instant('LOGIN.ERR_LOGIN'), 4)
          }
          if (error.code === 'auth/user-not-found') {
            this.loginInto = false;
            this.toastService.alertGenerator('Ups!', this.translate.instant('LOGIN.NO_ACC_WARNING'), 4)
              .subscribe((result) => {
                if (result.success === true) {
                  sessionStorage.setItem('temp', this.formLogin.controls.email.value);
                  this.router.navigate(['/auth/register']);
                }
              });
          }
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

  resetPassword() {
    this.resetPasswordDialog.open(ResetPasswordDialogComponent);
  }

}
