import Joke from '../../../shared/classes/joke';
import Quote from '../../../shared/classes/quote';
import Fact from '../../../shared/classes/fact';
import CalvinAndHobbes from '../../../shared/classes/calvinAndHobbes';
import Riddle from '../../../shared/classes/riddle';
import Poem from '../../../shared/classes/poem';

export type CacheKey = Joke | Riddle | Poem | Quote | Fact | CalvinAndHobbes;

export default interface IMainLib {
    getJoke(): Promise<Joke>;
    getQuote(): Promise<Quote>;
    getRiddle(): Promise<Riddle>;
    getPoem(): Promise<Poem>;
    getFact(): Promise<Fact>;
    getCalvinAndHobbes(): Promise<CalvinAndHobbes>;
} 