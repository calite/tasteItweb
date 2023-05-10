import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { v4 as uuidv4 } from 'uuid';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';



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
    private storage: Storage,
    private http: HttpClient
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
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
      console.log(`Imagen subida correctamente. URL de descarga: ${url}`);
      return url;
    } catch (error) {
      console.log(`Error al subir la imagen: ${error}`);
      return '';
    }
  }
  

  onSubmit() {
    if (this.formRegister.valid) {
      if (this.formRegister.valid && this.formRegister.get('password').value == this.formRegister.get('repeatPassword').value) {

        this.authService.register({ email: this.formRegister.get('email').value, password: this.formRegister.get('password').value })
          .then(async response => {

            const email = this.formRegister.get('email').value;
            const username = email.split('@')[0].slice(0);
            const img = await this.uploadPhoto()

            console.log(img)

            this.apiService.registerUser(response.user['uid'], username, img, 'my biography').subscribe()

            this.toastService.alertGenerator('Great!', 'almost done, just log in to start!', 4)

            this.router.navigate(['/login'])

          })
          .catch(error => {
            if (error.code = 'auth/email-already-in-use') {
              this.toastService.alertGeneratorWithoutCancel('Error!', 'email already in use', 4)
            }
          })
      }
    }
  }
}
