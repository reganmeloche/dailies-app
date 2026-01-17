export class SingleRecipe {
    public name: string
    public description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

class Recipe {
    public recipes: SingleRecipe[];

    constructor(recipes: SingleRecipe[]) {
      this.recipes = recipes;
    }
}


export const sampleRecipe: Recipe = new Recipe(
    [
        new SingleRecipe(
            "Spaghetti Carbonara",
            "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper."
        ),
        new SingleRecipe(
            "Chicken Tikka Masala",
            "Chunks of roasted marinated chicken in a spiced curry sauce."
        ),
    ]
);

export const sampleRecipeString: string = `
{
    "recipes": [
        {
            "name": "Spaghetti Carbonara",
            "description": "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper."
        },
        {
            "name": "Chicken Tikka Masala",
            "description": "Chunks of roasted marinated chicken in a spiced curry sauce."
        }
    ]
}
`;

export default Recipe;