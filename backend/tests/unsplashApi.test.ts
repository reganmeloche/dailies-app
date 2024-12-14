import UnsplashApi from '../src/unsplashApi';

describe('Unsplash API Tests', () => {
    let sut: UnsplashApi;

    beforeEach(() => {
        const accessKey = '';
        sut = new UnsplashApi(accessKey);
    });

    it('should get picture', async () => {
        const result = await sut.getRandomPicture();

        console.log(result);
    });

});