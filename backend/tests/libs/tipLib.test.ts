import { mock } from 'ts-jest-mocker';
import { ILlmApi } from '../../src/helpers/llmApi';
import TipLib from '../../src/libs/tipLib';
import { sampleTip, sampleTipString } from '../../src/classes/tip';

describe('TipLib Tests', () => {
    let api: jest.Mocked<ILlmApi>;
    let sut: TipLib;

    beforeEach(() => {
        api = mock<ILlmApi>();

        sut = new TipLib(api, [["health"], ["tech"], ["random"]]);
    });

    it('should get tip', async () => {
        const testApiValue = sampleTipString;
        api.query.mockResolvedValue(testApiValue);
        const result = await sut.fetchTips();
        expect(result!.tips.length).toEqual(3);
        expect(result!.tips[0].theme).toEqual('health');
        
        expect(api.query).toHaveBeenCalled();
    });

});