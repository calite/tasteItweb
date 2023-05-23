import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    MaterialModule
  ]
})
export class PagesModule { }
