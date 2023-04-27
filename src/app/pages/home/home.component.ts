import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { RecipesResponse } from '../../core/interfaces/recipe.interface';
import { UserService } from 'src/app/core/services/user.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public recipes: RecipesResponse[];
  public isLoading: boolean = false;
  private skipper: number = 0;
  private currentUser: any;
  private userNeo: UserResponse;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {
    

    this.currentUser = this.userService.getUser(); //traemos el usuario de local

    this.apiService.getUserByToken(this.currentUser.uid) //traemos informacion desde la base de datos
      .subscribe(user => {
        this.userNeo = user;
        localStorage.setItem('userNeo', JSON.stringify(this.userNeo)); //almacenamos los datos del usuario en local
      });

  }

  ngOnInit() {

    this.loadRecipes();

  }

  loadRecipes() {
    this.isLoading = true;

    this.apiService.getRecipesHome(this.skipper)
      .subscribe(recipes => {
        this.recipes = recipes;
        this.isLoading = false;
      });
  }

}