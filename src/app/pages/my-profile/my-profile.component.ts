import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  userNeo: UserResponse;
  private token: string;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { 
    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;
  }

  ngOnInit(): void {

    
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
