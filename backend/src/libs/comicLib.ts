import CalvinAndHobbes from '../classes/calvinAndHobbes';

export interface IComicLib {
    fetchComic(): Promise<CalvinAndHobbes | null>;
} 

class ComicLib implements IComicLib {
    public async fetchComic(): Promise<CalvinAndHobbes | null> {
        console.error('Error fetching or parsing comic - Not implemented');
        return null;
  }
}

export default ComicLib