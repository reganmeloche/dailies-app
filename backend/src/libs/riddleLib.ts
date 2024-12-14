import Riddle from '../classes/riddle';
import { INinjaApi } from '../helpers/ninjaApi';

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