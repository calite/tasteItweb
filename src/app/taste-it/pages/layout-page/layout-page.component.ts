import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public currentUser: UserResponse;

  constructor(private authService: AuthService, private router : Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')) //asignamos al usuario
  }


  onLogout() {
    this.authService.logout();
  }

  goProfile() {
    console.log(this.currentUser);
    this.router.navigateByUrl("profile/" + this.currentUser.token)
    //window.location.reload();
  }

}
