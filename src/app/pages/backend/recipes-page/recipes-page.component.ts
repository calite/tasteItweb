import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { RecipeReported } from 'src/app/core/interfaces/recipeReported.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public recipes : RecipeReported[] = [];
  private skipper: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const pos = window.pageYOffset + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this.loadRecipesReported(this.skipper);
    }
  }

  constructor(private apiService: ApiService, private toastService : ToastService) {
  }

  ngOnInit() {

    this.loadRecipesReported(0);

  }

  loadRecipesReported(skipper: number) {
    
    this.apiService.getRecipesReported(skipper).subscribe((response) => {
      console.log(response)
      this.recipes.push(...response);

      if (response.length == 0) {
        this.toastService.toastGenerator('', 'There is no more recipes', 4, ToastPositionEnum.BOTTOM_RIGHT)
      }
    });

    this.skipper = this.skipper + 10;
  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid,true).subscribe( () => window.location.reload() );

  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid,false).subscribe( () => window.location.reload() );
  }

  viewDetails(rid) {
    console.log(rid)
  }
}
