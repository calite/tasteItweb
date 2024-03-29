import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesResponse, User } from '../interfaces/recipe.interface';
import { Observable } from 'rxjs';
import { CommentsOnRecipeResponse, CommentsOnUserResponse, ReportOnRecipeResponse } from '../interfaces/comment.interface';
import { UserFollowingResponse, UserResponse } from '../interfaces/user.interface';
import { RecipeReported, RecipesReported } from '../interfaces/recipeReported.interface';
import { ReportResponse } from '../interfaces/report.interface';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = environment.apiUrl;
    private apiKey: string = sessionStorage.getItem('accessToken')

    constructor(private http: HttpClient) { }

    updateApiKey() {
        this.apiKey = sessionStorage.getItem('accessToken')
    }

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

        const url = `${this.apiUrl}user/bytoken-web/${token}`;
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

    getCommentsOnUser(token: string, skipper: number): Observable<CommentsOnUserResponse[]> {

        const url = `${this.apiUrl}user/comments/${token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<CommentsOnUserResponse[]>(url, { headers });

    }

    getCommentsOnRecipe(rid: number, skipper: number): Observable<CommentsOnRecipeResponse[]> {

        const url = `${this.apiUrl}recipe/comments/${rid}/${skipper}`;
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

    getUsersByName(term: string): Observable<UserResponse[]> {

        const url = `${this.apiUrl}user/byname_web/${term}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<UserResponse[]>(url, { headers });

    }

    getFilteredRecipes(
        name: string,
        country: string,
        difficulty: number,
        rating: number,
        ingredients: string,
        tags: string
    ): Observable<RecipesResponse[]> {

        let params = new HttpParams();
        const headers = { Authorization: `Bearer ${this.apiKey}` }

        if (name) {
            params = params.set('name', name);
        }

        if (country) {
            params = params.set('country', country);
        }

        if (difficulty) {
            params = params.set('difficulty', difficulty);
        }

        if (rating) {
            params = params.set('rating', rating);
        }

        if (ingredients) {
            params = params.set('ingredients', ingredients);
        }

        if (tags) {
            params = params.set('tags', tags);
        }

        return this.http.get<RecipesResponse[]>(`${this.apiUrl}recipe/search`, { params, headers });
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
            rid: recipeId,
            token: token
        }

        return this.http.post<RecipesResponse[]>(url, body, httpOptions);

    }

    //rate recipe
    postCommentOnRecipe(recipeId: number, token: string, comment: string, rating: number): Observable<CommentsOnRecipeResponse[]> {

        const url = `${this.apiUrl}recipe/comment_recipe`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            rid: recipeId,
            token: token,
            comment: comment,
            rating: rating
        }

        return this.http.post<CommentsOnRecipeResponse[]>(url, body, httpOptions);

    }

    postReportOnRecipe(recipeId: number, token: string, comment: string): Observable<ReportOnRecipeResponse[]> {

        const url = `${this.apiUrl}recipe/report_recipe`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            rid: recipeId,
            token: token,
            comment: comment,
        }

        return this.http.post<ReportOnRecipeResponse[]>(url, body, httpOptions);

    }

    getCheckFollowingUser(sender_token: string, receiver_token: string): Observable<boolean> {

        const url = `${this.apiUrl}user/following/${sender_token}_${receiver_token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<boolean>(url, { headers });

    }

    postFollowUser(sender_token: string, receiver_token: string): Observable<UserFollowingResponse[]> {

        const url = `${this.apiUrl}user/follow`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            senderToken: sender_token,
            receiverToken: receiver_token
        }

        return this.http.post<UserFollowingResponse[]>(url, body, httpOptions);

    }

    postCommentOnUser(sender_token: string, receiver_token: string, comment: string) {

        const url = `${this.apiUrl}user/comment_user`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            senderId: sender_token,
            receiverId: receiver_token,
            comment: comment
        }

        return this.http.post(url, body, httpOptions);

    }

    getFollowing(sender_token: string, skipper: number): Observable<UserResponse[]> {
        const url = `${this.apiUrl}user/following_user/${sender_token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<UserResponse[]>(url, { headers });
    }

    getFollowers(sender_token: string, skipper: number): Observable<UserResponse[]> {
        const url = `${this.apiUrl}user/followers_user/${sender_token}/${skipper}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<UserResponse[]>(url, { headers });
    }


    registerUser(token: string, username: string, imgProfile: string, biography: string) {
        const url = `${this.apiUrl}user/register`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            token: token,
            username: username,
            imgProfile: imgProfile,
            biography: biography,
        }

        return this.http.post(url, body, httpOptions);
    }

    postCreateRecipe(token: string, name: string, description: string, country: string, image: string, difficulty: number, ingredients: string[], steps: string[]) {
        const url = `${this.apiUrl}recipe/create`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            token: token,
            name: name,
            description: description,
            country: country,
            image: image,
            difficulty: difficulty,
            ingredients: ingredients,
            steps: steps
        }

        return this.http.post(url, body, httpOptions);
    }

    getCheckOwnerRecipe(rid: string, token: string) {
        const url = `${this.apiUrl}recipe/check_owner/${rid}/${token}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<boolean>(url, { headers });
    }

    postEditRecipe(rid: number, name: string, description: string, country: string, image: string, difficulty: number, ingredients: string[], steps: string[]) {
        const url = `${this.apiUrl}recipe/edit`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            rid: rid,
            name: name,
            description: description,
            country: country,
            image: image,
            difficulty: difficulty,
            ingredients: ingredients,
            steps: steps
        }

        return this.http.post(url, body, httpOptions);
    }

    postEditUser(token: string, username: string, imgProfile: string, biography: string) {

        const url = `${this.apiUrl}user/edit`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            token: token,
            username: username,
            imgProfile: imgProfile,
            biography: biography
        }

        return this.http.post(url, body, httpOptions);

    }

    postDeleteUser(token: string) {

        const url = `${this.apiUrl}user/delete`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            token: token
        }

        return this.http.post(url, body, httpOptions);
    }

    postDeleteRecipe(recipeId: number) {

        const url = `${this.apiUrl}recipe/delete`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            recipeId: recipeId
        }

        return this.http.post(url, body, httpOptions);
    }

    getLikesOnRecipe(rid: number) {
        const url = `${this.apiUrl}recipe/likes_on_recipes/${rid}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<number>(url, { headers });
    }



    //ADMINISTRACION

    getRecipesReported() {
        const url = `${this.apiUrl}admin/recipes/all`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipesReported[]>(url, { headers });
    }

    getRecipeReportedById(rid : number) {
        const url = `${this.apiUrl}admin/recipe/${rid}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<RecipeReported[]>(url, { headers });
    }

    getReportsOnRecipe(rid) {
        const url = `${this.apiUrl}admin/reports-recipe/${rid}`;
        const headers = { Authorization: `Bearer ${this.apiKey}` }
        return this.http.get<ReportResponse[]>(url, { headers });
    }

    postChangeStateRecipe(rid : number, value : boolean) {

        const url = `${this.apiUrl}admin/recipe/change_state`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            })
        };
        const body = {
            rid: rid,
            value : value
        }

        return this.http.post(url, body, httpOptions);

    }

    getFilteredRecipesReported(
        name: string,
        creator: string,
        active: boolean
    ): Observable<RecipesReported[]> {

        let params = new HttpParams();
        const headers = { Authorization: `Bearer ${this.apiKey}` }

        if (name) {
            params = params.set('name', name);
        }

        if (creator) {
            params = params.set('creator', creator);
        }

        if (active != null) {
            params = params.set('active', active);
        }

        return this.http.get<RecipesReported[]>(`${this.apiUrl}admin/recipes/filter`, { params, headers });
    }




}
