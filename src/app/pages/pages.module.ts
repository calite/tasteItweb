import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyBookComponent } from './my-book/my-book.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RandomComponent } from './random/random.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

import { MeComponent } from './my-book/me/me.component';
import { LikedComponent } from './my-book/liked/liked.component';
import { FollowedComponent } from './my-book/followed/followed.component';
import { BioComponent } from './my-profile/bio/bio.component';
import { CommentsComponent } from './my-profile/comments/comments.component';
import { SharedModule } from '../shared/shared.module';


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
    MeComponent,
    LikedComponent,
    FollowedComponent,
    BioComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatTabsModule,
    SharedModule
  ]
})
export class PagesModule { }
