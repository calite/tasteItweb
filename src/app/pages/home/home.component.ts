import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe, RecipesResponse } from '../../core/recipe.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public recipes: RecipesResponse[] = [];

  constructor(
    private apiService: ApiService, 
    private sanitizer: DomSanitizer,
    private router: Router
    ) {}

  ngOnInit() {
    this.apiService.getRecipesHome()
      .subscribe( recipes => {
        this.recipes = recipes;
      })
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

  viewRecipe(recipeId : any){
    console.log(recipeId)
    this.router.navigate(['/recipe/'+recipeId]);
  }
}