import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';

@Component({
  selector: 'photos-of-recipes',
  templateUrl: './photos-of-recipes.component.html',
  styleUrls: ['./photos-of-recipes.component.scss']
})
export class PhotosOfRecipesComponent {

  @Input()
  recipes : RecipesResponse[] = [];

  @Output()
  recipesChange = new EventEmitter<RecipesResponse[]>();

  constructor(
    private sanitizer: DomSanitizer,
  ){
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments) {
      this.recipesChange.emit(changes.comments.currentValue);
    }
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }


}
