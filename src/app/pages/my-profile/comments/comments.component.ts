import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsOnUserResponse } from '../../../core/interfaces/comment.interface';
import { ApiService } from 'src/app/core/api.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {


  @Output()
  userNeo: UserResponse;
  @Output()
  comments: CommentsOnUserResponse[] = [];

  private token: string;
  
  constructor(private apiService : ApiService) {

    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;

    this.apiService.getCommentsOnUser(this.token)
    .subscribe(response => {
      this.comments = response;
    });
  }

  ngOnInit(): void {

  }

}
