import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
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
    this.translate.use(localStorage.getItem('language'))
  }

  onSubmit() {

    if (this.formComment.valid) {
      this.apiService.postCommentOnUser(
        this.senderToken,
        this.receiverToken,
        this.formComment.controls.comment.value
      ).subscribe(() => {
        this.formClosed.emit();
        this.toastService.toastGenerator('', this.translate.instant('PROFILE.COMMENT_ALERT'), 4, ToastPositionEnum.BOTTOM_LEFT)
      })
      this.dialogRef.close();
    }
  }

}
