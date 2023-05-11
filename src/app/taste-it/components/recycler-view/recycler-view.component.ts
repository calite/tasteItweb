import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    this.router.navigate(['/recipe/' + recipeId]);
  }

  viewProfileCreator(token : string) {
    this.router.navigate(['/profile/' + token]);
  }
  
}
