import { User } from "./recipe.interface";

export interface CommentsOnUserResponse {
    user: User;
    comment: Comment;

}

export interface Comment {
    comment: string;
    dateCreated: string;
}