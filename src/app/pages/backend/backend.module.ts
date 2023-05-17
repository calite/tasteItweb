import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendComponent } from './backend.component';
import { BackRoutingModule } from './backend.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BackendComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BackRoutingModule
  ]
})
export class BackendModule { }
