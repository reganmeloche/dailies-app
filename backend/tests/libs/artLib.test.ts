import { mock } from 'ts-jest-mocker';
import ArtLib from '../../src/libs/artLib';
import { IArtApi } from '../../src/helpers/artApi';

describe('ArtLib Tests', () => {
    let api: jest.Mocked<IArtApi>;
    let sut: ArtLib;

    beforeEach(() => {
        api = mock<IArtApi>();
        sut = new ArtLib(api);
    });

    it('no object ids -> null', async () => {
        api.fetchObjectIds.mockResolvedValue([]);

        const result = await sut.fetchArt();

        expect(result).toBeNull();
        expect(api.fetchArtObject).toHaveBeenCalledTimes(0);
    });

    it('no images found -> null', async () => {
        const testApiArt = {
          "primaryImage": ""
        };
        api.fetchObjectIds.mockResolvedValue([1]);
        api.fetchArtObject.mockResolvedValue(testApiArt);

        const result = await sut.fetchArt();
        
        expect(result).toBeNull();
        expect(api.fetchArtObject).toHaveBeenCalledTimes(1);
    });

    it('Success', async () => {
        const testApiArt = {
          "title": "test art",
          "primaryImage": "test.jpg"
        };
        api.fetchObjectIds.mockResolvedValue([1]);
        api.fetchArtObject.mockResolvedValue(testApiArt);

        const result = await sut.fetchArt();
        
        expect(result?.name).toEqual("test art");
    });
});