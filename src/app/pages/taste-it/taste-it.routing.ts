import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomPageComponent } from './random-page/random-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MyBookPageComponent } from './my-book-page/my-book-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ViewRecipePageComponent } from './view-recipe-page/view-recipe-page.component';
import { CreateRecipePageComponent } from './create-recipe-page/create-recipe-page.component';
import { EditRecipePageComponent } from './edit-recipe-page/edit-recipe-page.component';
import { EditProfileComponent } from './profile-page/edit-profile/edit-profile.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'random', component: RandomPageComponent },
      { path: 'my-book', component: MyBookPageComponent },
      { path: 'profile/:token', component: ProfilePageComponent },
      { path: 'edit-profile/:token', component: EditProfileComponent },
      { path: 'recipe/:recipeId', component: ViewRecipePageComponent },
      { path: 'create-recipe', component: CreateRecipePageComponent },
      { path: 'edit-recipe/:recipeId/:token', component: EditRecipePageComponent },
      { path: '**', redirectTo: 'home' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasteItRoutingModule { }
