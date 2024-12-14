import axios from 'axios';
import Picture from '../../shared/classes/picture';

export interface IUnsplashApi {
    getRandomPicture(): Promise<Picture>;
} 

export default class UnsplashApi implements IUnsplashApi {
    private readonly _url: string;
    private readonly _accessKey: string;

    public constructor(accessKey:string) {
        this._url = "https://api.unsplash.com";
        this._accessKey = accessKey;
    }

    public async getRandomPicture(): Promise<Picture> {
        const params = {
            count: 10,
            topics: 'nature,architeccture',
            client_id: this._accessKey
        };

        const headers = {
            'Accept-Version': 'v1'
        };

        const apiResponse = await axios.get(`${this._url}/photos/random`, {
            params,
            headers
        });
        
        const allPhotos = apiResponse.data;

        const chosenPhoto = this.choosePhoto(allPhotos);

        const title = chosenPhoto['description'];
        const url = chosenPhoto['urls']['raw'];

        return new Picture(title, url);
    }

    // Should move this to pictureLib 
    private choosePhoto(photos: any[]): any {
        const sorted = photos.sort((a, b) => {
            return a['likes'] - b['likes'];
        });

        return sorted[0];
    }
}
