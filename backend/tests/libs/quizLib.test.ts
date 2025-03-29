import { mock } from 'ts-jest-mocker';
import { ILlmApi } from '../../src/helpers/llmApi';
import QuizLib from '../../src/libs/quizLib';
import { sampleQuiz, sampleQuizString } from '../../src/classes/quiz';

describe('QuizLib Tests', () => {
    let api: jest.Mocked<ILlmApi>;
    let sut: QuizLib;

    beforeEach(() => {
        api = mock<ILlmApi>();

        sut = new QuizLib(api, ['Test']);
    });

    it('should get quiz', async () => {
        const testApiValue = sampleQuizString;
        api.query.mockResolvedValue(testApiValue);
        const result = await sut.fetchQuiz();
        expect(result.title).toEqual('ACID Databases Quiz');
        expect(result.questions.length).toEqual(5);
        expect(result.questions[0].id).toEqual(1);
        expect(result.questions[3].answer).toEqual('Durability');
        
        expect(api.query).toHaveBeenCalled();
    });

});