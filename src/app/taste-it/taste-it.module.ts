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
import { SharedModule } from '../shared/shared.module';
import { RecyclerViewComponent } from './components/recycler-view/recycler-view.component';




@NgModule({
  declarations: [
    HomePageComponent,
    LayoutPageComponent,
    SearchPageComponent,
    RandomPageComponent,
    ProfilePageComponent,
    MyBookPageComponent,
    RecyclerViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    TasteItRoutingModule,
    SharedModule
  ]
})
export class TasteItModule { }
