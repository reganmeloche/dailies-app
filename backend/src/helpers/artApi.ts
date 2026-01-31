import logger from '../utils/logger';

export interface IArtApi {
    fetchObjectIds(): Promise<number[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchArtObject(id: number): Promise<any>;
} 

// Interface to Met Museum API
export default class ArtApi implements IArtApi {
    private readonly _url: string;

    public constructor() {
        this._url = "https://collectionapi.metmuseum.org/public/collection/v1";
    }

    public async fetchObjectIds(): Promise<number[]> {
        const url = `${this._url}/objects`;
        const response = await fetch(url);
        if (!response.ok) {
            logger.error("Art object ids fetch error");
            return [];
        }

        const data: {
            total: number;
            objectIDs: number[] | null;
        } = await response.json();

        const objectIDs = data.objectIDs || [];
        return objectIDs;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async fetchArtObject(id: number): Promise<any> {
        const url = `${this._url}/objects/${id}`;
        const response = await fetch(url);
        if (!response.ok) return null;
        return response.json();
    }
}