import { mock } from 'ts-jest-mocker';
import CacheLib from '../src/cacheLib';
import IMainLib from '../src/interfaces/IMainLib';
import Joke from '../../shared/classes/joke';
import { CategoryEnum } from '../src/initialCategories';

describe('CacheLib Tests', () => {
    let mainLib: jest.Mocked<IMainLib>;
    let sut: CacheLib;

    beforeEach(() => {
        mainLib = mock<IMainLib>();
        sut = new CacheLib(mainLib);
    });

    it('should not use the cache', async () => {
        mainLib.getJoke.mockResolvedValue(new Joke('a', 'b'));
        const result: Joke = await sut.get(CategoryEnum.JOKE) as Joke;
        expect(result.punchline).toEqual('b');
        expect(mainLib.getJoke).toHaveBeenCalled();
    });

    it('should not use the cache on first try', async () => {
        mainLib.getJoke.mockResolvedValue(new Joke('a', 'b'));
        const result: Joke = await sut.get(CategoryEnum.JOKE) as Joke;
        expect(result.punchline).toEqual('b');
        expect(mainLib.getJoke).toHaveBeenCalled();
    });

    it('should use the cache on second try', async () => {
        mainLib.getJoke.mockResolvedValue(new Joke('a', 'b'));
        await sut.get(CategoryEnum.JOKE);
        const result2: Joke = await sut.get(CategoryEnum.JOKE) as Joke;
        expect(result2.punchline).toEqual('b');
        expect(mainLib.getJoke).toHaveBeenCalledTimes(1);
    });

    it('should skip cache when forced', async () => {
        mainLib.getJoke.mockResolvedValue(new Joke('a', 'b'));
        await sut.get(CategoryEnum.JOKE);
        const result2: Joke = await sut.get(CategoryEnum.JOKE, true) as Joke;
        expect(result2.punchline).toEqual('b');
        expect(mainLib.getJoke).toHaveBeenCalledTimes(2);
    });
});