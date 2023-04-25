import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RecyclerViewComponent } from './recycler-view/recycler-view.component';
import { CommentsOnUserComponent } from './comments-on-user/comments-on-user.component';
import { PhotosOfRecipesComponent } from './photos-of-recipes/photos-of-recipes.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    LoadingSpinnerComponent,
    RecyclerViewComponent,
    CommentsOnUserComponent,
    PhotosOfRecipesComponent
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    LoadingSpinnerComponent,
    RecyclerViewComponent,
    CommentsOnUserComponent,
    PhotosOfRecipesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
