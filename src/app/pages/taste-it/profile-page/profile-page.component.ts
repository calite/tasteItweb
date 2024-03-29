import { Component, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { CommentDialogComponent } from 'src/app/shared/comment-dialog/comment-dialog.component';
import { ViewRecipesDialogComponent } from 'src/app/shared/view-recipes-dialog/view-recipes-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {

  @Output()
  public comments: CommentsOnUserResponse[] = [];
  @Output()
  currentUser: UserResponse;

  private token: string;
  public recipesCount = 0;
  public followingCount = 0;
  public followersCount = 0;
  public likesCount = 0;
  public isLoading: boolean = false;
  public samePerson: boolean = false;
  public canFollow: boolean = false;
  private skipper: number = 0;
  private timer: any;
  public error: boolean = true;
  public showError: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if (window.pageYOffset + window.innerHeight > document.documentElement.scrollHeight - 100) {
        this.loadComments(this.skipper);
      }
    }, 200);

  }

  constructor(
    public translate: TranslateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private commentDialog: MatDialog,
    private toastService: ToastService
  ) {
    this.translate.use(localStorage.getItem('language'))
  }

  ngOnInit(): void {

    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.loadUser()

  }

  loadUser() {
    this.isLoading = true

    this.apiService.getUserByToken(this.token).subscribe(
      response => {

        if (response == undefined) {

          this.error = true;
          this.showError = true;
          this.isLoading = false;

        } else {
          this.currentUser = response

          this.checkPerson()
          this.checkFollow()
          this.loadCounters()
          this.loadComments(0);

          this.error = false;
          this.isLoading = false;
        }

      })



  }

  loadComments(skipper: number) {

    this.apiService.getCommentsOnUser(this.token, skipper)
      .subscribe(comments => {
        this.comments.push(...comments)
      });

    this.skipper = this.skipper + 10;
  }

  loadCounters() {
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
        this.toastService.toastGenerator('', this.translate.instant('PROFILE.FOLLOW'), 4, ToastPositionEnum.BOTTOM_LEFT)
      } else {
        this.toastService.toastGenerator('', this.translate.instant('PROFILE.NO_FOLLOW'), 4, ToastPositionEnum.BOTTOM_LEFT)
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
    const token = this.currentUser.token
    this.route.navigate([`taste-it/edit-profile/${token}`])
  }

  viewRecipes() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token, option: 'recipes' }
    })
  }

  viewLikes() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token, option: 'likes' }
    })
  }

  viewFollowers() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token, option: 'followers' }
    })
  }

  viewFollowing() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.token, option: 'following' }
    })
  }

}
