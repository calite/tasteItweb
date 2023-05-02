import { Component, EventEmitter, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, switchMap, tap } from 'rxjs';
import { RecipesResponse, User } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnRecipeComponent } from '../../components/comments-on-recipe/comments-on-recipe.component';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';
import { ReportDialogComponent } from '../../dialogs/report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../../dialogs/rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-view-recipe-page',
  templateUrl: './view-recipe-page.component.html',
  styleUrls: ['./view-recipe-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRecipePageComponent {

  public recipe !: RecipesResponse[];
  private currentUser: User;
  public isLoading: boolean = false;

  public isLiked: boolean = false;
  public isEditable: boolean = false;
  public isReportable : boolean = true;

  @Output()
  comments: CommentsOnRecipeResponse[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private reportDialog: MatDialog,
    private rateDialog: MatDialog
  ) {

  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    this.loadRecipe();
    this.loadComments();

  }





  loadRecipe() {
    this.isLoading = true;

    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeById(recipeId)),
      )
      .subscribe(recipe => {
        this.recipe = recipe;
        if(recipe[0].user.token === this.currentUser.token) {
          this.isEditable = true
          this.isReportable = false;
        }
        this.isLoading = false;
      })

      this.checkLike()

    
  }

  checkLike(){
    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getRecipeIsLiked(recipeId, this.currentUser.token)),
      )
      .subscribe(response => {
        if(response.length > 0) this.isLiked = true
        else this.isLiked = false
      })
  }

  loadComments() {

    this.ActivatedRoute.params
      .pipe(
        switchMap(({ recipeId }) => this.apiService.getCommentsOnRecipe(recipeId)),
      )
      .subscribe(comments => {
        this.comments = comments
      })

  }

  likeRecipe() {

    this.ActivatedRoute.params
      .pipe(
        switchMap(({recipeId}) => this.apiService.postLikeOnRecipe(recipeId, this.currentUser.token))
      ).subscribe( response => {
        this.checkLike()
      })
        
  }

  reportRecipe() {
    const dialogRef = this.reportDialog.open(ReportDialogComponent);
  }

  rateRecipe() {
    const dialogRef = this.rateDialog.open(RateDialogComponent);
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
