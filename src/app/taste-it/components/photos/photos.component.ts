import { Component, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {

  @Output()
  userNeo: UserResponse;
  @Output()
  recipes: RecipesResponse[] = [];

  private token: string;

  constructor(private apiService : ApiService) {

    this.userNeo = JSON.parse(localStorage.getItem("userNeo"));
    this.token = this.userNeo.token;

    this.apiService.getRecipesByUser(this.token)
    .subscribe(response => {
      this.recipes = response;
    });
  }

  ngOnInit(): void {

  }
}
