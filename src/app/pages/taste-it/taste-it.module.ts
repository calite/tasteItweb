import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { TasteItRoutingModule } from './taste-it.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { RandomPageComponent } from './random-page/random-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyBookPageComponent } from './my-book-page/my-book-page.component';
import { ViewRecipePageComponent } from './view-recipe-page/view-recipe-page.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateRecipePageComponent } from './create-recipe-page/create-recipe-page.component';
import { EditRecipePageComponent } from './edit-recipe-page/edit-recipe-page.component';
import { EditProfileComponent } from './profile-page/edit-profile/edit-profile.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { BioComponent } from './profile-page/bio/bio.component';
import { CommentsOnUserComponent } from './profile-page/comments-on-user/comments-on-user.component';
import { CommentsOnRecipeComponent } from './view-recipe-page/comments-on-recipe/comments-on-recipe.component';
import { MeComponent } from './my-book-page/me/me.component';
import { FollowedComponent } from './my-book-page/followed/followed.component';
import { LikedComponent } from './my-book-page/liked/liked.component';
import { PhotosComponent } from './profile-page/photos/photos.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        HomePageComponent,
        LayoutPageComponent,
        SearchPageComponent,
        RandomPageComponent,
        ProfilePageComponent,
        MyBookPageComponent,
        ViewRecipePageComponent,
        CreateRecipePageComponent,
        EditRecipePageComponent,
        EditProfileComponent,
        BioComponent,
        CommentsOnUserComponent,
        CommentsOnRecipeComponent,
        MeComponent,
        FollowedComponent,
        LikedComponent,
        PhotosComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        TasteItRoutingModule,
        SharedModule,
        BarRatingModule,
        TranslateModule
    ]
})
export class TasteItModule { }
