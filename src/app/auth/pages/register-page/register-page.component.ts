import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { v4 as uuidv4 } from 'uuid';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  formRegister: FormGroup;
  hide1 = true;
  hide2 = true;
  registerInto = false;


  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
    private storage: Storage,
  ) {
    var temp = sessionStorage.getItem('temp')

    this.formRegister = new FormGroup({
      email: new FormControl(temp, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.translate.use(localStorage.getItem('language'))
  }

  showPassword(type) {
    {
      if (type == 1) {
        if (this.hide1) this.hide1 = false
        else this.hide1 = true
      }

      if (type == 2) {
        if (this.hide2) this.hide2 = false
        else this.hide2 = true
      }

    }

  }

  async convertImageToBlob(img: HTMLImageElement): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 1);
    });
  }

  async uploadPhoto(): Promise<string> {
    const img = document.getElementById('imgHidden') as HTMLImageElement;
    const imgBlob = await this.convertImageToBlob(img);
    const uuid = uuidv4();
    const imgRef = ref(this.storage, `images/${uuid}`);

    try {
      await uploadBytes(imgRef, imgBlob);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      return '';
    }
  }


  onSubmit() {
    if (this.formRegister.valid) {

      this.registerInto = true;

      if (this.formRegister.valid && this.formRegister.get('password').value == this.formRegister.get('repeatPassword').value) {

        this.authService.register({ email: this.formRegister.get('email').value, password: this.formRegister.get('password').value })
          .then(async response => {

            const email = this.formRegister.get('email').value;
            const username = email.split('@')[0].slice(0);
            const img = await this.uploadPhoto()

            this.apiService.registerUser(response.user['uid'], username, img, 'my biography').subscribe()

            this.registerInto = false;

            this.toastService.alertGenerator(this.translate.instant('COMMON.GREAT'), this.translate.instant('LOGIN.ALMOST_DONE'), 1)

            sessionStorage.setItem('temp', this.formRegister.controls.email.value);

            this.router.navigate(['./auth/login'])

          })
          .catch(error => {
            if (error.code = 'auth/email-already-in-use') {
              this.registerInto = false;
              this.toastService.alertGeneratorWithoutCancel('Error!', this.translate.instant('LOGIN.EMAIL_USED'), 4)
            }
          })
      }
    }
  }
}
