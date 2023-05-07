import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/core/services/auth.service';
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

  formCreateRecipe: FormGroup;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  recipeName: string;
  description: string;
  difficulty: number;
  country: string;
  ingredients: string[] = []
  steps: { name: string, placeholder: string }[] = [];
  photo: string;
  imgSelected: File;
  imgUrl: string;

  private currentUser: UserResponse;
  private token: string;

  

  get stepsFormArray() {
    return this.formCreateRecipe.controls.steps as FormArray
  }

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private storage: Storage
  ) {
    this.formCreateRecipe = new FormGroup({
      recipeName: new FormControl('', Validators.required), //Validators.required
      description: new FormControl('', Validators.required), //Validators.required
      difficulty: new FormControl(0, Validators.required),
      country: new FormControl('', Validators.required),
      newIngredient: new FormControl(''),
      steps: new FormArray([]),
      imgRecipe: new FormControl('', Validators.required)
    })

    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;

  }


  addIngredient(event: MatChipInputEvent) {

    const value = (event.value || '').trim();

    if (value) {
      this.ingredients.push(value);
      event.chipInput!.clear();
    }
  }

  removeIngredient(ingredient: string) {

    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }


  addStep() {
    const controlName = `step${this.steps.length + 1}`;
    this.formCreateRecipe.addControl(controlName, new FormControl(''));
    this.steps.push({ name: controlName, placeholder: 'Enter step details' });
  }

  removeStep(index) {
    this.steps.splice(index, 1)
  }


  onFileSelected($event): void {
    this.imgSelected = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result;
    };
    reader.readAsDataURL(this.imgSelected);
  }

  async uploadPhoto(): Promise<string> {
    const file = this.imgSelected;
    const uuid = uuidv4();
    const imgRef = ref(this.storage, `images/${uuid}`);

    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      console.log(`Imagen subida correctamente. URL de descarga: ${url}`);
      return url;
    } catch (error) {
      console.log(`Error al subir la imagen: ${error}`);
      return '';
    }
  }

  async onSubmit() {
    //obtencion de steps
    const formData = this.formCreateRecipe.getRawValue();
    const stepsData = this.steps.map(step => formData[step.name]);

    // console.log(this.formCreateRecipe.controls.recipeName.value)

    // console.log(this.formCreateRecipe.controls.description.value)

    // console.log(this.formCreateRecipe.controls.difficulty.value)

    // console.log(this.formCreateRecipe.controls.country.value)

    // console.log(this.ingredients)

    // console.log(stepsData);

    let name = this.formCreateRecipe.controls.recipeName.value;
    let description = this.formCreateRecipe.controls.description.value
    let difficulty = this.formCreateRecipe.controls.difficulty.value
    let country = this.formCreateRecipe.controls.country.value

    this.imgUrl = await this.uploadPhoto()

    this.apiService.createRecipe(this.token, name,description,country,this.imgUrl,difficulty, this.ingredients,stepsData)
      .subscribe( response => {
        console.log(response)
      })

  }


}
