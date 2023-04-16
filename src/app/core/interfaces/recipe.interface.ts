export interface RecipesResponse {
    recipeId: number;
    recipe:   Recipe;
    user:     User;
}

export interface Recipe {
    name:        string;
    description: string;
    difficulty:  number;
    image:       string;
    dateCreated: Date;
    country:     string;
    ingredients: string[];
    tags:        string[];
    steps:       string[];
}

export interface User {
    token:      string;
    username:   string;
    imgProfile: null;
    biography:  null;
}