import { Component, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { switchMap } from 'rxjs';
import { RecipesResponse, User } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';
import { MatDialog } from '@angular/material/dialog';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ToastService } from 'src/app/core/services/toast.service';
import { ReportDialogComponent } from 'src/app/shared/report-dialog/report-dialog.component';
import { RateDialogComponent } from 'src/app/shared/rate-dialog/rate-dialog.component';
import { CommentDialogComponent } from 'src/app/shared/comment-dialog/comment-dialog.component';


@Component({
  selector: 'app-view-recipe-page',
  templateUrl: './view-recipe-page.component.html',
  styleUrls: ['./view-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRecipePageComponent implements OnInit {

  @Output()
  comments: CommentsOnRecipeResponse[] = [];
  public recipe: RecipesResponse[] = [];
  private currentUser: User;
  public isLoading: boolean = false;
  public isLiked: boolean = false;
  public isEditable: boolean = false;
  public isReportable: boolean = true;
  public samePerson: boolean = false;
  public canFollow: boolean = false;
  private skipper: number = 0;
  public likesCounter: number;
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
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private reportDialog: MatDialog,
    private rateDialog: MatDialog,
    private toastService: ToastService,
    private route: Router,
    private commentDialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    this.loadRecipe();

  }

  loadRecipe() {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeById(recipeId)),
      )
      .subscribe(recipe => {

        if (recipe.length == 0) {

          this.error = true;
          this.showError = true;
          this.isLoading = false;

        } else {

          this.recipe = recipe;

          if (recipe[0].user.token === this.currentUser.token) {
            this.isEditable = true
            this.isReportable = false;
            this.samePerson = true;
          }

          this.checkFollow();
          this.checkLike()
          this.getLikesCounter();
          this.loadComments(0);

          this.error = false;
          this.isLoading = false;
        }
      })

  }

  loadComments(skipper: number) {

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getCommentsOnRecipe(recipeId, skipper)),
      )
      .subscribe(comments => {
        this.comments.push(...comments)
      });

    this.skipper = this.skipper + 10;

  }

  checkLike() {

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeIsLiked(recipeId, this.currentUser.token)),
      )
      .subscribe(response => {
        if (response) {
          this.isLiked = true
        }
        else {
          this.isLiked = false
        }
      })

  }

  likeRecipe() {

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.postLikeOnRecipe(recipeId, this.currentUser.token))
      ).subscribe(response => {
        this.checkLike()
        if (!this.isLiked) {
          this.toastService.toastGenerator('', 'recipe liked', 4, ToastPositionEnum.BOTTOM_LEFT)
        } else {
          this.toastService.toastGenerator('', 'recipe disliked', 4, ToastPositionEnum.BOTTOM_LEFT)
        }

        this.getLikesCounter();
      })

  }

  reportRecipe() {
    const dialogRef = this.reportDialog.open(ReportDialogComponent, {
      data: { recipeId: this.recipe[0].recipeId }
    });
  }

  rateRecipe() {
    const dialogRef = this.rateDialog.open(RateDialogComponent, {
      data: { recipeId: this.recipe[0].recipeId }
    });
    dialogRef.componentInstance.formClosed.subscribe(() => {
      this.comments = []
      this.skipper = 0;
      this.loadRecipe()
    })
  }

  async editRecipe() {

    let rid = ''

    await this.activatedRoute.paramMap.subscribe(params => {
      rid = params.get('recipeId')
    })
    const token = this.currentUser.token

    this.route.navigate([`taste-it/edit-recipe/${rid}/${token}`])
  }

  checkFollow() {
    this.apiService.getCheckFollowingUser(
      JSON.parse(sessionStorage.getItem('currentUser')).token,
      this.recipe[0].user.token
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
      this.recipe[0].user.token
    ).subscribe(response => {
      this.checkFollow()
      if (!this.canFollow) {
        this.toastService.toastGenerator('', 'start following', 4, ToastPositionEnum.BOTTOM_LEFT)
      } else {
        this.toastService.toastGenerator('', 'stop following', 4, ToastPositionEnum.BOTTOM_LEFT)
      }
    })
  }

  commentUser() {
    this.commentDialog.open(CommentDialogComponent, {
      data: { receiverToken: this.recipe[0].user.token }
    });
  }

  getLikesCounter() {

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getLikesOnRecipe(recipeId)),
      ).subscribe(response => {
        this.likesCounter = response;
      })

  }

}
