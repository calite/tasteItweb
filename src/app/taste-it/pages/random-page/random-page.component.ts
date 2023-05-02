import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-random-page',
  templateUrl: './random-page.component.html',
  styleUrls: ['./random-page.component.scss']
})
export class RandomPageComponent implements OnInit{


  public recipes: RecipesResponse[]
  public counter : number = 0
  public isLoading : boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.searchRandomRecipe()
  }


  searchRandomRecipe() {
    this.isLoading = true;
    this.apiService.getRandomRecipesWithLimit(10).subscribe(
      response => {
        this.recipes = response;
        this.isLoading = false;
      }
    )

  }

  previewRecipe(){
    this.counter = this.counter - 1;
  }

  nextRecipe(){
    this.counter = this.counter + 1;
  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['/profile/' + token]);
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }
  

}
