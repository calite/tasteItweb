import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss']
})
export class RateDialogComponent {

  formRate: FormGroup;
  private token;
  private rid;
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<RateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {
    this.formRate = new FormGroup({
      comment: new FormControl('', Validators.required),
      rating: new FormControl(0, Validators.required)
    })
    this.token = JSON.parse(sessionStorage.getItem('currentUser')).token;
    this.rid = this.data['recipeId']
  }

  onSubmit() {
    if (this.formRate.valid) {
      this.apiService.postCommentOnRecipe(
        this.rid,
        this.token,
        this.formRate.controls.comment.value,
        this.formRate.controls.rating.value
      ).subscribe(response => {
        this.formClosed.emit();
        this.toastService.toastGenerator('', 'recipe commented', 4, ToastPositionEnum.BOTTOM_LEFT)
      })
      this.dialogRef.close();
    }

  }

}


