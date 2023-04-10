import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipesResponse } from './recipe.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    private apiUrl: string = 'https://admiring-boyd.212-227-50-151.plesk.page/';


    
    constructor(private http: HttpClient) {
        
    }

     getRecipesHome() : Observable<RecipesResponse[]> {

        const url = `${ this.apiUrl }recipe/all`;
        return this.http.get<RecipesResponse[]>( url );

    }

    getRecipeById(recipeId : string) : Observable<RecipesResponse[]>{

        const url = `${ this.apiUrl }recipe/${ recipeId }` ;
        return this.http.get<RecipesResponse[]>( url );

    }

}
