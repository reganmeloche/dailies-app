import Tip, { sampleTip } from '../classes/tip';
import { ILlmApi } from '../helpers/llmApi';

export interface ITipLib {
    fetchTips(): Promise<Tip>;
} 

class TipLib implements ITipLib {
    private _llmApi: ILlmApi;
    private _tipTopics: string[][];
    
    constructor(llmApi: ILlmApi, tipTopics: string[][]) {
        this._llmApi = llmApi;
        this._tipTopics = tipTopics;
    }

    public async fetchTips(): Promise<Tip> {
        let topics = [];

        for (const topicSet of this._tipTopics) {
            const randomIndex = Math.floor(Math.random() * topicSet.length);
            topics.push(topicSet[randomIndex]);
        }

        const prompt = `
            Provide a useful, concrete, non-generic and detailed tip (20-40 words each) about each of the following topics: ${topics.join(', ')}. 
            
            Contstraints:
            - Tips should be practical and actionable, not vague or abstract.
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
            return sampleTip;
        }
    }
}

export default TipLib;