import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Error404Component } from './shared/error404/error404.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./taste-it/taste-it.module').then(m => m.TasteItModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  },

  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { 
  //     path: 'register', 
  //     component: RegisterComponent 
  // },
  // { 
  //     path: 'login', 
  //     component: LoginComponent 
  // },
  // {
  //     path: 'home',
  //     component: HomeComponent,
  //     ...canActivate(() => redirectUnauthorizedTo(['/register']))
  // },
  // {
  //     path: 'search',
  //     component: SearchComponent,
  // },
  // {
  //     path: 'random',
  //     component: RandomComponent,
  // },
  // {
  //     path: 'mybook',
  //     component: MyBookComponent,
  // },
  // {
  //     path: 'myprofile',
  //     component: MyProfileComponent,
  // },
  // {
  //     path: 'recipe/:recipeId',
  //     component: ViewRecipeComponent,
  // },
  // {
  //     path: '**',
  //     redirectTo: 'login'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }