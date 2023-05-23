import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {

  formReport:FormGroup;
  private token;
  private rid;
  
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ){
    this.formReport = new FormGroup({
      comment: new FormControl('',Validators.required)
    })
    this.token = JSON.parse(sessionStorage.getItem('currentUser')).token;
    this.rid = this.data['recipeId']
  }

  onSubmit(){
    this.apiService.postReportOnRecipe(
      this.rid,
      this.token,
      this.formReport.controls.comment.value
    ).subscribe( response => {
      this.toastService.toastGenerator('', 'recipe reported', 4, ToastPositionEnum.BOTTOM_LEFT)
    })
    this.dialogRef.close();
  }

}
