import { Component, HostListener } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.scss'],
})
export class FollowedComponent {

  public recipes: RecipesResponse[] = [];
  private currentUser: UserResponse;
  public isLoading : boolean = false;
  private token: string;
  private skipper: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos === max) {
      this.loadRecipes(this.skipper)
    }
  }

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
  }

  ngOnInit(): void {

    this.loadRecipes(0);

  }

  loadRecipes(skipper: number) {
    this.isLoading = true;

    this.apiService.getRecipesFollowed(this.token, skipper)
      .subscribe(recipes => {
        this.recipes.push(...recipes);
        this.isLoading = false;

        if(recipes.length == 0) {
          this.toastService.toastGenerator('','There is no more recipes',4, ToastPositionEnum.BOTTOM_RIGHT)
        }
      });

      this.skipper = this.skipper + 10;
  }

}
