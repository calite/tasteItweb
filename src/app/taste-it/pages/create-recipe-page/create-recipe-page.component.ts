import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
  photo: File;

  get stepsFormArray() {
    return this.formCreateRecipe.controls.steps as FormArray
  }

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.formCreateRecipe = new FormGroup({
      recipeName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      difficulty: new FormControl(0, Validators.required),
      country: new FormControl('', Validators.required),
      newIngredient: new FormControl(''),
      steps: new FormArray([]),
      imgRecipe: new FormControl()
    })
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


  uploadPhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.photo = target.files[0];
    }
  }

  onSubmit() {
    //obtencion de steps
    const formData = this.formCreateRecipe.getRawValue();
    const stepsData = this.steps.map(step => formData[step.name]);
    console.log('Recipe steps:', stepsData);
  }


}
