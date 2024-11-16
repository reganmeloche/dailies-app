import Quote from '../../shared/classes/quote';
import { INinjaApi } from './ninjaApi';

export interface IQuoteLib {
    fetchQuote(): Promise<Quote>;
} 

class QuoteLib implements IQuoteLib {
    private api: INinjaApi;

    constructor(api:INinjaApi) {
        this.api = api;
    }

    public async fetchQuote(): Promise<Quote> {
        const apiResponse = await this.api.fetch('quotes');
        return new Quote(
            apiResponse[0]['author'],
            apiResponse[0]['quote']
        )
    }
}

export default QuoteLib;