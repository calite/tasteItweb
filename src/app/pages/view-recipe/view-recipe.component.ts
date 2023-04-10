import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { RecipesResponse } from 'src/app/core/recipe.interface';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {


  recipe !: RecipesResponse[];

  constructor(
    private ActivatedRoute : ActivatedRoute,
    private apiService : ApiService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    
    
    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeById(recipeId)),
        tap(console.log)
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      })


  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
