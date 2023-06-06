import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public recipes: RecipesResponse[] = [];
  private currentUser: UserResponse;
  public isLoading : boolean = false;
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
    public translate: TranslateService,
    private apiService: ApiService,
    private router : Router
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
    this.translate.use(localStorage.getItem('language'))
  }

  ngOnInit(): void {
    this.loadRecipes(0);
  }

  loadRecipes(skipper : number) {
    this.isLoading = true;

    this.apiService.getRecipesByUser(this.token, skipper)
      .subscribe(response => {
        if(response.length == 0 && this.recipes.length == 0) this.noData = true
        this.recipes.push(...response);
        this.isLoading = false;
      });

      this.skipper = this.skipper + 10;
  }

  goCreateRecipe() {
        this.router.navigate(['./taste-it/create-recipe/'])
  }

}
