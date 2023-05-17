import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent {



  constructor(private router : Router){

  }

  goFront() {
    this.router.navigate(['./taste-it'])
  }

}
