import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendComponent } from './backend.component';
import { UsersPageComponent } from '../backend/users-page/users-page.component';
import { RecipesPageComponent } from '../backend/recipes-page/recipes-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewRecipeReportedComponent } from './view-recipe-reported/view-recipe-reported.component';


const routes: Routes = [
  {
    path: '',
    component: BackendComponent,
    children: [
      { path: 'recipes', component: RecipesPageComponent },
      { path: 'view-recipe/:rid', component: ViewRecipeReportedComponent },
      { path: 'users', component: UsersPageComponent },
      { path: '**', redirectTo: 'home' },

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BackRoutingModule { }
