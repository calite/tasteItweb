import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyBookComponent } from './pages/my-book/my-book.component';



@NgModule({
  declarations: [
    MyProfileComponent,
    MyBookComponent
  ],
  exports: [
    MyProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
