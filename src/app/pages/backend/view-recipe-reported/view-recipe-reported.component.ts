import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportResponse } from 'src/app/core/interfaces/report.interface';
import { ApiService } from '../../../core/services/api.service';
import { switchMap } from 'rxjs';
import { RecipeReported } from 'src/app/core/interfaces/recipeReported.interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecipesDialogComponent } from 'src/app/shared/view-recipes-dialog/view-recipes-dialog.component';

@Component({
  selector: 'app-view-recipe-reported',
  templateUrl: './view-recipe-reported.component.html',
  styleUrls: ['./view-recipe-reported.component.scss']
})
export class ViewRecipeReportedComponent implements OnInit {

  public recipe: RecipeReported[];
  public reports: ReportResponse[];

  public recipesCount = 0;
  public followingCount = 0;
  public followersCount = 0;
  public likesCount = 0;

  public likesCounter = 0;

  public state = 'Unpublish';

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.loadData();

  }

  loadData() {

    this.activatedRoute.params
      .pipe(
        switchMap(({ rid }) => this.apiService.getRecipeReportedById(rid)),
      )
      .subscribe(response => {
        this.recipe = response
        if(this.recipe[0].recipe.active)

        this.state = this.recipe[0].recipe.active ? 'Publish' : 'Unpublish';  

        this.loadCounters();
      })

    this.activatedRoute.params
      .pipe(
        switchMap(({ rid }) => this.apiService.getReportsOnRecipe(rid)),
      )
      .subscribe(
        response => {
          this.reports = response
        },
        error => {
        })

    this.activatedRoute.params
      .pipe(
        switchMap(({ rid }) => this.apiService.getLikesOnRecipe(rid)),
      )
      .subscribe(
        response => {
          this.likesCounter = response
        });

  }

  loadCounters() {
    this.apiService.getCountRecipes(this.recipe[0].user.token)
      .subscribe(response => {
        this.recipesCount = response;
      });

    this.apiService.getCountFollowing(this.recipe[0].user.token)
      .subscribe(response => {
        this.followingCount = response;
      });

    this.apiService.getCountFollowers(this.recipe[0].user.token)
      .subscribe(response => {
        this.followersCount = response;
      });

    this.apiService.getCountLikes(this.recipe[0].user.token)
      .subscribe(response => {
        this.likesCount = response;
      });
  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, true).subscribe(() => window.location.reload());
  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, false).subscribe(() => window.location.reload());
  }

  changeState(event) {
    this.apiService.postChangeStateRecipe(this.recipe[0].recipeId, event['checked']).subscribe(() => window.location.reload());
  }

  viewRecipes() {
    const dialogRef = this.dialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.recipe[0].user.token, option: 'recipes' }
    })
  }

  viewLikes() {
    const dialogRef = this.dialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.recipe[0].user.token, option: 'likes' }
    })
  }

  viewFollowers() {
    const dialogRef = this.dialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.recipe[0].user.token, option: 'followers' }
    })
  }

  viewFollowing() {
    const dialogRef = this.dialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.recipe[0].user.token, option: 'following' }
    })
  }

}
