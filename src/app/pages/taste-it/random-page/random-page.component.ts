import { Component, OnInit } from '@angular/core';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../../core/interfaces/user.interface';
import { ViewRecipesDialogComponent } from 'src/app/shared/view-recipes-dialog/view-recipes-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-random-page',
  templateUrl: './random-page.component.html',
  styleUrls: ['./random-page.component.scss']
})
export class RandomPageComponent implements OnInit{


  public recipes: RecipesResponse[]
  public currentUser : UserResponse;
  public isLoading : boolean = false;
  public counter : number = 0;
  public likesCounter : number;
  public followersCounter : number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private commentDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadRandomRecipes()
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  }


  loadRandomRecipes() {
    this.isLoading = true;
    this.apiService.getRandomRecipesWithLimit(10).subscribe(
      response => {
        this.recipes = response;
        this.isLoading = false;

        this.loadFollowers();
        this.loadLikes();
      }
    )

  }

  loadFollowers() {
    this.apiService.getCountFollowers(this.recipes[this.counter].user.token).subscribe( response => {
      this.followersCounter = response;
    })
  }

  
  loadLikes() {
    this.apiService.getLikesOnRecipe(this.recipes[this.counter].recipeId).subscribe( response => {
      this.likesCounter = response;
    })
  }

  previousRecipe(){
    this.counter = this.counter - 1;
    this.loadLikes();
  }

  nextRecipe(){
    this.counter = this.counter + 1;
    this.loadLikes();
  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['./taste-it/recipe/' + recipeId]);
  }

  viewProfileCreator(token: string) {
    this.router.navigate(['./taste-it/profile/' + token]);
  }

  likeRecipe(){
    this.apiService.postLikeOnRecipe(this.recipes[this.counter].recipeId, this.currentUser.token).subscribe(() => {
      this.loadLikes();
    })
  }

  viewFollowers() {
    const dialogRef = this.commentDialog.open(ViewRecipesDialogComponent, {
      data: { userToken: this.recipes[this.counter].user.token , option: 'followers'}
    })
  }

  loadMoreRecipes() {
    this.counter = 0
    this.loadRandomRecipes()
  }

}
