import { Recipe, User } from "./recipe.interface";

export interface CommentsOnUserResponse {
    user: User;
    comment: Comment;

}

export interface Comment {
    comment: string;
    dateCreated: string;
}



export interface CommentsOnRecipeResponse {
    recipeId: number;
    recipe:   Recipe;
    user:     User;
    c:        CommentRating;
}

export interface CommentRating {
    comment: string;
    dateCreated: string;
    rating: string;
}


