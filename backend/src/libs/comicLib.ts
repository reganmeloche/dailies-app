import CalvinAndHobbes from '../classes/calvinAndHobbes';

export interface IComicLib {
    fetchComic(): Promise<CalvinAndHobbes | null>;
} 

class ComicLib implements IComicLib {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://www.gocomics.com/calvinandhobbes';
    }

    public async fetchComic(): Promise<CalvinAndHobbes | null> {
        try {
            // Build the url with current date
            const dateString = this.getDateString();
            const url = this.baseUrl + '/' + dateString;

            return new CalvinAndHobbes("");
        } catch (error) {
            console.error('Error fetching or parsing:', error);
            return null;
        }
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