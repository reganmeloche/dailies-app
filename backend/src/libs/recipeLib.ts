import Recipe, { sampleRecipe } from '../classes/recipe';
import { ILlmApi } from '../helpers/llmApi';

export interface IRecipeLib {
    fetchRecipe(): Promise<Recipe>;
}

class RecipeLib implements IRecipeLib {
    private _llmApi: ILlmApi;
    private _cuisinePrompts: string[];  

    constructor(llmApi: ILlmApi, cuisinePrompts: string[]) {
        this._llmApi = llmApi;
        this._cuisinePrompts = cuisinePrompts;
    } 

    public async fetchRecipe(): Promise<Recipe> {
        console.log('ERROR fetching recipe - Not implemented');
        return sampleRecipe;
    }

    private static convertToRecipe(strRecipe: string): Recipe {
        const parsed = JSON.parse(strRecipe);
        return parsed as Recipe;
    }
}

export default RecipeLib;