import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRecipesDialogComponent } from 'src/app/taste-it/dialogs/view-recipes-dialog/view-recipes-dialog.component';
import { CommentDialogComponent } from 'src/app/taste-it/dialogs/comment-dialog/comment-dialog.component';
import { RateDialogComponent } from 'src/app/taste-it/dialogs/rate-dialog/rate-dialog.component';
import { ReportDialogComponent } from 'src/app/taste-it/dialogs/report-dialog/report-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';



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
    ReactiveFormsModule
  ]
})
export class DialogsModule { }
