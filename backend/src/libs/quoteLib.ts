import Quote from '../classes/quote';
import { INinjaApi } from '../helpers/ninjaApi';

export interface IQuoteLib {
    fetchQuote(): Promise<Quote | null>;
} 

class QuoteLib implements IQuoteLib {
    private api: INinjaApi;

    constructor(api:INinjaApi) {
        this.api = api;
    }

    public async fetchQuote(): Promise<Quote | null> {
        const apiResponse = await this.api.fetch('quotes');
        return new Quote(
            apiResponse[0]['author'],
            apiResponse[0]['quote']
        )
    }
}

export default QuoteLib;