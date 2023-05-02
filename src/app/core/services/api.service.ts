import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipesResponse, User } from '../interfaces/recipe.interface';
import { Observable } from 'rxjs';
import { CommentsOnRecipeResponse, CommentsOnUserResponse } from '../interfaces/comment.interface';
import { UserResponse } from '../interfaces/user.interface';


@Injectable({
    providedIn: 'root'
})
export class ApiService {


    //private apiUrl: string = 'https://great-dhawan.212-227-50-151.plesk.page/';
    private apiUrl: string = 'https://localhost:7076/';
    private apiKey: string = sessionStorage.getItem('accessToken');

    constructor(private http: HttpClient) { }

    getRecipesHome(skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/all/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipeById(recipeId: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/${recipeId}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getUserByToken(token: string): Observable<User> {

        this.apiKey = sessionStorage.getItem('accessToken');

        const url = `${this.apiUrl}user/bytoken/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<User>(url, { headers });

    }

    getRecipesByUser(token: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/byuser/${token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipesLiked(token: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}user/liked_recipes/${token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipesFollowed(token: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}user/followers_recipes/${token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    //contadores de perfil de usuario

    getCountRecipes(token: string): Observable<number> {

        const url = `${this.apiUrl}user/recipes_created/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<number>(url, { headers });

    }

    getCountFollowing(token: string): Observable<number> {

        const url = `${this.apiUrl}user/following/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<number>(url, { headers });

    }

    getCountFollowers(token: string): Observable<number> {

        const url = `${this.apiUrl}user/followers/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<number>(url, { headers });

    }

    getCountLikes(token: string): Observable<number> {

        const url = `${this.apiUrl}user/recipes_liked/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<number>(url, { headers });

    }

    //coments

    getCommentsOnUser(token: string): Observable<CommentsOnUserResponse[]> {

        const url = `${this.apiUrl}user/comments/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<CommentsOnUserResponse[]>(url, { headers });

    }

    getCommentsOnRecipe(rid: string): Observable<CommentsOnRecipeResponse[]> {

        const url = `${this.apiUrl}recipe/comments/${rid}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<CommentsOnRecipeResponse[]>(url, { headers });

    }

    //search

    getRecipesByName(term: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/byname/${term}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipesByTags(term: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/bytags/${term}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipesByIngredients(term: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/byingredients/${term}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getRecipesByCountry(term: string, skipper: number): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/bycountry/${term}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    getUsersByName(term: string, skipper: number): Observable<UserResponse[]> {

        const url = `${this.apiUrl}user/byname/${term}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<UserResponse[]>(url, { headers });

    }

    //random

    getRandomRecipesWithLimit(limit: number) {

        const url = `${this.apiUrl}recipe/random/${limit}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    //mirar si una receta tiene me gusta

    getRecipeIsLiked(rid: number, token: string) {

        const url = `${this.apiUrl}recipe/isliked/${rid}_${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesResponse[]>(url, { headers });

    }

    postLikeOnRecipe(recipeId: number, token: string): Observable<RecipesResponse[]> {

        const url = `${this.apiUrl}recipe/like`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            rid : recipeId,
            token : token
        }

        return this.http.post<RecipesResponse[]>(url, body, httpOptions);

    }



}
