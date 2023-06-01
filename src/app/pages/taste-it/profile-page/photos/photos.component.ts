import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  recipes: RecipesResponse[] = [];
  currentUser: UserResponse;
  public isLoading: boolean = false;
  private token: string;
  private skipper: number = 0;

  private timer: any;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if (window.pageYOffset + window.innerHeight > document.documentElement.scrollHeight - 100) {
        this.loadRecipes(this.skipper);
      }
    }, 200);

  }


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.getUserByToken(this.token).subscribe(
      response => {
        this.currentUser = response
        this.isLoading = true
      })
  }

  ngOnInit(): void {
    this.loadRecipes(0)
  }

  loadRecipes(skipper: number) {
    this.isLoading = true;

    this.apiService.getRecipesByUser(this.token, skipper)
      .subscribe(recipes => {
        this.recipes.push(...recipes);
        this.isLoading = false;
      });

    this.skipper = this.skipper + 10;
  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['./taste-it/recipe/' + recipeId]);
  }

}
