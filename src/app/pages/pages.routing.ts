import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { 
        path: 'taste-it',  
        loadChildren: () => import('./taste-it/taste-it.module').then(m => m.TasteItModule), 
        canActivate: [AuthGuard],
        canMatch: [AuthGuard]
      },
      { 
        path: 'backend',  
        loadChildren: () => import('./backend/backend.module').then(m => m.BackendModule),
        canActivate: [AuthGuard,AdminGuard],
        canMatch: [AuthGuard,AdminGuard] 
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
