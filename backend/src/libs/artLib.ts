import Art from '../classes/art';

export interface IArtLib {
    fetchArt(): Promise<Art| null>;
} 

class ArtLib implements IArtLib {
    private baseUrl: string;
    private randomCount: number;

    constructor() {
        this.baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
        this.randomCount = 5;
    }

    public async fetchArt(): Promise<Art | null> {
        const objectIds = await this.getObjectIds(this.randomCount);

        // Try each id until we find one with an image
        if (objectIds && objectIds.length > 0) {
            for (let i of objectIds) {
                const art = await this.fetchApiArtById(i);
                if (art && art.primaryImage != "") {
                    return new Art(
                        art.title,
                        art.artistDisplayName,
                        art.medium,
                        art.primaryImage,
                        art.objectDate,
                        art.creditLine
                    );
                }
                console.log('WARNING: Skipping art id', i, ' - No primary image');
            }
            console.log('ERROR fetching art - no images found'); 
        }

        console.log('ERROR fetching art - no ids found');
        return null;
    }

    private async fetchApiArtById(id: number): Promise<any> {
        const url = `${this.baseUrl}/objects/${id}`;
        const response = await fetch(url);
        if (!response.ok) return null;
        return response.json();
    }

    private async getObjectIds(count:number): Promise<number[] | null> {
        const url = `${this.baseUrl}/objects`;
        const response = await fetch(url);
        if (!response.ok) return null;

        const data: {
            total: number;
            objectIDs: number[] | null;
        } = await response.json();

        const objectIDs = data.objectIDs || [];

        const shuffled = [...objectIDs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

export default ArtLib;