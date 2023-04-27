import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public recipes: RecipesResponse[] = [];
  private userNeo: UserResponse;
  public isLoading : boolean = false;
  private token: string;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;
    this.loadRecipes();
  }

  ngOnInit(): void {

    this.loadRecipes();
  }

  loadRecipes() {
    this.isLoading = true;

    this.apiService.getRecipesByUser(this.token)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.isLoading = false;
      });

  }

}
