import Music, { sampleMusic } from '../classes/music';
import { ILlmApi } from '../helpers/llmApi';

export interface IMusicLib {
    fetchMusic(): Promise<Music>;
} 

class MusicLib implements IMusicLib {
    private _llmApi: ILlmApi;
    private _genrePrompts: string[];
    
    constructor(llmApi: ILlmApi, genrePrompts: string[]) {
        this._llmApi = llmApi;
        this._genrePrompts = genrePrompts;
    }

    // Fetch a quiz
    public async fetchMusic(): Promise<Music> {
        console.log('ERROR fetching music - Not implemented');
        return sampleMusic;
    }

    private static convertToMusic(strMusic: string): Music {
        const parsed = JSON.parse(strMusic);
        return parsed as Music;
    } 
}

export default MusicLib;