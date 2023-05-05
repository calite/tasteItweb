import { Component, HostListener, Output, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { RecipesResponse } from 'src/app/core/interfaces/recipe.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';

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
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
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

        if (recipes.length == 0) {
          // this.toastService.toastGenerator('', 'There is no more recipes', 4, ToastPositionEnum.BOTTOM_RIGHT)
        }
      });

    this.skipper = this.skipper + 10;
  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }
}
