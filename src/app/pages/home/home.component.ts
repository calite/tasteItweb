import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe, RecipesResponse, User } from '../../core/interfaces/recipe.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user.service';

import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public recipes: RecipesResponse[] = [];

  private currentUser: any;
  private userNeo: UserResponse;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { 

    this.currentUser = this.userService.getUser(); //traemos el usuario de local

    this.apiService.getUserByToken(this.currentUser.uid) //traemos informacion desde la base de datos
      .subscribe(user => {
        this.userNeo = user;
        localStorage.setItem('userNeo',JSON.stringify(this.userNeo)); //almacenamos los datos del usuario en local
      });

    this.apiService.getRecipesHome()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
    
  }

  ngOnInit() {

    this.currentUser = this.userService.getUser(); //traemos el usuario de local

    this.apiService.getUserByToken(this.currentUser.uid) //traemos informacion desde la base de datos
      .subscribe(user => {
        this.userNeo = user;
        localStorage.setItem('userNeo',JSON.stringify(this.userNeo)); //almacenamos los datos del usuario en local
      });

    this.apiService.getRecipesHome()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }

  viewRecipe(recipeId: any) {
    this.router.navigate(['/recipe/' + recipeId]);
  }

  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }



}