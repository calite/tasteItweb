import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';

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
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastService: ToastService
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
  }

  ngOnInit(): void {

    this.loadRecipes(0);
  }

  loadRecipes(skipper : number) {
    this.isLoading = true;

    this.apiService.getRecipesByUser(this.token, skipper)
      .subscribe(recipes => {
        this.recipes.push(...recipes);
        this.isLoading = false;

        if(recipes.length == 0) {
          // this.toastService.toastGenerator('','There is no more recipes',4, ToastPositionEnum.BOTTOM_RIGHT)
        }
      });

      this.skipper = this.skipper + 10;

  }

}
