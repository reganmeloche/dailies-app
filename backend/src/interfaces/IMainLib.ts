import Joke from '../classes/joke';
import Quote from '../classes/quote';
import Fact from '../classes/fact';
import CalvinAndHobbes from '../classes/calvinAndHobbes';
import Riddle from '../classes/riddle';
import Poem from '../classes/poem';
import Trope from '../classes/trope';
import Picture from '../classes/picture';
import Quiz from '../classes/quiz';

export type CacheKey = Joke | Riddle | Poem | Quote | Fact | CalvinAndHobbes | Trope | Picture | Quiz;

export default interface IMainLib {
    getJoke(): Promise<Joke>;
    getQuote(): Promise<Quote>;
    getRiddle(): Promise<Riddle>;
    getPoem(): Promise<Poem>;
    getFact(): Promise<Fact>;
    getCalvinAndHobbes(): Promise<CalvinAndHobbes>;
    getTrope(): Promise<Trope>,
    getPicture(): Promise<Picture>,
    getQuiz(): Promise<Quiz>,
} 