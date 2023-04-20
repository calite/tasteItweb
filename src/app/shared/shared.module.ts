import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RecyclerViewComponent } from './recycler-view/recycler-view.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    LoadingSpinnerComponent,
    RecyclerViewComponent
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    LoadingSpinnerComponent,
    RecyclerViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
