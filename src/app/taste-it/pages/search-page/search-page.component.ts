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

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl('', Validators.required)
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
      })

    this.apiService.getUsersByName(term, 0).subscribe(
      response => {
        this.users = response;
      })

      this.apiService.getRecipesByTags(term, 0).subscribe(
        response => {
          console.log(response)
          this.recipesByTags = response;
        })

    this.apiService.getRecipesByIngredients(term, 0).subscribe(
      response => {
        this.recipesByIngredients = response;
      })

    this.apiService.getRecipesByCountry(term, 0).subscribe(
      response => {
        this.recipesByCountry = response;
      })
  }

}
