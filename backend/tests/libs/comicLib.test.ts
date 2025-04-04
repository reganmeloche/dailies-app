import ComicLib from '../../src/libs/comicLib';

describe('ComicLib Tests', () => {
    let sut: ComicLib;

    beforeEach(() => {
        sut = new ComicLib();
    });

    it('should get comic', async () => {
        const result = await sut.fetchComic();
        expect(result?.urlString).toBeDefined();
    });
});