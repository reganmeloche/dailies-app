import Art from '../classes/art';
import { IArtApi } from '../helpers/artApi';
import logger from '../utils/logger';

export interface IArtLib {
    fetchArt(): Promise<Art| null>;
} 

class ArtLib implements IArtLib {
    private _artApi: IArtApi;

    constructor(artApi: IArtApi) {
        this._artApi = artApi;
    }

    public async fetchArt(): Promise<Art | null> {
        // Get the object ids; shuffle and take a small subset of 5
        const objectIds = await this._artApi.fetchObjectIds();
        const shuffled = [...objectIds].sort(() => 0.5 - Math.random());
        const targetIds = shuffled.slice(0, 5);

        // Try each id until we find one with an image
        if (targetIds && targetIds.length > 0) {
            for (let i of targetIds) {
                const obj = await this._artApi.fetchArtObject(i);
                if (obj && obj.primaryImage != "") {
                    return new Art(
                        obj.title,
                        obj.artistDisplayName,
                        obj.medium,
                        obj.primaryImage,
                        obj.objectDate,
                        obj.creditLine
                    );
                }
                logger.warn('Skipping art id %d: No primary image', i);
            }
            logger.error('Error fetching art: no images found'); 
            return null;
        }

        logger.error('Error fetching art: no ids found');
        return null;
    }

}

export default ArtLib;