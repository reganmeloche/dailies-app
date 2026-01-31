import Picture from '../classes/picture';
import logger from '../utils/logger';

export interface IPictureLib {
    fetchPicture(): Promise<Picture | null>;
} 

class PictureLib implements IPictureLib {
    
    public async fetchPicture(): Promise<Picture | null> {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');

        // Wikimedia Featured content endpoint
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

        try {
            const response = await fetch(url, {
                headers: { 'User-Agent': 'DailiesApp/1.0', }
            }); 
            const data = await response.json();

            if (data.image) {
                return new Picture(
                    data.image.description.text,
                    data.image.image.source
                );
            } else {
                throw new Error('No image found in response');
            }
        } catch (error){
            logger.error('Error fetching picture', { error });
            return null;
        }
    }    
}

export default PictureLib;