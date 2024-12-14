import { mock } from 'ts-jest-mocker';
import RiddleLib from '../src/libs/riddleLib';
import { INinjaApi } from '../src/helpers/ninjaApi';

describe('RiddleLib Tests', () => {
    let api: jest.Mocked<INinjaApi>;
    let sut: RiddleLib;

    beforeEach(() => {
        api = mock<INinjaApi>();

        sut = new RiddleLib(api);
    });

    it('should get riddle', async () => {
        const testApiValue = 
        [
          {
            "title": "What Is It",
            "question": "what is naked in the winter and dressed at summer and keeps on repeating this pattern?",
            "answer": "a tree"
          }
        ];
        api.fetch.mockResolvedValue(testApiValue);
        const result = await sut.fetchRiddle();
        expect(result.answer).toEqual('a tree')
        expect(api.fetch).toHaveBeenCalled();
    });

});