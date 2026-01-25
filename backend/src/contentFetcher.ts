import Joke from './classes/joke';
import Quote from './classes/quote';
import Fact from './classes/fact';
import CalvinAndHobbes from './classes/calvinAndHobbes';
import Trope from './classes/trope';
import Riddle from './classes/riddle';
import Poem from './classes/poem';
import Picture from './classes/picture';
import Quiz from './classes/quiz';
import Tip from './classes/tip';
import Recipe from './classes/recipe';
import Art from './classes/art';
import Music from './classes/music';

import { IComicLib } from './libs/comicLib';
import { IJokeLib } from './libs/jokeLib';
import { IQuoteLib } from './libs/quoteLib';
import { IRiddleLib } from './libs/riddleLib';
import { IPoemLib } from './libs/poemLib';
import { ITropeLib } from './libs/tropeLib';
import { IFactLib } from './libs/factLib';
import { IPictureLib } from './libs/pictureLib';
import { IQuizLib } from './libs/quizLib';
import { ITipLib } from './libs/tipLib';
import { IRecipeLib } from './libs/recipeLib';
import { IArtLib } from './libs/artLib';
import { IMusicLib } from './libs/musicLib';

import IFetchContent from './interfaces/IFetchContent';

// Class for fetching original content from various libraries
class ContentFetcher implements IFetchContent {
    private comicLib: IComicLib;
    private jokeLib: IJokeLib;
    private quoteLib: IQuoteLib;
    private riddleLib: IRiddleLib;
    private poemLib: IPoemLib;
    private tropeLib: ITropeLib;
    private factLib: IFactLib;
    private pictureLib: IPictureLib;
    private quizLib: IQuizLib;
    private tipLib: ITipLib;
    private recipeLib: IRecipeLib;
    private artLib: IArtLib;
    private musicLib: IMusicLib;


    constructor(
        comicLib: IComicLib,
        jokeLib: IJokeLib,
        quoteLib: IQuoteLib,
        riddleLib: IRiddleLib,
        poemLib: IPoemLib,
        tropeLib: ITropeLib,
        factLib: IFactLib,
        pictureLib: IPictureLib,
        quizLib: IQuizLib,
        tipLib: ITipLib,
        recipeLib: IRecipeLib,
        artLib: IArtLib,
        musicLib: IMusicLib,
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
        this.tipLib = tipLib;
        this.recipeLib = recipeLib;
        this.artLib = artLib;
        this.musicLib = musicLib;
    }

    public async getRecipe() : Promise<Recipe | null> {
        return await this.recipeLib.fetchRecipe();
    }

    public async getArt() : Promise<Art | null> {
        return await this.artLib.fetchArt();
    }

    public async getMusic() : Promise<Music | null> {
        return await this.musicLib.fetchMusic();
    }
  
    public async getJoke(): Promise<Joke | null> {
        return await this.jokeLib.fetchJoke();
    }

    public async getQuote(): Promise<Quote | null> {
        return await this.quoteLib.fetchQuote();
    }

    public async getRiddle(): Promise<Riddle | null> {
        return await this.riddleLib.fetchRiddle();
    }

    public async getPoem(): Promise<Poem | null> {
        return await this.poemLib.fetchPoem();
    }

    public async getTrope(): Promise<Trope | null> {
        return await this.tropeLib.fetchTrope();
    }

    public async getFact(): Promise<Fact | null> {
        return await this.factLib.fetchFact();
    }

    public async getPicture(): Promise<Picture | null> {
        return await this.pictureLib.fetchPicture();
    }

    public async getCalvinAndHobbes(): Promise<CalvinAndHobbes | null> {
        return await this.comicLib.fetchComic();
    }

    public async getQuiz(): Promise<Quiz | null> {
        return await this.quizLib.fetchQuiz();
    }

    public async getTip(): Promise<Tip | null> {
        return await this.tipLib.fetchTips();
    }
  }
  
  export default ContentFetcher;
  