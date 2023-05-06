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
    private toastService: ToastService
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.formRegister.valid && this.formRegister.get('password').value == this.formRegister.get('repeatPassword').value) {

      this.authService.register({ email: this.formRegister.get('email').value, password: this.formRegister.get('password').value })
        .then(response => {

          sessionStorage.setItem('userFirebase', JSON.stringify(response.user))
          sessionStorage.setItem('accessToken', response.user['accessToken']);

          const email = this.formRegister.get('email').value;
          const username = email.split('@')[0].slice(0);
          const img = 'https://firebasestorage.googleapis.com/v0/b/tasteit-java.appspot.com/o/images%2Fno-image.png?alt=media&token=1c7acf14-d102-48bd-8e30-86f2fefb76de'

          this.apiService.registerUser(response.user['uid'],username,img,'my biography').subscribe()

          this.toastService.alertGenerator('Great!', 'almost done, just login to start!', 4)

          this.router.navigate(['/login'])

        })

    }
  }
}
