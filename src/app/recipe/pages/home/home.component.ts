import { Component, Pipe, PipeTransform } from '@angular/core';
import { RecipeService } from '../../services/recipes.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {

  get resultados() {
    return this.recipeServices.resultados;
  }

  constructor(private recipeServices: RecipeService, private sanitizer: DomSanitizer) {

    recipeServices.getRecipesHome();

  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`); 
  }


}


