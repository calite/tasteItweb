import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recipes-dialog',
  templateUrl: './view-recipes-dialog.component.html',
  styleUrls: ['./view-recipes-dialog.component.scss']
})
export class ViewRecipesDialogComponent implements OnInit {


  public recipes: RecipesResponse[]
  public users: UserResponse[]
  public likes: RecipesResponse[]
  public option: string
  private userToken;

  constructor(
    private apiService: ApiService,
    private router : Router,
    private dialogRef: MatDialogRef<ViewRecipesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string[],
  ) {
    this.userToken = this.data['userToken']
    this.option = this.data['option']
  }
  ngOnInit(): void {
    if (this.option == 'recipes') {
      this.apiService.getRecipesByUser(this.userToken, 0).subscribe(response => {
        this.recipes = response
      });
    }

    if (this.option == 'likes') {
      this.apiService.getRecipesLiked(this.userToken, 0).subscribe(response => {
        this.recipes = response
      });
    }

    if(this.option == 'followers'){
      this.apiService.getFollowers(this.userToken, 0).subscribe(response => {
        this.users = response

      });
    }

    if(this.option == 'following'){
      this.apiService.getFollowing(this.userToken, 0).subscribe(response => {
        this.users = response
      });
    }

  }

  viewRecipe(rid){
    this.dialogRef.close()
    this.router.navigate([`./taste-it/recipe/${rid}`])
  }

  viewProfile(token) {
    this.dialogRef.close()
    this.router.navigate(['']).then(() => {
      this.router.navigate([`./taste-it/profile/${token}`]);
    });
  }


}
