import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { TasteItRoutingModule } from './taste-it.routing';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RandomPageComponent } from './pages/random-page/random-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyBookPageComponent } from './pages/my-book-page/my-book-page.component';
import { ViewRecipePageComponent } from './pages/view-recipe-page/view-recipe-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { CreateRecipePageComponent } from './pages/create-recipe-page/create-recipe-page.component';
import { EditRecipePageComponent } from './pages/edit-recipe-page/edit-recipe-page.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { BarRatingModule } from 'ngx-bar-rating';

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
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        TasteItRoutingModule,
        SharedModule,
        ComponentsModule,
        DialogsModule,
        BarRatingModule
    ]
})
export class TasteItModule { }
