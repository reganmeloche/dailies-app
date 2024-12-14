import Joke from '../../../shared/classes/joke';
import Quote from '../../../shared/classes/quote';
import Fact from '../../../shared/classes/fact';
import CalvinAndHobbes from '../../../shared/classes/calvinAndHobbes';
import Riddle from '../../../shared/classes/riddle';
import Poem from '../../../shared/classes/poem';
import Trope from '../../../shared/classes/trope';
import Picture from '../../../shared/classes/picture';

export type CacheKey = Joke | Riddle | Poem | Quote | Fact | CalvinAndHobbes | Trope | Picture;

export default interface IMainLib {
    getJoke(): Promise<Joke>;
    getQuote(): Promise<Quote>;
    getRiddle(): Promise<Riddle>;
    getPoem(): Promise<Poem>;
    getFact(): Promise<Fact>;
    getCalvinAndHobbes(): Promise<CalvinAndHobbes>;
    getTrope(): Promise<Trope>,
    getPicture(): Promise<Picture>,
} 