import logger from '../utils/logger';

export interface IPoemApi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchRandomPoems(count: number): Promise<any>;
} 

export default class PoemApi implements IPoemApi {
    private readonly _url: string;

    public constructor() {
        this._url = "https://poetrydb.org/random";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async fetchRandomPoems(count: number): Promise<any> {
        const response = await fetch(`${this._url}/${count}`);
        
        if (!response.ok) {
            logger.error("Poem Api fetch response error");
            return null;
        }

        const data = await response.json();
        return data;
    }
}