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
  public recipesFiltered : RecipesReported[] = [];
  
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
      nameRecipe : '',
      creatorRecipe: '',
      activeRecipe : '',
    });
  }

  ngOnInit() {

    this.loadRecipesReported(0);

  }

  loadRecipesReported(skipper: number) {

    this.apiService.getRecipesReported(skipper).subscribe((response) => {
      this.recipes.push(...response);

      if (response.length == 0) {
        this.toastService.toastGenerator('', 'There is no more recipes', 4, ToastPositionEnum.BOTTOM_RIGHT)
      }
    });

    this.skipper = this.skipper + 20;
  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, true).subscribe(() => window.location.reload());

  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, false).subscribe(() => window.location.reload());
  }

  viewDetails(rid) {
    this.router.navigate([`./backend/view-recipe/${rid}`])
  }

  onSubmit() {

    const nameRecipe = this.formFilter.controls.nameRecipe.value
    const creatorRecipe = this.formFilter.controls.creatorRecipe.value
    const activeRecipe = this.formFilter.controls.activeRecipe.value

    this.recipes.forEach(element => {
      if(element.recipe.name.toLowerCase().includes(nameRecipe))
        this.recipesFiltered.push(element)
    }); 
    this.recipes = this.recipesFiltered;

  }

  resetFilter() {
    this.formFilter.reset()
    this.recipes = []
    this.loadRecipesReported(0)
  }
}
