import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { ViewRecipesDialogComponent } from './view-recipes-dialog/view-recipes-dialog.component';
import { BarRatingModule } from 'ngx-bar-rating';


@NgModule({
  declarations: [
    ReportDialogComponent,
    RateDialogComponent,
    CommentDialogComponent,
    ViewRecipesDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BarRatingModule
  ]
})
export class DialogsModule { }
