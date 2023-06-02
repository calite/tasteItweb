import { Component, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RecipesReported } from 'src/app/core/interfaces/recipeReported.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public recipes: RecipesReported[] = [];
  public recipesFiltered: RecipesReported[] = [];

  formFilter: FormGroup;

  displayedColumns: string[] = ['id', 'name', 'creator', 'reports', 'state'];
  dataSource = new MatTableDataSource<RecipesReported>(this.recipes);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private apiService: ApiService,
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

    this.loadRecipesReported();

  }

  loadRecipesReported() {

    this.apiService.getRecipesReported().subscribe((response) => {
      this.recipes = response;
      this.recipesFiltered = this.recipes;
      })
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
    this.loadRecipesReported();
  }
}
