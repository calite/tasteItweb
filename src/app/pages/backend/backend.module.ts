import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendComponent } from './backend.component';
import { BackRoutingModule } from './backend.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { UsersPageComponent } from './users-page/users-page.component';



@NgModule({
  declarations: [
    BackendComponent,
    RecipesPageComponent,
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BackRoutingModule,
    MaterialModule
  ]
})
export class BackendModule { }
