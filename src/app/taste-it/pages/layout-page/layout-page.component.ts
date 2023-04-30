import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public currentUser : UserResponse;

  public menuItems = [
    {label: 'home', icon: 'home', url:'.'},
    {label: 'search', icon: 'search', url:'./search'},
    {label: 'random', icon: 'shuffle', url:'./random'},
    {label: 'my book', icon: 'menu_book', url:'./my-book'},
  ]

  constructor(private sanitizer: DomSanitizer, private authService: AuthService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')) //asignamos al usuario
  }


  onLogout() {
    this.authService.logout();
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
