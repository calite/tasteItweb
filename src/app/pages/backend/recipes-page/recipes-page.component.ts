import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipesReported } from 'src/app/core/interfaces/recipeReported.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommentRating } from '../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public recipes: RecipesReported[] = [];

  formFilter: FormGroup;

  displayedColumns: string[] = ['recipeId', 'recipe.name', 'creator.username', 'reportsCount', 'recipe.active'];
  dataSource = new MatTableDataSource<RecipesReported>(this.recipes);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'recipe.name': return item.recipe.name;
        case 'creator.username': return item.creator.username;
        case 'recipe.active': return item.recipe.active;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
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
    this.formFilter.reset();
  }

  loadRecipesReported() {

    this.apiService.getRecipesReported().subscribe((response) => {
      this.recipes = response;
      this.dataSource.data = this.recipes;
      this.dataSource.paginator = this.paginator;
    })

  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, true).subscribe( () => this.loadRecipesReported());
  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, false).subscribe(() => this.loadRecipesReported());
  }

  changeState(event, recipeId) {
    this.apiService.postChangeStateRecipe(recipeId, event['checked']).subscribe(() => this.loadRecipesReported());
  }

  viewDetails(rid) {
    this.router.navigate([`./backend/view-recipe/${rid}`])
  }

  onSubmit() {

    const nameRecipe: string = this.formFilter.controls.nameRecipe.value
    const creatorRecipe: string = this.formFilter.controls.creatorRecipe.value
    const activeRecipe: boolean = this.formFilter.controls.activeRecipe.value

    this.apiService.getFilteredRecipesReported(nameRecipe, creatorRecipe, activeRecipe).subscribe(response => {
      this.recipes = response;
      this.dataSource.data = this.recipes;
      this.dataSource.paginator = this.paginator;
    })

  }

  resetFilter() {
    this.formFilter.reset();
    this.loadRecipesReported();
  }

}
