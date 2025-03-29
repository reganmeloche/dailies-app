import { mock } from 'ts-jest-mocker';
import TropeLib from '../../src/libs/tropeLib';
import { ITropeApi  } from '../../src/helpers/tropeApi';
import { sampleTrope } from '../../src/classes/trope';

describe('TropeLib Tests', () => {
    let api: jest.Mocked<ITropeApi>;
    let sut: TropeLib;

    beforeEach(() => {
        api = mock<ITropeApi>();

        sut = new TropeLib(api);
    });

    it('should get fact', async () => {
        const testApiValue = sampleTrope;
        api.getTrope.mockResolvedValue(testApiValue);
        const result = await sut.fetchTrope();
        expect(result.title).toEqual(sampleTrope.title);
        expect(api.getTrope).toHaveBeenCalled();
    });

});