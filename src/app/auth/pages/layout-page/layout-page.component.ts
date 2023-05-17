import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {


  constructor(private authService : AuthService, private router : Router){

  }
  ngOnInit(): void { //comprobamos si existe usuario logeado y enviamos al home
    if(this.authService.checkAuth()) {

      this.router.navigate(['./taste-it'])

    }

  }

}
