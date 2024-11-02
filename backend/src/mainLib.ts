import { Category } from '../../shared/classes/category';
import Joke, {sampleJokes} from '../../shared/classes/joke';
import Quote, {sampleQuotes} from '../../shared/classes/quote';
import Fact, {sampleFacts} from '../../shared/classes/fact';
import CalvinAndHobbes, {sampleCalvin} from '../../shared/classes/calvinAndHobbes';
import { IComicLib } from './comicLib';

class MainLib {
    private categories: Category[] = [];
    private comicLib: IComicLib;

    constructor(
        initialCategories: Category[],
        comicLib: IComicLib
    ) {
        this.categories = initialCategories
        this.comicLib = comicLib
    }
  
    public getCategories(): Category[] {
      return this.categories;
    }

    public getJoke(): Joke {
      const randomIndex = Math.floor(Math.random() * sampleJokes.length);
      return sampleJokes[randomIndex]; 
    }

    public getQuote(): Quote {
      const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
      return sampleQuotes[randomIndex]; 
    }

    public getFact(): Fact {
        const randomIndex = Math.floor(Math.random() * sampleFacts.length);
        return sampleFacts[randomIndex]; 
    }

    public async getCalvinAndHobbes(): Promise<CalvinAndHobbes> {
        let result = await this.comicLib.fetchComic();
        
        if (!result) {
            console.log('ERROR FETCHING CALVIN AND HOBBES');
            const randomIndex = Math.floor(Math.random() * sampleCalvin.length);
            result = sampleCalvin[randomIndex]; 
        }
        return result;
    }
  }
  
  export default MainLib;
  