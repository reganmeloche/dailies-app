import Joke from '../../shared/classes/joke';
import Quote from '../../shared/classes/quote';
import Fact, {sampleFacts} from '../../shared/classes/fact';
import CalvinAndHobbes, {sampleCalvin} from '../../shared/classes/calvinAndHobbes';
import { IComicLib } from './comicLib';
import { IJokeLib } from './jokeLib';
import { IQuoteLib } from './quoteLib';
import { IRiddleLib } from './riddleLib';
import { IPoemLib } from './poemLib';
import Riddle from '../../shared/classes/riddle';
import Poem from '../../shared/classes/poem';

class MainLib {
    private comicLib: IComicLib;
    private jokeLib: IJokeLib;
    private quoteLib: IQuoteLib;
    private riddleLib: IRiddleLib;
    private poemLib: IPoemLib;


    constructor(
        comicLib: IComicLib,
        jokeLib: IJokeLib,
        quoteLib: IQuoteLib,
        riddleLib: IRiddleLib,
        poemLib: IPoemLib,

    ) {
        this.comicLib = comicLib;
        this.jokeLib = jokeLib;
        this.quoteLib = quoteLib;
        this.riddleLib = riddleLib;
        this.poemLib = poemLib;

    }
  
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    public async getJoke(): Promise<Joke> {
        return await this.jokeLib.fetchJoke();
    }

    public async getQuote(): Promise<Quote> {
        return await this.quoteLib.fetchQuote();
    }

    public async getRiddle(): Promise<Riddle> {
        return await this.riddleLib.fetchRiddle();
    }

    public async getPoem(): Promise<Poem> {
        return await this.poemLib.fetchPoem();
    }

    public async getFact(): Promise<Fact> {
        await this.sleep(1000);

        const randomIndex = Math.floor(Math.random() * sampleFacts.length);
        return sampleFacts[randomIndex]; 
    }

    public async getCalvinAndHobbes(): Promise<CalvinAndHobbes> {
        let result = await this.comicLib.fetchComic();
        
        // TODO: CLEANUP
        if (!result) {
            console.log('ERROR FETCHING CALVIN AND HOBBES');
            const randomIndex = Math.floor(Math.random() * sampleCalvin.length);
            result = sampleCalvin[randomIndex]; 
        }
        return result;
    }
  }
  
  export default MainLib;
  