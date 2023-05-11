import { Recipe, User } from "./recipe.interface";

export interface CommentsOnUserResponse {
    user: User;
    comment: Comment;
}

export interface Comment {
    comment: string;
    dateCreated: Date;
}

export interface CommentsOnRecipeResponse {
    recipeId: number;
    recipe: Recipe;
    user: User;
    c: CommentRating;
}

export interface CommentRating {
    comment: string;
    dateCreated: Date;
    rating: number;
}

export interface ReportOnRecipeResponse {
    RecipeId: number;
    token: string;
    comment: string;
}


