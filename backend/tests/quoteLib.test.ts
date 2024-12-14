import { mock } from 'ts-jest-mocker';
import QuoteLib from '../src/libs/quoteLib';
import { INinjaApi } from '../src/helpers/ninjaApi';

describe('QuoteLib Tests', () => {
    let api: jest.Mocked<INinjaApi>;
    let sut: QuoteLib;

    beforeEach(() => {
        api = mock<INinjaApi>();

        sut = new QuoteLib(api);
    });

    it('should get quote', async () => {
        const testApiValue = 
        [
          {
            "quote": "The will of man is his happiness.",
            "author": "Friedrich Schiller",
            "category": "happiness"
          }
        ];
        api.fetch.mockResolvedValue(testApiValue);
        const result = await sut.fetchQuote();
        expect(result.author).toEqual('Friedrich Schiller')
        expect(api.fetch).toHaveBeenCalled();
    });

});