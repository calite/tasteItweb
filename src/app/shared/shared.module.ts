import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    Error404Component
  ],
  exports: [
    LoadingSpinnerComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
