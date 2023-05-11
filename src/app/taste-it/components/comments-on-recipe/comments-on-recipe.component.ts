import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    private router: Router
  ){
    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments) {
      this.commentsChange.emit(changes.comments.currentValue);
    }
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['/profile/' + token]);
  }

}
