import Trope, { sampleTrope } from '../classes/trope';
import ITropeApi from '../helpers/tropeApi';

export interface ITropeLib {
    fetchTrope(): Promise<Trope>;
} 

class TropeLib implements ITropeLib {
    private api: ITropeApi;

    constructor(api: ITropeApi) {
        this.api = api;
    }

    // Use TV tropes (Needs fixing)
    public async fetchTrope(): Promise<Trope> {
        try {
            return await this.api.getTrope();
        } catch (error) {
            console.error('Error fetching trope:', error);
            return sampleTrope;
        }
    }
}

export default TropeLib;