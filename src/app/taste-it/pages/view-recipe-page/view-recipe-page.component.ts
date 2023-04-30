import { Component, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, switchMap, tap } from 'rxjs';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnRecipeComponent } from '../../components/comments-on-recipe/comments-on-recipe.component';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';

@Component({
  selector: 'app-view-recipe-page',
  templateUrl: './view-recipe-page.component.html',
  styleUrls: ['./view-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRecipePageComponent {

  recipe !: RecipesResponse[];
  public isLoading: boolean = false;

  @Output()
  comments: CommentsOnRecipeResponse[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {

    this.loadRecipe();
    this.loadComments();

  }

  loadRecipe() {
    this.isLoading = true;

    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeById(recipeId)),
      )
      .subscribe(recipe => {
        this.recipe = recipe;
        this.isLoading = false;
      })
  }

  loadComments() {

    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getCommentsOnRecipe(recipeId)),
      )
      .subscribe(comments => {
          this.comments = comments;
      })

  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
