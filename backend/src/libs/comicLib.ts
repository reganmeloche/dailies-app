import CalvinAndHobbes, { sampleComic } from '../classes/calvinAndHobbes';

export interface IComicLib {
    fetchComic(): Promise<CalvinAndHobbes>;
} 

class ComicLib implements IComicLib {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://www.gocomics.com/calvinandhobbes';
    }

    public async fetchComic(): Promise<CalvinAndHobbes> {
        console.error('Error fetching or parsing comic - Not implemented');
        return sampleComic;
  }

    private getDateString(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
}

export default ComicLib