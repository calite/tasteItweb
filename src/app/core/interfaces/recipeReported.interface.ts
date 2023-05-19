export interface RecipesReported {
    recipeId: number;
    recipe: Recipe;
    creator: Creator;
    reportsCount: number | null;
}

export interface RecipeReported {
    recipeId: number;
    recipe: Recipe;
    user: Creator;
}

export interface Creator {
    token: string;
    username: string;
    imgProfile: string;
    biography: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    image: string;
    dateCreated: Date;
    country: string;
    rating: number;
    active: boolean;
    ingredients: string[];
    tags: string[];
    steps: string[];
}
