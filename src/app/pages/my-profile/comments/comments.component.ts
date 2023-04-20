import { Component, Input } from '@angular/core';
import { CommentsOnUserResponse } from '../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @Input()
  comments : CommentsOnUserResponse[] = [];

}
