import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { Error404Component } from './shared/error404/error404.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '404',
    component: Error404Component,
  },
 
  {
    path: '**',
    redirectTo: '404'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }