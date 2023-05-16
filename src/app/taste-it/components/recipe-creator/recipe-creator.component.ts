import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastService } from 'src/app/core/services/toast.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { v4 as uuidv4 } from 'uuid';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { ApiService } from 'src/app/core/services/api.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.scss']
})
export class RecipeCreatorComponent {

  formRecipe: FormGroup;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  recipeName: string;
  description: string;
  difficulty: number;
  country: string;
  ingredients: string[] = []
  steps: { name: string, placeholder: string, formControlName: string, value: string }[] = [];
  imgSelected: File;
  imgUrl: string = '';

  private currentUser: UserResponse;
  private token: string;

  public editRecipe: boolean = false;


  //edit
  @Input()
  recipe: RecipesResponse[] = []

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private storage: Storage,
    private route: Router
  ) {
    this.formRecipe = new FormGroup({
      recipeName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      difficulty: new FormControl(0, Validators.required),
      country: new FormControl('', Validators.required),
      newIngredient: new FormControl(''),
      imgRecipe: new FormControl('')
    })

    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
  }

  ngOnChanges(changes: SimpleChanges) { //nos traemos los datos de la receta
    for (const recipe in changes) {
      this.recipe = changes[recipe].currentValue
    }

    this.formRecipe.get('recipeName').setValue(this.recipe[0]['recipe'].name)
    this.formRecipe.get('description').setValue(this.recipe[0]['recipe'].description)
    this.formRecipe.get('difficulty').setValue(this.recipe[0]['recipe'].difficulty)
    this.formRecipe.get('country').setValue(this.recipe[0]['recipe'].country)
    this.ingredients = this.recipe[0]['recipe'].ingredients

    this.recipe[0]['recipe'].steps.forEach(element => {
      const controlName = `step${this.steps.length + 1}`;
      this.formRecipe.addControl(controlName, new FormControl(element));
      this.steps.push({ name: controlName, placeholder: 'Enter step details', formControlName: controlName, value: element })
    });

    this.imgUrl = this.recipe[0]['recipe'].image

    this.editRecipe = true;

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

    if (this.steps.length != 20) {
      const controlName = `step${this.steps.length + 1}`;
      this.formRecipe.addControl(controlName, new FormControl(''));
      this.steps.push({ name: controlName, placeholder: 'Enter step details', formControlName: controlName, value: '' });
    } else {
      this.toastService.toastGenerator('', 'the limit of steps has been reached', 4, ToastPositionEnum.BOTTOM_LEFT);
    }

  }

  removeStep(index) {
    this.steps.splice(index, 1)
  }


  onFileSelected($event): void {

    this.imgSelected = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;
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

  async onSubmitCreate() {

    console.log(this.imgUrl)

    if(this.imgUrl === '') {
      this.toastService.toastGenerator('', 'pick the image', 4, ToastPositionEnum.BOTTOM_LEFT)
    }

    if (this.formRecipe.valid && this.imgUrl !== '') {

      this.imgUrl = await this.uploadPhoto() //subimos la foto nueva

      //obtencion de steps
      const formData = this.formRecipe.getRawValue();
      const stepsData = this.steps.map(step => formData[step.name]);

      let name = this.formRecipe.controls.recipeName.value;
      let description = this.formRecipe.controls.description.value
      let difficulty = this.formRecipe.controls.difficulty.value
      let country = this.formRecipe.controls.country.value

      this.apiService.postCreateRecipe(this.token, name, description, country, this.imgUrl, difficulty, this.ingredients, stepsData)
        .subscribe(response => {

          this.toastService.toastGenerator('', 'recipe created', 4, ToastPositionEnum.BOTTOM_LEFT)
          this.route.navigate([`./home`])

        })

    }

  }

  async onSubmitEdit() {

    if (this.formRecipe.valid && this.imgUrl !== '') {

      //obtencion de steps
      const formData = this.formRecipe.getRawValue();
      const stepsData = this.steps.map(step => formData[step.name]);

      let name = this.formRecipe.controls.recipeName.value;
      let description = this.formRecipe.controls.description.value
      let difficulty = this.formRecipe.controls.difficulty.value
      let country = this.formRecipe.controls.country.value

      if (this.formRecipe.controls.imgRecipe.dirty) {

        this.imgUrl = await this.uploadPhoto() //subimos la foto nueva

        const uriOldImage = ref(this.storage, this.recipe[0].recipe.image) // borramos la foto vieja

        try {
          deleteObject(uriOldImage).then(() => {
            console.log('image deleted')
          }).catch(error => {
            console.log('something wrong happen' + error)
          })
        } catch (error) {
          console.log(error)
        }

      }

      let rid = this.recipe[0].recipeId

      this.apiService.postEditRecipe(rid, name, description, country, this.imgUrl, difficulty, this.ingredients, stepsData)
        .subscribe(response => {

          this.toastService.toastGenerator('', 'recipe edited', 4, ToastPositionEnum.BOTTOM_LEFT)
          this.route.navigate([`./recipe/${rid}`])

        })


    }

  }

  deleteRecipe() {

    this.toastService.alertGenerator('Delete Confirmation', 'Are you sure? the data will be lost', 4)

      .subscribe((result) => {
        if (result.success === true) {

          const rid = this.recipe[0].recipeId;

          this.apiService.postDeleteRecipe(rid).subscribe();

          const uriOldImage = ref(this.storage, this.recipe[0].recipe.image) // borramos la foto de la receta

          deleteObject(uriOldImage).then(() => {
            console.log('image deleted')
          }).catch(error => {
            console.log('something wrong happen' + error)
          })

          this.route.navigate(['./home']);

        }
      });

  }

  onCancel() {

    if(!this.editRecipe) {
      this.route.navigate(['./home'])
    } else {
      this.route.navigate([`./recipe/${this.recipe[0].recipeId}`])
    }

  }

}
