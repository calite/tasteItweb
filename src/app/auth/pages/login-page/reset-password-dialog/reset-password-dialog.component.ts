import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent {

  formReset : FormGroup;

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
  ) {
    this.formReset = new FormGroup({
      email : new FormControl('', Validators.required)
    })

    this.translate.use(localStorage.getItem('language'))
  }

  onSubmit() {
    
    if(this.formReset.valid) {
        this.authService.resetPassword(this.formReset.controls.email.value)
        this.dialogRef.close()
    }

  }

}
