import { mock } from 'ts-jest-mocker';
import FactLib from '../../src/libs/factLib';
import { INinjaApi } from '../../src/helpers/ninjaApi';

describe('FactLib Tests', () => {
    let api: jest.Mocked<INinjaApi>;
    let sut: FactLib;

    beforeEach(() => {
        api = mock<INinjaApi>();

        sut = new FactLib(api);
    });

    it('should get fact', async () => {
        const testApiValue = 
        [
          {
            "fact": "After the Eiffel Tower was built, one person was killed during the installation of the lifts. No one was killed during the actual construction of the tower"
          }
        ];
        api.fetch.mockResolvedValue(testApiValue);
        const result = await sut.fetchFact();
        expect(result.text).toEqual('After the Eiffel Tower was built, one person was killed during the installation of the lifts. No one was killed during the actual construction of the tower');
        expect(api.fetch).toHaveBeenCalled();
    });

});