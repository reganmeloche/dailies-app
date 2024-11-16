import Riddle, { sampleRiddles } from '../../shared/classes/riddle';
import { INinjaApi } from './ninjaApi';

export interface IRiddleLib {
    fetchRiddle(): Promise<Riddle>;
} 

class RiddleLib implements IRiddleLib {
    private api: INinjaApi;

    constructor(api:INinjaApi) {
        this.api = api;
    }

    public async fetchRiddle(): Promise<Riddle> {
        const apiResponse = await this.api.fetch('riddles');
        return new Riddle(
            apiResponse[0]['title'],
            apiResponse[0]['question'],
            apiResponse[0]['answer']
        );
    }
}

export default RiddleLib;