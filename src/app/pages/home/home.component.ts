import { Component } from '@angular/core';
import { RecipeService } from '../../core/recipes.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent {
  
  get hola() {
    debugger
    console.log(this.recipeServices.resultados);
    
    return this.recipeServices.hola;
  }

  constructor(private recipeServices: RecipeService, private sanitizer: DomSanitizer) {

    recipeServices.getRecipesHome();

  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`); 
  }

}


