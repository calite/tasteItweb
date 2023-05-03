import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';


@NgModule({
  declarations: [
    ReportDialogComponent,
    RateDialogComponent,
    CommentDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DialogsModule { }