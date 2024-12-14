import Picture from '../classes/picture';
import { INinjaApi } from '../helpers/ninjaApi';
import { IUnsplashApi } from '../helpers/unsplashApi';

export interface IPictureLib {
    fetchPicture(): Promise<Picture>;
} 

class PictureLib implements IPictureLib {
    private api: IUnsplashApi;

    constructor(api:IUnsplashApi) {
        this.api = api;
    }

    public async fetchPicture(): Promise<Picture> {
        const apiResponse = await this.api.getRandomPicture();
        console.log("PIC", apiResponse);
        return apiResponse;
    }    
}

export default PictureLib;