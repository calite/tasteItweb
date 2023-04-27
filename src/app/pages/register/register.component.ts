import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  emailEmptyOrIncorrect: boolean = false;
  passwordEmpty: boolean = false;
  repeatPasswordEmpty: boolean = false;
  passwordMatch: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })


  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.formReg.valid && this.formReg.value.password === this.formReg.value.repeatPassword && !this.emailEmptyOrIncorrect && this.formReg.get('email')!.valid) {
      this.userService.register(this.formReg.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
    }
    else {
      if (!this.formReg.value.email || !this.formReg.get('email')!.valid) {
        this.emailEmptyOrIncorrect = true;
      } else {
        this.emailEmptyOrIncorrect = false;
      }
      if (!this.formReg.value.password) {
        this.passwordEmpty = true;
      } else {
        this.passwordEmpty = false;
      }
      if (!this.formReg.value.repeatPassword) {
        this.repeatPasswordEmpty = true;
      } {
        this.repeatPasswordEmpty = false;
      }
      if (this.formReg.value.password !== this.formReg.value.repeatPassword) {
        this.passwordMatch = false;
      } else {
        this.passwordMatch = true;
      }
    }
  }

  sendToLogin() {
    this.router.navigate(['/login']);
  }
}
