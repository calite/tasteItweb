import { Component, Input, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecipesDialogComponent } from '../../dialogs/view-recipes-dialog/view-recipes-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {

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
  private skipper: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos === max) {
      this.loadComments(this.skipper)
    }
  }

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private commentDialog: MatDialog,
    private recipeDialog: MatDialog,
    private toastService: ToastService
  ) {
    this.comments = []
  }

  ngOnInit(): void {

    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.getUserByToken(this.token).subscribe(
      response => {
        this.currentUser = response
        this.isLoading = true
      })

    this.checkPerson()
    this.checkFollow()

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
    this.loadComments(0);

  }

  loadComments(skipper: number) {
    //this.isLoading = true;

    this.apiService.getCommentsOnUser(this.token, skipper)
      .subscribe(comments => {
        this.comments.push(...comments)
        //this.isLoading = false;
      });

    
    this.skipper = this.skipper + 10;
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
      if (response) {
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
      if (!this.canFollow) {
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
      this.comments = []
      this.skipper = 0;
      this.loadComments(this.skipper)
    })
  }

  editUser() {
    console.log('quasy ready')
  }

  viewRecipes() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token , option: 'recipes'}
    })
  }

  viewLikes() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token , option: 'likes'}
    })
  }

  viewFollowers() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token , option: 'followers'}
    })
  }

  viewFollowing() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token , option: 'following'}
    })
  }



  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
