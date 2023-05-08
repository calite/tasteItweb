import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { User } from 'src/app/core/interfaces/recipe.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { RecipesResponse } from '../../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-edit-recipe-page',
  templateUrl: './edit-recipe-page.component.html',
  styleUrls: ['./edit-recipe-page.component.scss']
})
export class EditRecipePageComponent implements OnInit {

  private currentUser: User;

   @Output()
  public recipe : RecipesResponse[]

  constructor(
    private apiService: ApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
  ) { }


  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    this.isOwner()

  }

  async isOwner() { //se compueba si el usuario actual es el propieario de la receta
    let rid = ''

    await this.activatedRoute.paramMap.subscribe(params => {
      rid = params.get('recipeId')

    })

    const token = this.currentUser.token

    this.apiService.getCheckOwnerRecipe(rid, token).subscribe(response => {
      if (!response) {
        this.toastService.toastGenerator('', 'You are not the owner of that recipe', 4, ToastPositionEnum.BOTTOM_RIGHT);
        this.route.navigate(['./home']); //enviamos al home si no lo es
      } else {
        this.apiService.getRecipeById(rid).subscribe(response => { //cargamos la receta para enviarsela al componente hijo
          this.recipe = response;
          //console.log(response)
        });
      }
    })

  }

}
