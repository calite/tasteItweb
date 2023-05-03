import { User } from "./recipe.interface";

export interface UserResponse {
    token:      string;
    username:   string;
    imgProfile: string;
    biography:  string;
}

export interface UserFollowingResponse {
    sender: User;
    receiver: User;
}

