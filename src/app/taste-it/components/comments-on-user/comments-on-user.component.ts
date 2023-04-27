import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
