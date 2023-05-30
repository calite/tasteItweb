import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent {

  formSearch: FormGroup;
  public recipes: RecipesResponse[] = [];
  public users: UserResponse[] = [];

  public isLoading: boolean = false;
  public isVisibleSearch: boolean = true;
  public isAdvancedSearch: boolean = false;
  public isFilterByUser : boolean = false;
  public results : boolean = true;

  countries = environment.countriesArray;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formSearch = this.fb.group({
      name: '',
      country: '',
      difficulty: null,
      rating: null,
      ingredients: '',
      tags: '',
      nameUser: ['', Validators.required],
    });
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['./taste-it/profile/' + token]);
  }

  searchRecipes() {

    this.isLoading = true;

    const { name, country, difficulty, rating, ingredients, tags } = this.formSearch.value;

    this.apiService.getFilteredRecipes(name, country, difficulty, rating, ingredients, tags)
      .subscribe(response => {

        if(response.length == 0) {
          this.results = false;
        }

        this.recipes = response;
        this.isVisibleSearch = false;
        this.isLoading = false;
      });

      this.isLoading = false;

  }

  searchUsers() {
    const value = this.formSearch.get('nameUser').value

    if(this.formSearch.valid) {
      this.apiService.getUsersByName(value).subscribe(response => {
        this.users = response;
        this.isVisibleSearch = false;
      })
    }

  }

  resetForm() {
    this.formSearch.reset();
    this.recipes = [];
    this.users = [];
  }

  showHideMenu() {
    // this.results = !this.results;
    this.results = true;
    this.isVisibleSearch = !this.isVisibleSearch
  }


  advancedSearch() {
    this.isAdvancedSearch = !this.isAdvancedSearch
  }

  filterByUser() {
    this.isFilterByUser = !this.isFilterByUser
    this.resetForm()
  }

}
