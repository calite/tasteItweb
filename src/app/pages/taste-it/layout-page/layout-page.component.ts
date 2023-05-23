import { Component } from '@angular/core';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public currentUser: UserResponse;
  public isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')) //asignamos al usuario
    this.checkAdmin();
  }

  onLogout() {
    this.authService.logout();
  }

  goProfile() {

    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/profile/' + this.currentUser.token]);
    });

  }

  goRandom() {

    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/random/'])
    });
    
  }

  checkAdmin() {
    if(this.currentUser.profile == 101) {
        this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  goBackend() {

    this.checkAdmin()

    if(this.isAdmin) {
      this.router.navigate(['./backend/recipes'])
    }

  }

}
