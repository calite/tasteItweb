import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { RecipesReported } from 'src/app/core/interfaces/recipeReported.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public recipes: RecipesReported[] = [];
  public recipesFiltered: RecipesReported[] = [];

  private skipper: number = 0;
  private timer: any

  formFilter: FormGroup;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if (window.pageYOffset + window.innerHeight > document.documentElement.scrollHeight - 100) {
        this.loadRecipesReported(this.skipper);
      }
    }, 200);

  }


  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formFilter = this.fb.group({
      nameRecipe: '',
      creatorRecipe: '',
      activeRecipe: '',
    });
  }

  ngOnInit() {

    this.loadRecipesReported(0);

  }

  loadRecipesReported( skipper : number ) {

    this.apiService.getRecipesReported(skipper).subscribe((response) => {

      this.recipes.push(...response);
      this.recipesFiltered = this.recipes;

      if (response.length == 0) {
        this.toastService.toastGenerator('', 'There is no more recipes', 4, ToastPositionEnum.BOTTOM_RIGHT)
      }
    });

    this.skipper = this.skipper + 20;

    console.log(this.recipes.length)
  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, true).subscribe(() => window.location.reload());

  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, false).subscribe(() => window.location.reload());
  }

  changeState(event , recipeId) {
    this.apiService.postChangeStateRecipe(recipeId, event['checked']).subscribe(() => window.location.reload());
  }

  viewDetails(rid) {
    this.router.navigate([`./backend/view-recipe/${rid}`])
  }

  onSubmit() {

    const nameRecipe:string = this.formFilter.controls.nameRecipe.value
    const creatorRecipe:string = this.formFilter.controls.creatorRecipe.value
    const activeRecipe:string = this.formFilter.controls.activeRecipe.value

    this.recipesFiltered = this.recipes;

    if (nameRecipe != '') {
      this.recipesFiltered = this.recipesFiltered.filter(receta => receta.recipe.name.toLowerCase().includes(nameRecipe.toLowerCase()));
    }
    if (creatorRecipe != '') {
      this.recipesFiltered = this.recipesFiltered.filter(receta => receta.creator.username.toLowerCase().includes(creatorRecipe.toLowerCase()));
    }
    if (activeRecipe == 'true' || activeRecipe == 'false') {
      const active = (activeRecipe == 'true') ? true : false;
      this.recipesFiltered = this.recipesFiltered.filter(receta => receta.recipe.active == active);
    }
  }

  resetFilter() {
    this.formFilter.reset();
    this.recipesFiltered = this.recipes;
  }
}
