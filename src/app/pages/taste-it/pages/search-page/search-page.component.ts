import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public users: UserResponse[]

  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formSearch = this.fb.group({
      name: '',
      country: '',
      difficulty: null,
      rating: null,
      ingredients: '',
      tags: ''
    });
  }


  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['/profile/' + token]);
  }

  onSubmit() {

    const { name, country, difficulty, rating, ingredients, tags } = this.formSearch.value;

    this.apiService.getFilteredRecipes(name, country, difficulty, rating, ingredients, tags)
      .subscribe(response => {
        this.recipes = response;
      });

    // this.apiService.getUsersByName(term, 0).subscribe(
    //   response => {
    //     this.users = response;
    //     if (response.length > 0) this.anyUsers = true;
    //     if (response.length == 0) this.anyUsers = false;
    //   })

  }

}
