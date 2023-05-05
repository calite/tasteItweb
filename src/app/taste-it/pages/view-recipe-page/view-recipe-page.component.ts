import { Component, EventEmitter, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-view-recipe-page',
  templateUrl: './view-recipe-page.component.html',
  styleUrls: ['./view-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRecipePageComponent implements OnInit {

  
  @Output()
  comments: CommentsOnRecipeResponse[];

  public recipe : RecipesResponse[];
  private currentUser: User;
  public isLoading: boolean = false;
  public isLiked: boolean = false;
  public isEditable: boolean = false;
  public isReportable: boolean = true;
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
    private sanitizer: DomSanitizer,
    private reportDialog: MatDialog,
    private rateDialog: MatDialog,
    private toastService: ToastService
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
        if (recipe[0].user.token === this.currentUser.token) {
          this.isEditable = true
          this.isReportable = false;
        }
        this.isLoading = false;
      })

    this.checkLike()

  }

  loadComments(skipper : number) {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getCommentsOnRecipe(recipeId, skipper)),
      )
      .subscribe(comments => {
        this.comments.push(...comments)
        this.isLoading = false;

        // if (comments.length == 0 && this.comments.length != 0) {
        //   // this.toastService.toastGenerator('', 'There is no more comments', 4, ToastPositionEnum.BOTTOM_RIGHT)
        // }
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
          this.toastService.toastGenerator('', 'recipe liked', 4, ToastPositionEnum.BOTTOM_RIGHT)
        } else {
          this.toastService.toastGenerator('', 'recipe disliked', 4, ToastPositionEnum.BOTTOM_RIGHT)
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
      this.loadComments(this.skipper)
    })
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
