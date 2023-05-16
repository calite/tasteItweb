import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent {

  formSearch: FormGroup;

  public recipes: RecipesResponse[]
  public recipesByTags: RecipesResponse[]
  public recipesByIngredients: RecipesResponse[]
  public recipesByCountry: RecipesResponse[]
  public users: UserResponse[]

  public anyRecipes = false;
  public anyUsers = false;
  public anyRecipesByTags = false;
  public anyRecipesByIngredients = false;
  public anyRecipesByCountry = false;


  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.formSearch = new FormGroup({
      nameRecipe: new FormControl(''),
      countryRecipe: new FormControl(''),
      tagsRecipe: new FormControl(''),
      ingredientsRecipe: new FormControl(''),
      difficultyRecipe: new FormControl(''),
      ratingRecipe: new FormControl('')
    })

  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['/profile/' + token]);
  }

  onSubmit() {

    const term = this.formSearch.controls.search.value;

    this.apiService.getRecipesByName(term, 0).subscribe(
      response => {
        this.recipes = response;
        if (response.length > 0) this.anyRecipes = true;
        if (response.length == 0) this.anyRecipes = false;
      })

    this.apiService.getUsersByName(term, 0).subscribe(
      response => {
        this.users = response;
        if (response.length > 0) this.anyUsers = true;
        if (response.length == 0) this.anyUsers = false;
      })

    this.apiService.getRecipesByTags(term, 0).subscribe(
      response => {
        this.recipesByTags = response;
        if (response.length > 0) this.anyRecipesByTags = true;
        if (response.length == 0) this.anyRecipesByTags = false;
      })

    this.apiService.getRecipesByIngredients(term, 0).subscribe(
      response => {
        this.recipesByIngredients = response;
        if (response.length > 0) this.anyRecipesByIngredients = true;
        if (response.length == 0) this.anyRecipesByIngredients = false;
      })

    this.apiService.getRecipesByCountry(term, 0).subscribe(
      response => {
        this.recipesByCountry = response;
        if (response.length > 0) this.anyRecipesByCountry = true;
        if (response.length == 0) this.anyRecipesByCountry = false;
      })
  }

}
