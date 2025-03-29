import UnsplashApi from '../../src/helpers/unsplashApi';

// TODO: Will be setting these up as integration tests, with a separate command
describe.skip('Unsplash API Tests', () => {
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