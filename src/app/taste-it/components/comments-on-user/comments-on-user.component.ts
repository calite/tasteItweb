import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';

@Component({
  selector: 'app-comments-on-user',
  templateUrl: './comments-on-user.component.html',
  styleUrls: ['./comments-on-user.component.scss']
})
export class CommentsOnUserComponent {

  @Input()
  comments : CommentsOnUserResponse[] = [];

  @Output()
  commentsChange = new EventEmitter<CommentsOnUserResponse[]>();

  constructor(
    private router: Router,
  ){
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments) {
      this.commentsChange.emit(changes.comments.currentValue);
    }
  }

  viewProfileCreator(token : string) {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['/profile/' + token]);
    });
  }

}
