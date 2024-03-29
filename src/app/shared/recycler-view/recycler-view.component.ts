import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';


@Component({
  selector: 'taste-it-recycler-view',
  templateUrl: './recycler-view.component.html',
  styleUrls: ['./recycler-view.component.scss']
})
export class RecyclerViewComponent {

  @Input()
  public recipes : RecipesResponse[] = [];

  @Input()
  public isLoading : boolean = false;

  constructor(
    private router: Router
  ){

  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['taste-it/recipe/' + recipeId]);
  }

  viewProfileCreator(token : string) {
    this.router.navigate(['taste-it/profile/' + token]);
  }
  
}
