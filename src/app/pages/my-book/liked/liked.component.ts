import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent {

  public recipes: RecipesResponse[] = [];
  private userNeo: UserResponse;
  public isLoading: boolean = false;
  private token: string;

  constructor(
    private apiService: ApiService,
  ) {
    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;
  }

  ngOnInit(): void {

    this.apiService.getRecipesLiked(this.token)
      .subscribe(recipes => {
        this.recipes = recipes;
      });

  }

  loadRecipes() {

    this.isLoading = true;

    this.apiService.getRecipesLiked(this.token)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.isLoading = false;
      });
  }

}
