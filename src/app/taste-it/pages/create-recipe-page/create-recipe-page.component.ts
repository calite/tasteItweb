import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastService } from 'src/app/core/services/toast.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';

import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';
import { ApiService } from 'src/app/core/services/api.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-create-recipe-page',
  templateUrl: './create-recipe-page.component.html',
  styleUrls: ['./create-recipe-page.component.scss']
})
export class CreateRecipePageComponent {

  


}
