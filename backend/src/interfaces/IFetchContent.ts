import Joke from '../classes/joke';
import Quote from '../classes/quote';
import Fact from '../classes/fact';
import CalvinAndHobbes from '../classes/calvinAndHobbes';
import Riddle from '../classes/riddle';
import Poem from '../classes/poem';
import Trope from '../classes/trope';
import Picture from '../classes/picture';
import Quiz from '../classes/quiz';
import Tip from '../classes/tip';
import Recipe from '../classes/recipe';
import Art from '../classes/art';
import Music from '../classes/music';


export type CacheKey = Joke | Riddle | Poem | Quote | Fact | CalvinAndHobbes | 
    Trope | Picture | Quiz | Tip | Recipe | Art | Music;

export default interface IFetchContent {
    getJoke(): Promise<Joke | null>;
    getQuote(): Promise<Quote | null>;
    getRiddle(): Promise<Riddle | null>;
    getPoem(): Promise<Poem | null>;
    getFact(): Promise<Fact | null>;
    getCalvinAndHobbes(): Promise<CalvinAndHobbes | null>;
    getTrope(): Promise<Trope | null>,
    getPicture(): Promise<Picture | null>,
    getQuiz(): Promise<Quiz | null>,
    getTip(): Promise<Tip | null>,
    getRecipe(): Promise<Recipe | null>;
    getArt(): Promise<Art | null>;
    getMusic(): Promise<Music | null>;
} 