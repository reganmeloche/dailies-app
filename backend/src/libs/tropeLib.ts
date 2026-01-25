import Trope from '../classes/trope';
import ITropeApi from '../helpers/tropeApi';

export interface ITropeLib {
    fetchTrope(): Promise<Trope | null>;
} 

class TropeLib implements ITropeLib {
    private api: ITropeApi;

    constructor(api: ITropeApi) {
        this.api = api;
    }

    // Use TV tropes (Needs fixing)
    public async fetchTrope(): Promise<Trope | null> {
        console.error('Error fetching or parsing trope - Not implemented');
        return null;
    }
}

export default TropeLib;