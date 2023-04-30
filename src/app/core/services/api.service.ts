import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipesResponse, User } from '../interfaces/recipe.interface';
import { Observable } from 'rxjs';
import { CommentsOnRecipeResponse, CommentsOnUserResponse } from '../interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    // private apiUrl: string = 'https://elegant-dhawan.212-227-50-151.plesk.page/';
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

    getRecipesByUser(token: string, skipper:number): Observable<RecipesResponse[]> {

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



}
