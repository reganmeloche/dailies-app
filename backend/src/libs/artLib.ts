import Art, { sampleArt } from '../classes/art';

export interface IArtLib {
    fetchArt(): Promise<Art>;
} 

class ArtLib implements IArtLib {
    // TODO: Use the metmuseum API?
    public async fetchArt(): Promise<Art> {
        console.log('ERROR fetching art - Not implemented');
        return sampleArt;
    }
}

export default ArtLib;