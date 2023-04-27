import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

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
    private sanitizer: DomSanitizer,
    private router: Router
  ){

  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }
}
