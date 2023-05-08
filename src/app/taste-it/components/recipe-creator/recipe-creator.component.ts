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
  photo: string; //a este le damos la url
  imgSelected: File;
  imgUrl: string;

  private currentUser: UserResponse;
  private token: string;

  public editRecipe: boolean = false;


  //edit
  @Input()
  recipe: RecipesResponse[]

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private storage: Storage
  ) {
    this.formRecipe = new FormGroup({
      recipeName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      difficulty: new FormControl(0, Validators.required),
      country: new FormControl('', Validators.required),
      newIngredient: new FormControl(''),
      imgRecipe: new FormControl('', Validators.required)
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

    this.photo = this.recipe[0]['recipe'].image

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

    const controlName = `step${this.steps.length + 1}`;
    this.formRecipe.addControl(controlName, new FormControl(''));
    this.steps.push({ name: controlName, placeholder: 'Enter step details', formControlName: controlName, value: '' });
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
    if (this.formRecipe.valid) {

      //obtencion de steps
      const formData = this.formRecipe.getRawValue();
      const stepsData = this.steps.map(step => formData[step.name]);

      let name = this.formRecipe.controls.recipeName.value;
      let description = this.formRecipe.controls.description.value
      let difficulty = this.formRecipe.controls.difficulty.value
      let country = this.formRecipe.controls.country.value
      //let steps = this.steps.map(step => step.value)

      // console.log(this.formRecipe.controls.recipeName.value)
      // console.log(this.formRecipe.controls.description.value)
      // console.log(this.formRecipe.controls.difficulty.value)
      // console.log(this.formRecipe.controls.country.value)
      // console.log(this.ingredients)
      //console.log(steps)
      // console.log(formData)
      //console.log(stepsData)

      console.log(this.editRecipe)

      this.imgUrl = await this.uploadPhoto() //subimos la foto nueva

      if (this.editRecipe) { //si es edicion

        const uriOldImage = ref(this.storage, this.recipe[0].recipe.image) // borramos la foto vieja

        deleteObject(uriOldImage).then(() => {
          console.log('image deleted')
        }).catch(error => {
          console.log('something wrong happen' + error)
        })

        let rid = this.recipe[0].recipeId

        this.apiService.postEditRecipe(rid, name, description, country, this.imgUrl, difficulty, this.ingredients, stepsData)
          .subscribe(response => {
            console.log('editado')
            this.toastService.toastGenerator('', 'recipe edited', 4, ToastPositionEnum.BOTTOM_RIGHT)
          })

      } else {

        this.apiService.postCreateRecipe(this.token, name, description, country, this.imgUrl, difficulty, this.ingredients, stepsData)
          .subscribe(response => {
            console.log('creado')
            this.toastService.toastGenerator('', 'recipe created', 4, ToastPositionEnum.BOTTOM_RIGHT)
          })

      }

    }


  }

}
