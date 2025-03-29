import Joke from './classes/joke';
import Quote from './classes/quote';
import Fact from './classes/fact';
import CalvinAndHobbes, {sampleCalvin} from './classes/calvinAndHobbes';
import Trope from './classes/trope';
import { IComicLib } from './libs/comicLib';
import { IJokeLib } from './libs/jokeLib';
import { IQuoteLib } from './libs/quoteLib';
import { IRiddleLib } from './libs/riddleLib';
import { IPoemLib } from './libs/poemLib';
import { ITropeLib } from './libs/tropeLib';
import Riddle from './classes/riddle';
import Poem from './classes/poem';
import IMainLib from './interfaces/IMainLib';
import { IFactLib } from './libs/factLib';
import { IPictureLib } from './libs/pictureLib';
import Picture from './classes/picture';
import Quiz from './classes/quiz';
import { IQuizLib } from './libs/quizLib';

class MainLib implements IMainLib {
    private comicLib: IComicLib;
    private jokeLib: IJokeLib;
    private quoteLib: IQuoteLib;
    private riddleLib: IRiddleLib;
    private poemLib: IPoemLib;
    private tropeLib: ITropeLib;
    private factLib: IFactLib;
    private pictureLib: IPictureLib;
    private quizLib: IQuizLib;


    constructor(
        comicLib: IComicLib,
        jokeLib: IJokeLib,
        quoteLib: IQuoteLib,
        riddleLib: IRiddleLib,
        poemLib: IPoemLib,
        tropeLib: ITropeLib,
        factLib: IFactLib,
        pictureLib: IPictureLib,
        quizLib: IQuizLib

    ) {
        this.comicLib = comicLib;
        this.jokeLib = jokeLib;
        this.quoteLib = quoteLib;
        this.riddleLib = riddleLib;
        this.poemLib = poemLib;
        this.tropeLib = tropeLib;
        this.factLib = factLib;
        this.pictureLib = pictureLib;
        this.quizLib = quizLib;

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

    public async getTrope(): Promise<Trope> {
        return await this.tropeLib.fetchTrope();
    }

    public async getFact(): Promise<Fact> {
        return await this.factLib.fetchFact();
    }

    public async getPicture(): Promise<Picture> {
        return await this.pictureLib.fetchPicture();
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

    public async getQuiz(): Promise<Quiz> {
        return await this.quizLib.fetchQuiz();
    }
  }
  
  export default MainLib;
  