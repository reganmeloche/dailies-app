import { mock } from 'ts-jest-mocker';
import _ from 'lodash';
import MainLib from '../../src/mainLib';
import { IJokeLib } from '../../src/libs/jokeLib';
import { IRiddleLib } from '../../src/libs/riddleLib';
import { IQuoteLib } from '../../src/libs/quoteLib';
import { IPoemLib } from '../../src/libs/poemLib';
import { IComicLib } from '../../src/libs/comicLib';
import { sampleJokes } from '../../src/classes/joke';
import { sampleCalvin } from '../../src/classes/calvinAndHobbes';
import { sampleQuotes } from '../../src/classes/quote';
import { sampleRiddles } from '../../src/classes/riddle';
import { samplePoems } from '../../src/classes/poem';
import { IFactLib } from '../../src/libs/factLib';
import { ITropeLib } from '../../src/libs/tropeLib';

describe('MainLib Tests', () => {
    let comicLib: jest.Mocked<IComicLib>;
    let jokeLib: jest.Mocked<IJokeLib>;
    let quoteLib: jest.Mocked<IQuoteLib>;
    let riddleLib: jest.Mocked<IRiddleLib>;
    let poemLib: jest.Mocked<IPoemLib>;
    let tropeLib: jest.Mocked<ITropeLib>;
    let factLib: jest.Mocked<IFactLib>;
    let sut: MainLib;

    beforeEach(() => {
        comicLib = mock<IComicLib>();
        jokeLib = mock<IJokeLib>();
        quoteLib = mock<IQuoteLib>();
        riddleLib = mock<IRiddleLib>();
        poemLib = mock<IPoemLib>();
        tropeLib = mock<ITropeLib>();
        factLib = mock<IFactLib>();

        sut = new MainLib(
            comicLib, 
            jokeLib, 
            quoteLib, 
            riddleLib, 
            poemLib,
            tropeLib,
            factLib);
    });

    it('should get comics', async () => {
        const testValue = sampleCalvin[0]
        comicLib.fetchComic.mockResolvedValue(testValue);
        const result = await sut.getCalvinAndHobbes();
        expect(_.isEqual(result, testValue)).toBeTruthy();
        expect(comicLib.fetchComic).toHaveBeenCalled();
    });

    it('should get jokes', async () => {
        const testValue = sampleJokes[0]
        jokeLib.fetchJoke.mockResolvedValue(testValue);
        const result = await sut.getJoke();
        expect(_.isEqual(result, testValue)).toBeTruthy();
        expect(jokeLib.fetchJoke).toHaveBeenCalled();
    });

    it('should get quotes', async () => {
        const testValue = sampleQuotes[0]
        quoteLib.fetchQuote.mockResolvedValue(testValue);
        const result = await sut.getQuote();
        expect(_.isEqual(result, testValue)).toBeTruthy();
        expect(quoteLib.fetchQuote).toHaveBeenCalled();
    });

    it('should get riddles', async () => {
        const testValue = sampleRiddles[0]
        riddleLib.fetchRiddle.mockResolvedValue(testValue);
        const result = await sut.getRiddle();
        expect(_.isEqual(result, testValue)).toBeTruthy();
        expect(riddleLib.fetchRiddle).toHaveBeenCalled();
    });

    it('should get poems', async () => {
        const testValue = samplePoems[0]
        poemLib.fetchPoem.mockResolvedValue(testValue);
        const result = await sut.getPoem();
        expect(_.isEqual(result, testValue)).toBeTruthy();
        expect(poemLib.fetchPoem).toHaveBeenCalled();
    });

    it('should get tropes', async () => {
        // const testValue = samplePoems[0]
        // poemLib.fetchPoem.mockResolvedValue(testValue);
        // const result = await sut.getPoem();
        // expect(_.isEqual(result, testValue)).toBeTruthy();
        // expect(poemLib.fetchPoem).toHaveBeenCalled();
    });

    it('should get facts', async () => {
        // const testValue = samplePoems[0]
        // poemLib.fetchPoem.mockResolvedValue(testValue);
        // const result = await sut.getPoem();
        // expect(_.isEqual(result, testValue)).toBeTruthy();
        // expect(poemLib.fetchPoem).toHaveBeenCalled();
    });

    it('should get quiz', async () => {
        // const testValue = samplePoems[0]
        // poemLib.fetchPoem.mockResolvedValue(testValue);
        // const result = await sut.getPoem();
        // expect(_.isEqual(result, testValue)).toBeTruthy();
        // expect(poemLib.fetchPoem).toHaveBeenCalled();
    });
});