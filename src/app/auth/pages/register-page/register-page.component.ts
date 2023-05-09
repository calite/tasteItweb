import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  formRegister: FormGroup;
  hide1 = true;
  hide2 = true;


  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })
  }

  showPassword(hide) {
    if(hide) hide = false
    else hide = true
  }

  onSubmit() {
    if (this.formRegister.valid) {
      if (this.formRegister.valid && this.formRegister.get('password').value == this.formRegister.get('repeatPassword').value) {

        this.authService.register({ email: this.formRegister.get('email').value, password: this.formRegister.get('password').value })
          .then(response => {

            const email = this.formRegister.get('email').value;
            const username = email.split('@')[0].slice(0);
            const img = 'https://raw.githubusercontent.com/calite/no-image/main/no-image.png'

            this.apiService.registerUser(response.user['uid'], username, img, 'my biography').subscribe()

            this.toastService.alertGenerator('Great!', 'almost done, just log in to start!', 4)

            this.router.navigate(['/login'])

          })
          .catch( error => {
            if(error.code = 'auth/email-already-in-use'){
              this.toastService.alertGeneratorWithoutCancel('Error!', 'email already in use', 4)
            }
          })
      }
    }
  }
}
