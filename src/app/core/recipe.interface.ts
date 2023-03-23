export interface RecipesResponse {
    data: Recipe[];
}

export interface Recipe {
    name:        string;
    description: string;
    difficulty:  number;
    image:       null | string;
    dateCreated: null | string;
    country:     null | string;
    ingredients: string[] | null;
    tags:        string[] | null;
    steps:       string[] | null;
}

export interface User {
    name: string;
}