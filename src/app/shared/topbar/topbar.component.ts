import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'shared-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  public userNeo : UserResponse;

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.userNeo = JSON.parse(localStorage.getItem('userNeo')) //asignamos al usuario
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
