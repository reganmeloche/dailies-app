import Quiz, { sampleQuiz } from '../classes/quiz';
import { ILlmApi } from '../helpers/llmApi';

export interface IQuizLib {
    fetchQuiz(): Promise<Quiz>;
} 

class QuizLib implements IQuizLib {
    private _llmApi: ILlmApi;
    private _quizTopics: string[];
    
    constructor(llmApi: ILlmApi, quizTopics: string[]) {
        this._llmApi = llmApi;
        this._quizTopics = quizTopics;
    }

    // Fetch a quiz
    public async fetchQuiz(): Promise<Quiz> {
        // Choose randomly from the list of topics
        const randomIndex = Math.floor(Math.random() * this._quizTopics.length);
        const topic = this._quizTopics[randomIndex];

        // Generate the prompt
        const prompt = QuizLib.generatePrompt(topic); 

        try {
            // Run the query against the LLM
            const response = await this._llmApi.query(prompt); 

            // Validation and Deserialization
            const quiz = QuizLib.convertToQuiz(response);

            return quiz;
        } catch (error){
            // TODO: Will be logging this
            console.log('ERROR fetching quiz', error);
            return sampleQuiz;
        }
    }

    // Generate a prompt to create a structured quiz response
    private static generatePrompt(topic:string, numQuestions:number=5, difficulty:string='hard'): string {
        return `
            Generate a quiz with ${numQuestions} short answer questions about the following topic: ${topic}. The format of your result should be an object as follows.
            {{
                "title": "This is the title",
                "questions": [{{"id": 1, "question": "This is the question...", "answer": "answer", "explanation": "this is the explanation"}}, ... ]
            }}
            Each answer should be 1-10 words. Each explanation should be about 3-4 sentences. The difficulty should be ${difficulty}.
        `;
    }

    // Convert the string response from the LLM into a structured quiz
    // TODO: May want to add further validation here...
    private static convertToQuiz(strQuiz: string): Quiz {
        const parsedObject = JSON.parse(strQuiz);
        return parsedObject as Quiz;
    } 
}


export default QuizLib;