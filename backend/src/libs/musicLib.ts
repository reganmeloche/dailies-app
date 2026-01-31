import Music from '../classes/music';
import { ILlmApi } from '../helpers/llmApi';
import logger from '../utils/logger';

export interface IMusicLib {
    fetchMusic(): Promise<Music | null>;
} 

class MusicLib implements IMusicLib {
    private _llmApi: ILlmApi;
    private _genrePrompts: string[];
    
    constructor(llmApi: ILlmApi, genrePrompts: string[]) {
        this._llmApi = llmApi;
        this._genrePrompts = genrePrompts;
    }

    public async fetchMusic(): Promise<Music | null> {
        const prompt = `
            Generate exactly 5 music recommendations. 
            
            Constraints: 
            - One should be classical. 1/10 chance of being well-known, 1/10 of being modern/experimental, 3/10 chance of being mid-late romantic, 3/10 chance of being C20, 2/10 chance of being piano-focused
            - One should be a critically acclaimed pop/rock album. Don't be too obvious - mix it up.
            - One should be a new release that you think I'll like
            - One should be electronic/ambient. 3/10 chance of being well-known, 1/10 of being experimental, 3/10 chance of being chill/ambient, 3/10 chance of being dance-oriented
            - One should be from a genre I don't usually listen to (jazz, world, etc). Don't be too obvious - mix it up.
            - Use a mix of different artists and styles across recommendations; avoid repetition where possible. Don't do too many obvious ones.
            - Do NOT give too many recommendations that would be for beginners, or top-10 list. (1-2 are okay)
            - Assume the reader already knows the obvious ones. You are giving this list to someone who listens to quite a bit of music
            - Output requirements: Provide only valid JSON. Do not include explanations, markdown, or extra text. 
            - Description must be 20-30 words.
            
            Output format: { "recs": [ { "album": "", "artist": "", "genre": "", "year": 1234, "description": ""}]}
        `;
        
        try {
            const response = await this._llmApi.query(prompt); 
            return JSON.parse(response) as Music
        } catch (error){
            logger.error('Error fetching music', { error });
            return null;
        }
    }
}

export default MusicLib;