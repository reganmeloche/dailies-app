import { mock } from 'ts-jest-mocker';
import JokeLib from '../src/libs/jokeLib';
import { INinjaApi } from '../src/helpers/ninjaApi';

describe('JokeLib Tests', () => {
    let api: jest.Mocked<INinjaApi>;
    let sut: JokeLib;

    beforeEach(() => {
        api = mock<INinjaApi>();

        sut = new JokeLib(api);
    });

    it('should get joke', async () => {
        const testApiValue = 
        [
          {
            "joke": "When putting cheese in a mousetrap, always leave room for the mouse."
          }
        ];
        api.fetch.mockResolvedValue(testApiValue);
        const result = await sut.fetchJoke();
        expect(result.question).toEqual('When putting cheese in a mousetrap, always leave room for the mouse.');
        expect(api.fetch).toHaveBeenCalled();
    });

});