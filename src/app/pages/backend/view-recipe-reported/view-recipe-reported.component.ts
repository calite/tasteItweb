import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsOnRecipeResponse } from 'src/app/core/interfaces/comment.interface';
import { RecipesResponse, User } from 'src/app/core/interfaces/recipe.interface';
import { ReportResponse } from 'src/app/core/interfaces/report.interface';
import { ApiService } from '../../../core/services/api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-view-recipe-reported',
  templateUrl: './view-recipe-reported.component.html',
  styleUrls: ['./view-recipe-reported.component.scss']
})
export class ViewRecipeReportedComponent {

  public recipe: RecipesResponse[];
  public reports: ReportResponse[];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.loadData();

  }

  loadData() {

    this.activatedRoute.params
      .pipe(
        switchMap(({ rid }) => this.apiService.getRecipeById(rid)),
      )
      .subscribe(response => {
        this.recipe = response
        console.log(response)
      })

    this.activatedRoute.params
      .pipe(
        switchMap(({ rid }) => this.apiService.getReportsOnRecipe(rid)),
      )
      .subscribe(response => {
        this.reports = response
        console.log(response)
      })

  }

}
