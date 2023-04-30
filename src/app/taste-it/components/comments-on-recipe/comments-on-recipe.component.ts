import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';

@Component({
  selector: 'app-comments-on-recipe',
  templateUrl: './comments-on-recipe.component.html',
  styleUrls: ['./comments-on-recipe.component.scss']
})
export class CommentsOnRecipeComponent {

  @Input()
  comments : CommentsOnRecipeResponse[];

  @Output()
  commentsChange = new EventEmitter<CommentsOnRecipeResponse[]>();

  constructor(
    private sanitizer: DomSanitizer,
  ){
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments) {
      this.commentsChange.emit(changes.comments.currentValue);
    }
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
