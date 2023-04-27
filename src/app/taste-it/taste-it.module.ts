import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TasteItRoutingModule } from './taste-it-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RandomPageComponent } from './pages/random-page/random-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyBookPageComponent } from './pages/my-book-page/my-book-page.component';
import { ViewRecipePageComponent } from './pages/view-recipe-page/view-recipe-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';







@NgModule({
    declarations: [
        HomePageComponent,
        LayoutPageComponent,
        SearchPageComponent,
        RandomPageComponent,
        ProfilePageComponent,
        MyBookPageComponent,
        ViewRecipePageComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        TasteItRoutingModule,
        CommonModule,
        SharedModule,
        ComponentsModule
    ]
})
export class TasteItModule { }
