import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html'
})
export class CommentDialogComponent {

  formComment: FormGroup;
  private senderToken;
  private receiverToken;
  @Output() formClosed = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.formComment = new FormGroup({
      comment: new FormControl('', Validators.required)
    })
    this.senderToken = JSON.parse(sessionStorage.getItem('currentUser')).token;
    this.receiverToken = this.data['receiverToken']
  }

  onSubmit() {

    if (this.formComment.valid) {
      this.apiService.postCommentOnUser(
        this.senderToken,
        this.receiverToken,
        this.formComment.controls.comment.value
      ).subscribe(() => {
        this.formClosed.emit();
        this.toastService.toastGenerator('', 'user commented', 4, ToastPositionEnum.BOTTOM_LEFT)
      })
      this.dialogRef.close();
    }
  }

}
