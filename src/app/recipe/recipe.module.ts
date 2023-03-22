import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RandomComponent } from './pages/random/random.component';
import { SearchComponent } from './pages/search/search.component';



@NgModule({
  declarations: [
    HomeComponent,
    RandomComponent,
    SearchComponent
  ],
  exports: [
    HomeComponent,
    RandomComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecipeModule { }
