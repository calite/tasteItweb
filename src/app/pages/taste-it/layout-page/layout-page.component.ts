import { Component, HostListener, inject } from '@angular/core';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, TitleStrategy } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public currentUser: UserResponse;
  public isAdmin: boolean;
  private readonly viewport = inject(ViewportScroller);
  public canGoTop: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if (window.pageYOffset > 500) {
      this.canGoTop = true;
    } else {
      this.canGoTop = false;
    }

  }


  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')) //asignamos al usuario
    this.checkAdmin();
  }

  onLogout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/']);
    });
  }

  goProfile() {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/profile/' + this.currentUser.token]);
    });
  }

  goSearch() {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/search/']);
    });
  }

  goRandom() {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/random/'])
    });
  }

  goMyBook() {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['./taste-it/my-book/'])
    });
  }

  checkAdmin() {
    if (this.currentUser.profile == 101) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  goBackend() {

    this.checkAdmin()

    if (this.isAdmin) {
      this.router.navigate(['./backend/recipes'])
    }

  }

  goTop() {
    var rootElement = document.documentElement;

    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}
