import Joke, {sampleJokes} from '../../shared/classes/joke';
import Quote, {sampleQuotes} from '../../shared/classes/quote';
import Fact, {sampleFacts} from '../../shared/classes/fact';
import CalvinAndHobbes, {sampleCalvin} from '../../shared/classes/calvinAndHobbes';
import { IComicLib } from './comicLib';
import { IJokeLib } from './jokeLib';

class MainLib {
    private comicLib: IComicLib;
    private jokeLib: IJokeLib;

    constructor(
        comicLib: IComicLib,
        jokeLib: IJokeLib,
    ) {
        this.comicLib = comicLib;
        this.jokeLib = jokeLib;
    }
  
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    public async getJoke(): Promise<Joke> {
        return await this.jokeLib.fetchJoke();
    }

    public async getQuote(): Promise<Quote> {
        await this.sleep(1000);

        const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
        return sampleQuotes[randomIndex]; 
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
  