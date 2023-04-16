import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent {

  private userNeo : UserResponse;

  constructor(
    private sanitizer: DomSanitizer,
  ) { 
    this.userNeo = JSON.parse(localStorage.getItem('userNeo')) //asignamos al usuario
  }

  ngOnInit(): void {

    
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
