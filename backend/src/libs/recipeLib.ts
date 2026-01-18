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
        const prompt = `
            Generate exactly 5 unique recipe ideas. Each recipe should include a name and a brief description (20-30 words).
            
            Constraints: 
            - Most recipes should be healthy. 
            - For most recipes, avoid deep-fried foods and excessive added sugars. 
            - For most recipes, use common, recognizable ingredients (no specialty or obscure items).
            - Each recipe must clearly include one primary protein, one primary carbohydrate, and at least one vegetable. 
            - Use a mix of different proteins, carbohydrates, and vegetables across recipes; avoid repetition where possible. 
            - Output requirements: Provide only valid JSON. Do not include explanations, markdown, or extra text. 
            - Recipe name must be 2-12 words. Description must be 20-30 words. 
            - Descriptions should be written in a neutral, informative tone (not marketing language). 
            
            Output format: { "recipes": [ { "name": "", "description": "" } ] }
        `;

        try {
            // Run the query against the LLM
            const response = await this._llmApi.query(prompt); 

            // Validation and Deserialization
            const recipe = RecipeLib.convertToRecipe(response);

            return recipe;
        } catch (error){
            // TODO: Will be logging this
            console.log('ERROR fetching recipe', error);
            return sampleRecipe;
        }
    }

    private static convertToRecipe(strRecipe: string): Recipe {
        const parsed = JSON.parse(strRecipe);
        return parsed as Recipe;
    }
}

export default RecipeLib;