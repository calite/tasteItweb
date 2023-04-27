import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipesResponse, User } from '../interfaces/recipe.interface';
import { Observable } from 'rxjs';
import { CommentsOnUserResponse } from '../interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    // private apiUrl: string = 'https://elegant-dhawan.212-227-50-151.plesk.page/';
    private apiUrl: string = 'https://localhost:7076/';



    constructor(private http: HttpClient) {

    }

    getRecipesHome(skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/all/${skipper}`;
        return this.http.get<RecipesResponse[]>(url);

    }

    getRecipeById(recipeId: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/${recipeId}`;
        return this.http.get<RecipesResponse[]>(url);

    }

    getUserByToken(token: string): Observable<User> {

        const url = `${this.apiUrl}user/bytoken/${token}`;
        return this.http.get<User>(url);

    }

    getRecipesByUser(token: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/byuser/${token}`;
        return this.http.get<RecipesResponse[]>(url);

    }

    getRecipesLiked(token: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}user/liked_recipes/${token}`;
        return this.http.get<RecipesResponse[]>(url);

    }

    getRecipesFollowed(token: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}user/followers_recipes/${token}`;
        return this.http.get<RecipesResponse[]>(url);

    }
    
    //contadores de perfil de usuario

    getCountRecipes(token: string): Observable<number> {
        
        const url = `${this.apiUrl}user/recipes_created/${token}`;
        return this.http.get<number>(url);

    }

    getCountFollowing(token: string): Observable<number> {
        
        const url = `${this.apiUrl}user/following/${token}`;
        return this.http.get<number>(url);
        
    }
    
    getCountFollowers(token: string): Observable<number> {

        const url = `${this.apiUrl}user/followers/${token}`;
        return this.http.get<number>(url);

    }

    getCountLikes(token: string): Observable<number> {

        const url = `${this.apiUrl}user/recipes_liked/${token}`;
        return this.http.get<number>(url);

    }

    getCommentsOnUser(token:string) : Observable<CommentsOnUserResponse[]>{

        const url = `${this.apiUrl}user/comments/${token}`;
        return this.http.get<CommentsOnUserResponse[]>(url);

    }



}
