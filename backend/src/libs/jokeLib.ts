import Joke from '../classes/joke';
import { INinjaApi } from '../helpers/ninjaApi';

export interface IJokeLib {
    fetchJoke(): Promise<Joke>;
} 

class JokeLib implements IJokeLib {
    private api: INinjaApi;

    constructor(api:INinjaApi) {
        this.api = api;
    }

    public async fetchJoke(): Promise<Joke> {
        const apiResponse = await this.api.fetch('jokes');
        return new Joke(apiResponse[0]['joke'], '');
    }
}

export default JokeLib;