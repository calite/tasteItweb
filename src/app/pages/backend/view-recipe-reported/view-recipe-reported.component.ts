import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportResponse } from 'src/app/core/interfaces/report.interface';
import { ApiService } from '../../../core/services/api.service';
import { switchMap } from 'rxjs';
import {  RecipeReported } from 'src/app/core/interfaces/recipeReported.interface';

@Component({
  selector: 'app-view-recipe-reported',
  templateUrl: './view-recipe-reported.component.html',
  styleUrls: ['./view-recipe-reported.component.scss']
})
export class ViewRecipeReportedComponent implements OnInit {

  public recipe: RecipeReported[];
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
        switchMap(({ rid }) => this.apiService.getRecipeReportedById(rid)),
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
        //console.log(response)
      })

  }

  publishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, true).subscribe(() => window.location.reload());
  }

  unpublishRecipe(rid) {
    this.apiService.postChangeStateRecipe(rid, false).subscribe(() => window.location.reload());
  }

}
