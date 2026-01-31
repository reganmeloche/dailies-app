import { mock } from 'ts-jest-mocker';
import MusicLib from '../../src/libs/musicLib';
import { sampleMusicString } from '../../src/classes/music';
import { ILlmApi } from '../../src/helpers/llmApi';

describe('MusicLib Tests', () => {
    let api: jest.Mocked<ILlmApi>;
    let sut: MusicLib;

    beforeEach(() => {
        api = mock<ILlmApi>();
        sut = new MusicLib(api, []);
    });

    it('should get music', async () => {
        api.query.mockResolvedValue(sampleMusicString);
        const result = await sut.fetchMusic();
        expect(result?.recs[0].album).toEqual('Abbey Road');
    });
});