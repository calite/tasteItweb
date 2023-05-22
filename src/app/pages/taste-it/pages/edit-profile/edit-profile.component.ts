import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { v4 as uuidv4 } from 'uuid';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  formUser: FormGroup;

  private currentUser: UserResponse;

  photo: string; //a este le damos la url
  imgSelected: File;
  imgUrl: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService,
    private storage: Storage,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      biography: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      imgProfile: new FormControl('')
    })
  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    this.isOwner()

    this.formUser.get('username').setValue(this.currentUser.username)
    this.formUser.get('biography').setValue(this.currentUser.biography)
    this.imgUrl = this.currentUser.imgProfile

  }

  async isOwner() { //se compueba si el usuario actual es el propieario
    let tokenFromUrl = ''

    await this.activatedRoute.paramMap.subscribe(params => {
      tokenFromUrl = params.get('token')

    })

    const token = this.currentUser.token

    if (tokenFromUrl != token) {
      this.toastService.toastGenerator('', 'You are not the owner of this account', 4, ToastPositionEnum.BOTTOM_RIGHT);
      this.route.navigate(['./taste-it/home']); //enviamos al home si no lo es

    }

  }

  onFileSelected($event): void {

    this.imgSelected = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;
    };
    reader.readAsDataURL(this.imgSelected);
  }

  async uploadPhoto(): Promise<string> {

    const file = this.imgSelected;
    const uuid = uuidv4();
    const imgRef = ref(this.storage, `images/${uuid}`);

    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      //console.log(`Imagen subida correctamente. URL de descarga: ${url}`);
      return url;
    } catch (error) {
      //console.log(`Error al subir la imagen: ${error}`);
      return '';
    }
  }

  async onSubmit() {

    if (this.formUser.controls.password.dirty && this.formUser.controls.confirmPassword.dirty) {

      let password = this.formUser.get('password').value
      let confirmPassword = this.formUser.get('confirmPassword').value

      if (password === confirmPassword && password.length > 0) {
        this.authService.changePassword(password)
      } else {
        this.toastService.toastGenerator('', 'password are not equals', 4, ToastPositionEnum.BOTTOM_LEFT)
        return
      }

    }


    if (this.formUser.valid) {

      if (this.formUser.controls.imgProfile.dirty) { //si hay cambios en la foto

        this.imgUrl = await this.uploadPhoto() // subimos foto        

        //if (this.currentUser.imgProfile != 'https://raw.githubusercontent.com/calite/no-image/main/no-image.png') {

        const uriOldImage = ref(this.storage, this.currentUser.imgProfile) // borramos la foto vieja

        deleteObject(uriOldImage).then(() => {
          //console.log('image deleted')
        }).catch(error => {
          //console.log('something wrong happen' + error)
        })
        //}

      }

      let token = this.currentUser.token
      let username = this.formUser.controls.username.value
      let imgProfile = this.imgUrl
      let biography = this.formUser.controls.biography.value

      this.apiService.postEditUser(token, username, imgProfile, biography)
        .subscribe(response => {
          //actualizamos los datos locales tras updatear la bbdd
          this.currentUser.username = username
          this.currentUser.imgProfile = imgProfile
          this.currentUser.biography = biography
          sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser))

          this.toastService.toastGenerator('', 'Perfil updated', 4, ToastPositionEnum.BOTTOM_LEFT)

          this.route.navigate([`./taste-it/profile/${this.currentUser.token}`])
        })

    }

  }

  deleteAccount() {

    this.toastService.alertGenerator('Delete Confirmation', 'Are you sure? All your data will be lost', 3)
      .subscribe((result) => {
        if (result.success === true) {

          this.apiService.postDeleteUser(this.currentUser.token).subscribe(
            response => {
              //console.log(response)
            }
          )

          const uriOldImage = ref(this.storage, this.currentUser.imgProfile) // borramos la foto del usuario

          deleteObject(uriOldImage).then(() => {
            //console.log('image deleted')
          }).catch(error => {
            //console.log('something wrong happen' + error)
          })

          this.authService.deleteUser();

          sessionStorage.clear();

          this.route.navigate(['./auth/login']);

        }
      });

  }

  backToProfile() {
    this.route.navigate([`./profile/${this.currentUser.token}`])
  }

}
