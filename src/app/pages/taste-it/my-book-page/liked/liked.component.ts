import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {

  public recipes: RecipesResponse[] = [];
  private currentUser: UserResponse;
  public isLoading: boolean = false;
  private token: string;
  private skipper: number = 0;
  private timer: any;
  public noData : boolean = false;

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
    private router : Router
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
  }

  ngOnInit(): void {

    this.loadRecipes(0);

  }

  loadRecipes(skipper: number) {

    this.isLoading = true;

    this.apiService.getRecipesLiked(this.token, skipper)
      .subscribe(response => {
        if(response.length == 0 && this.recipes.length == 0) this.noData = true
        this.recipes.push(...response);
        this.isLoading = false;
      });

      this.skipper = this.skipper + 10;
  }

  goSearch() {
        this.router.navigate(['./taste-it/search/']);
  }

}
