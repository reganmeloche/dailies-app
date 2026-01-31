import CalvinAndHobbes from '../classes/calvinAndHobbes';
import logger from '../utils/logger';

export interface IComicLib {
    fetchComic(): Promise<CalvinAndHobbes | null>;
} 

class ComicLib implements IComicLib {
    public async fetchComic(): Promise<CalvinAndHobbes | null> {
        logger.warn('Comic API Not implemented');
        return null;
  }
}

export default ComicLib