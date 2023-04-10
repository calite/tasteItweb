import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyBookComponent } from './my-book/my-book.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RandomComponent } from './random/random.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';



@NgModule({
  declarations: 
  [
    HomeComponent,
    LoginComponent,
    MyBookComponent,
    MyProfileComponent,
    RandomComponent,
    RegisterComponent,
    SearchComponent,
    ViewRecipeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
