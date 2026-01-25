import Quiz from '../classes/quiz';
import { ILlmApi } from '../helpers/llmApi';

export interface IQuizLib {
    fetchQuiz(): Promise<Quiz | null>;
} 

class QuizLib implements IQuizLib {
    private _llmApi: ILlmApi;
    private _quizTopics: string[];
    
    constructor(llmApi: ILlmApi, quizTopics: string[]) {
        this._llmApi = llmApi;
        this._quizTopics = quizTopics;
    }

    public async fetchQuiz(): Promise<Quiz | null> {
        // Choose randomly from the list of topics
        const randomIndex = Math.floor(Math.random() * this._quizTopics.length);
        const topic = this._quizTopics[randomIndex];

        const prompt = QuizLib.generatePrompt(topic); 

        try {
            const response = await this._llmApi.query(prompt); 
            return JSON.parse(response) as Quiz;
        } catch (error){
            console.log('ERROR fetching quiz', error);
            return null;
        }
    }

    // Generate a prompt to create a structured quiz response
    private static generatePrompt(topic:string, numQuestions:number=5, difficulty:string='hard'): string {
        return `
            Generate a quiz with ${numQuestions} short answer questions about the following topic: ${topic}. 
            
            Constraints:
            - Questions should cover a range of subtopics within the topic. Don't pick too many obvious questions - mix it up.
            - Avoid overly obscure or trivial facts; focus on interesting and educational content. Keep it interesting and don't always go for the most obvious facts.
            - Output requirements: Provide only valid JSON. Do not include explanations, markdown, or extra text. 
            - Each answer should be 1-10 words. Each explanation should be about 3-4 sentences. The difficulty should be ${difficulty}.

            Output format: { "title": "", "questions": [{{"id": 1, "question": "", "answer": "", "explanation": ""}}, ... ]}
            
        `;
    }
}

export default QuizLib;