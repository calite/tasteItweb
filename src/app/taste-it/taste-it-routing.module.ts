import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomPageComponent } from './pages/random-page/random-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MyBookPageComponent } from './pages/my-book-page/my-book-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ViewRecipePageComponent } from './pages/view-recipe-page/view-recipe-page.component';


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
          { path: 'recipe/:recipeId', component: ViewRecipePageComponent },
          { path: '**', redirectTo: 'home' },
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasteItRoutingModule { }
