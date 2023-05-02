import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';


@NgModule({
  declarations: [
    ReportDialogComponent,
    RateDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DialogsModule { }
