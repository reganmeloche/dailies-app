import axios from 'axios';
import Poem, { Stanza } from '../classes/poem';

export interface IPoemApi {
    getDailyPoem(): Promise<Poem>;
} 

export default class PoemApi implements IPoemApi {
    private readonly _url: string;

    public constructor() {
        this._url = "https://poetrydb.org/random";
    }

    public async getDailyPoem(): Promise<Poem> {
        const poemCount = 5;
        const apiResponse = await axios.get(`${this._url}/${poemCount}`);
        
        const d = apiResponse.data;

        const lowestIndex = d.reduce((res:number, curr:any, i:number) => {
            return Number(curr['linecount']) < Number(d[i]['linecount']) ? i : res;
          }, 0);

        const p1 = apiResponse.data[lowestIndex];

        return new Poem(
            p1['author'],
            p1['title'],
            [
                new Stanza(p1['lines'])
            ]
        );
    }
}