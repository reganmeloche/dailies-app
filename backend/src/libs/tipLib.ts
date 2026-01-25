import Tip from '../classes/tip';
import { ILlmApi } from '../helpers/llmApi';

export interface ITipLib {
    fetchTips(): Promise<Tip | null>;
} 

class TipLib implements ITipLib {
    private _llmApi: ILlmApi;
    private _tipTopics: string[][];
    
    constructor(llmApi: ILlmApi, tipTopics: string[][]) {
        this._llmApi = llmApi;
        this._tipTopics = tipTopics;
    }

    public async fetchTips(): Promise<Tip | null> {
        let topics = [];

        for (const topicSet of this._tipTopics) {
            const randomIndex = Math.floor(Math.random() * topicSet.length);
            topics.push(topicSet[randomIndex]);
        }

        const prompt = `
            Provide a useful, concrete, non-generic and detailed tip (20-40 words each) about each of the following topics: ${topics.join(', ')}. 
            
            Contstraints:
            - Tips should be practical and actionable, not vague or abstract. Don't pick the super-obvious ones - think deeply about what would be genuinely helpful.
            - Avoid overly common advice; focus on unique and insightful suggestions.
            - One tip per topic 
            - Output requirements: Provide only valid JSON. Do not include explanations, markdown, or extra text. 

            Output format: { "tips": [ {"theme": "", "text": ""}, ... ] }
        `;

        try {
            const response = await this._llmApi.query(prompt); 
            return JSON.parse(response) as Tip;
        } catch (error){
            console.log('ERROR fetching tip', error);
            return null;
        }
    }
}

export default TipLib;