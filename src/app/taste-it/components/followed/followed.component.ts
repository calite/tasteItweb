import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.scss'],
})
export class FollowedComponent {

  public recipes: RecipesResponse[] = [];
  private userNeo: UserResponse;
  public isLoading : boolean = false;
  private token: string;

  constructor(
    private apiService: ApiService,
  ) {
    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;
  }

  ngOnInit(): void {

    this.loadRecipes();

  }

  loadRecipes() {
    this.isLoading = true;

    this.apiService.getRecipesFollowed(this.token)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.isLoading = false;
      });
  }

}
