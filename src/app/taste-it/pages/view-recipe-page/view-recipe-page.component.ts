import { Component, EventEmitter, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HostListener } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs';
import { RecipesResponse, User } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnRecipeComponent } from '../../components/comments-on-recipe/comments-on-recipe.component';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';
import { ReportDialogComponent } from '../../dialogs/report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../../dialogs/rate-dialog/rate-dialog.component';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ToastService } from 'src/app/core/services/toast.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-view-recipe-page',
  templateUrl: './view-recipe-page.component.html',
  styleUrls: ['./view-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRecipePageComponent implements OnInit {


  @Output()
  comments: CommentsOnRecipeResponse[];

  public recipe: RecipesResponse[];
  private currentUser: User;
  public isLoading: boolean = false;
  public isLiked: boolean = false;
  public isEditable: boolean = false;
  public isReportable: boolean = true;
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
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private reportDialog: MatDialog,
    private rateDialog: MatDialog,
    private toastService: ToastService,
    private route: Router,
    private commentDialog: MatDialog,
  ) {
    this.comments = [] 
  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    this.loadRecipe();
    this.loadComments(0);


  }

  loadRecipe() {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeById(recipeId)),
      )
      .subscribe(recipe => {
        this.recipe = recipe;
        this.checkFollow();
        if (recipe[0].user.token === this.currentUser.token) {
          this.isEditable = true
          this.isReportable = false;
          this.samePerson = true;
        }
        this.isLoading = false;
      })

    this.checkLike()

  }

  loadComments(skipper: number) {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getCommentsOnRecipe(recipeId, skipper)),
      )
      .subscribe(comments => {
        this.comments.push(...comments)
        this.isLoading = false;
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
      this.loadComments(this.skipper)
    })
  }

  async editRecipe() {

    let rid = ''

    await this.activatedRoute.paramMap.subscribe(params => {
      rid = params.get('recipeId')
    })
    const token = this.currentUser.token

    this.route.navigate([`/edit-recipe/${rid}/${token}`])
  }

  checkFollow() {
    this.apiService.getCheckFollowingUser(
      JSON.parse(sessionStorage.getItem('currentUser')).token,
      this.recipe[0].user.token
    ).subscribe(response => {
      console.log(response)
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
    const dialogRef = this.commentDialog.open(CommentDialogComponent, {
      data: { receiverToken: this.recipe[0].user.token }
    });
    dialogRef.componentInstance.formClosed.subscribe(() => {
      this.comments = []
      this.skipper = 0;
      this.loadComments(this.skipper)
    })
  }

}
