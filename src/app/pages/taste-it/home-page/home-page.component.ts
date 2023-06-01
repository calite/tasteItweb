import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { interval } from 'rxjs';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public recipes: RecipesResponse[] = [];
  public isLoading: boolean = false;
  private skipper: number = 0;
  private currentUser: UserResponse;
  private timer: any;
  private noMoreRecipes: boolean = false;

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
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.currentUser = this.authService.getUser(); //traemos el usuario de local
  }

  ngOnInit() {

    this.loadRecipes(0);

    const timer = interval(180000)
    timer.subscribe(
      x => {
        this.authService.renewIdToken()
        this.apiService.updateApiKey()
      }
    )

  }

  loadRecipes(skipper: number) {

    if (!this.noMoreRecipes) {

      this.isLoading = true;

      this.apiService.getRecipesHome(skipper)
        .subscribe(response => {

          this.recipes.push(...response);
          this.isLoading = false;

          if (response.length == 0) {
            this.toastService.toastGenerator('', 'There is no more recipes', 4, ToastPositionEnum.BOTTOM_RIGHT)
            this.noMoreRecipes = true
          }

        });

      this.skipper = this.skipper + 10;

    }

  }

  createRecipe() {
    this.router.navigate(['./taste-it/create-recipe'])
  }
}
