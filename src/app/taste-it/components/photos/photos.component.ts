import { Component, HostListener, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { ToastService } from 'src/app/core/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {

  recipes: RecipesResponse[] = [];
  currentUser: UserResponse;
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
    private apiService : ApiService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
    ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.token = this.currentUser.token;
  }

  ngOnInit(): void {
    this.loadRecipes(0)
  }

  loadRecipes(skipper : number){
    this.isLoading = true;

    this.apiService.getRecipesByUser(this.token, skipper)
    .subscribe(recipes => {
      this.recipes.push(...recipes);
      this.isLoading = false;

        if(recipes.length == 0) {
          this.toastService.toastGenerator('','There is no more recipes',4, ToastPositionEnum.BOTTOM_RIGHT)
        }
    });

    this.skipper = this.skipper + 10;
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }
}
