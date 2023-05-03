import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {

  @Output()
  currentUser: UserResponse;
  @Output()
  public comments: CommentsOnUserResponse[] = [];
  @Input()
  public isLoading: boolean = false;

  private token: string;
  public recipesCount = 0;
  public followingCount = 0;
  public followersCount = 0;
  public likesCount = 0;
  public samePerson: boolean = false;
  public canFollow: boolean = false;


  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private commentDialog: MatDialog,
    private toastService: ToastService
  ) {
    //this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    //this.token = this.currentUser.token;

    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.getUserByToken(this.token).subscribe(
      response => {
        this.currentUser = response
        this.isLoading = true
      })

    this.checkPerson()
    this.checkFollow()

  }

  ngOnInit(): void {

    //contadores
    this.apiService.getCountRecipes(this.token)
      .subscribe(response => {
        this.recipesCount = response;
      });

    this.apiService.getCountFollowing(this.token)
      .subscribe(response => {
        this.followingCount = response;
      });

    this.apiService.getCountFollowers(this.token)
      .subscribe(response => {
        this.followersCount = response;
      });

    this.apiService.getCountLikes(this.token)
      .subscribe(response => {
        this.likesCount = response;
      });

    //comentarios
    this.loadComments();

  }

  checkPerson() {
    if (this.token == JSON.parse(sessionStorage.getItem('currentUser')).token) this.samePerson = false
    else this.samePerson = true
  }

  checkFollow() {
    this.apiService.getCheckFollowingUser(
      JSON.parse(sessionStorage.getItem('currentUser')).token,
      this.token
    ).subscribe(response => {
      if (response.length == 0) {
        this.canFollow = true;
      } else {
        this.canFollow = false;
      }
    })
  }

  postFollowUser() {
    this.apiService.postFollowUser(
      JSON.parse(sessionStorage.getItem('currentUser')).token,
      this.token
    ).subscribe(response => {
      this.checkFollow()
      if (this.canFollow) {
        this.toastService.toastGenerator('', 'start following', 4, ToastPositionEnum.BOTTOM_RIGHT)
      } else {
        this.toastService.toastGenerator('', 'stop following', 4, ToastPositionEnum.BOTTOM_RIGHT)
      }
    })
  }

  commentUser() {
    const dialogRef = this.commentDialog.open(CommentDialogComponent, {
      data: { receiverToken: this.token }
    });
    dialogRef.componentInstance.formClosed.subscribe(() => {
      this.loadComments()
    })
  }

  loadComments() {
    this.apiService.getCommentsOnUser(this.token)
      .subscribe(response => {
        this.comments = response;
      });
  }

  editUser(){
    console.log('buena')
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
