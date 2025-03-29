import { mock } from 'ts-jest-mocker';
import _ from 'lodash';
import PoemLib from '../../src/libs/poemLib';
import { IPoemApi } from '../../src/helpers/poemApi';
import { samplePoems } from '../../src/classes/poem';

describe('PoemLib Tests', () => {
    let api: jest.Mocked<IPoemApi>;
    let sut: PoemLib;

    beforeEach(() => {
        api = mock<IPoemApi>();
        sut = new PoemLib(api);
    });

    it('should get poem', async () => {
        const testApiValue = samplePoems[0];
        api.getDailyPoem.mockResolvedValue(testApiValue);
        const result = await sut.fetchPoem();
        expect(_.isEqual(result, testApiValue)).toBeTruthy();
        expect(api.getDailyPoem).toHaveBeenCalled();
    });

});