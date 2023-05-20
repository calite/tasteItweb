import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { ResetPasswordDialogComponent } from '../../dialogs/reset-password-dialog/reset-password-dialog.component';

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
    private toastService: ToastService,
    private resetPasswordDialog: MatDialog,
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  showPassword() {
    if (this.hide) this.hide = false
    else this.hide = true
  }

  onSubmit() {
    if (this.formLogin.valid) {

      this.authService.login(this.formLogin.value)
        .then(response => { //almacenamos la repuesta de firebase en local
          sessionStorage.setItem('userFirebase', JSON.stringify(response.user))
          sessionStorage.setItem('accessToken', response.user['accessToken']);

          this.apiService.updateApiKey();

          this.apiService.getUserByToken(response.user.uid)
            .subscribe(response => { //almacenamos los datos del usuario desde neo en local
              sessionStorage.setItem('currentUser', JSON.stringify(response));
              this.router.navigate(['/taste-it']);
            })

        })
        .catch(error => {
          //console.log(error)
          if (error.code === 'auth/wrong-password') {
            this.toastService.alertGeneratorWithoutCancel('Error!', 'email or password wrong!', 4)
          }
          if (error.code === 'auth/user-not-found') {
            this.toastService.alertGenerator('Ups!', 'Looks like you dont have and account, do you want to register?', 4)
              .subscribe((result) => {
                if (result.success === true) {
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
    const dialogRef = this.resetPasswordDialog.open(ResetPasswordDialogComponent);
  }

}
