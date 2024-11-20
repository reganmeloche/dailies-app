import Trope from '../../shared/classes/trope';
import ITropeApi from './tropeApi';

export interface ITropeLib {
    fetchTrope(): Promise<Trope>;
} 

class TropeLib implements ITropeLib {
    private api: ITropeApi;

    constructor(api: ITropeApi) {
        this.api = api;
    }
    public async fetchTrope(): Promise<Trope> {
        return await this.api.getTrope();
    }
}

export default TropeLib;