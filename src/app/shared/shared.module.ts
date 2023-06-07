import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { Error404Component } from './error404/error404.component';
import { MaterialModule } from '../material/material.module';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { ViewRecipesDialogComponent } from './view-recipes-dialog/view-recipes-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';
import { RecyclerViewComponent } from './recycler-view/recycler-view.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    Error404Component,
    CommentDialogComponent,
    RateDialogComponent,
    ReportDialogComponent,
    ViewRecipesDialogComponent,
    RecipeCreatorComponent,
    RecyclerViewComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    Error404Component,
    CommentDialogComponent,
    RateDialogComponent,
    ReportDialogComponent,
    ViewRecipesDialogComponent,
    RecipeCreatorComponent,
    RecyclerViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    BarRatingModule,
    TranslateModule
  ]
})
export class SharedModule { }
