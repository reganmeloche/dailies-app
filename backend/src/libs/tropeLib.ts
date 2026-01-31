import Trope from '../classes/trope';
import logger from '../utils/logger';

export interface ITropeLib {
    fetchTrope(): Promise<Trope | null>;
} 

class TropeLib implements ITropeLib {
    public async fetchTrope(): Promise<Trope | null> {
        logger.warn('Trope API not implemented');
        return null;
    }
}

export default TropeLib;