import { mock } from 'ts-jest-mocker';
import _ from 'lodash';
import PoemLib from '../../src/libs/poemLib';
import { IPoemApi } from '../../src/helpers/poemApi';

describe('PoemLib Tests', () => {
    let api: jest.Mocked<IPoemApi>;
    let sut: PoemLib;

    beforeEach(() => {
        api = mock<IPoemApi>();
        sut = new PoemLib(api);
    });

    it('null api result -> null', async () => {
        api.fetchRandomPoems.mockResolvedValue(null);
        const result = await sut.fetchPoem();
        expect(result).toBeNull();
    });

    it('empty api result -> null', async () => {
        api.fetchRandomPoems.mockResolvedValue([]);
        const result = await sut.fetchPoem();
        expect(result).toBeNull();
    });

    it('Success', async () => {
        const apiPoems = [
            {
                "title": "Autumn",
                "author": "John Clare",
                "lines": [ 
                    "Syren of sullen moods and fading hues,",
                    "Yet haply not incapable of joy,"
                ]
            }  
        ];

        api.fetchRandomPoems.mockResolvedValue(apiPoems);
        const result = await sut.fetchPoem();
        expect(result?.author).toEqual("John Clare");
    });
});