import Fact from '../../shared/classes/fact';
import { INinjaApi } from './ninjaApi';

export interface IFactLib {
    fetchFact(): Promise<Fact>;
} 

class FactLib implements IFactLib {
    private api: INinjaApi;

    constructor(api:INinjaApi) {
        this.api = api;
    }

    public async fetchFact(): Promise<Fact> {
        const apiResponse = await this.api.fetch('facts');
        return new Fact('',apiResponse[0]['fact']);
    }
}

export default FactLib;