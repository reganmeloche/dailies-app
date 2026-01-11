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

    // Fetch a quiz
    public async fetchTips(): Promise<Tip> {
        let topics = [];

        for (const topicSet of this._tipTopics) {
            const randomIndex = Math.floor(Math.random() * topicSet.length);
            topics.push(topicSet[randomIndex]);
        }

        const prompt = `
            Provide a useful, concrete, non-generic and detailed tip (20-40 words each) about each of the following topics: ${topics.join(', ')}. 
            The format of your result should be an object as follows:
            { 
            "tips": 
                [
                    {"theme": "health", "text": "Aim for 7-9 hours of consistent sleep each night. Keep your bedroom cool, dark, and screen-free at least 30 minutes before bed to improve sleep quality."},
                    {"theme": "tech", "text": "Use a password manager to generate unique, complex passwords for every account. Regularly audit stored passwords and immediately update any reused or weak credentials."},
                    {"theme": "random", "text": "Start each day by writing a top-3 priorities list. Focus only on completing these tasks before moving on to less critical work."}
                ]
            }  
        `;

        try {
            // Run the query against the LLM
            const response = await this._llmApi.query(prompt); 

            // Validation and Deserialization
            const tip = TipLib.convertToTip(response);

            return tip;
        } catch (error){
            // TODO: Will be logging this
            console.log('ERROR fetching tip', error);
            return sampleTip;
        }
    }

    // Convert the string response from the LLM into a structured tip
    // TODO: May want to add further validation here...
    private static convertToTip(strTip: string): Tip {
        const parsed = JSON.parse(strTip);
        return parsed as Tip;
    } 
}

export default TipLib;