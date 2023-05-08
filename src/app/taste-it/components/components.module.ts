import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material/material.module';

import { BioComponent } from './bio/bio.component';
import { FollowedComponent } from './followed/followed.component';
import { LikedComponent } from './liked/liked.component';
import { MeComponent } from './me/me.component';
import { PhotosComponent } from './photos/photos.component';
import { RecyclerViewComponent } from './recycler-view/recycler-view.component';
import { CommentsOnUserComponent } from './comments-on-user/comments-on-user.component';
import { CommentsOnRecipeComponent } from './comments-on-recipe/comments-on-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';



@NgModule({
  declarations: [
    BioComponent,
    PhotosComponent,
    FollowedComponent,
    LikedComponent,
    MeComponent,
    RecyclerViewComponent,
    BioComponent,
    CommentsOnUserComponent,
    CommentsOnRecipeComponent,
    RecipeCreatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
  , exports: [
    BioComponent,
    PhotosComponent,
    FollowedComponent,
    LikedComponent,
    MeComponent,
    RecyclerViewComponent,
    BioComponent,
    CommentsOnUserComponent,
    CommentsOnRecipeComponent,
    RecipeCreatorComponent
  ]
})
export class ComponentsModule { }
