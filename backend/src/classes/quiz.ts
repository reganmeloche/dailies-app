class QuizQuestion {
    public question: string;
    public answer: string;
    public explanation: string;
    public id: number;

    constructor(id:number, question:string, answer:string, explanation:string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
    }
}

class Quiz {
    public title: string;
    public questions: QuizQuestion[];
  
    constructor(title: string, questions: QuizQuestion[]) {
      this.title = title;
      this.questions = questions;
    }
}

export const sampleQuiz: Quiz = new Quiz(
    'Sample Quiz', 
    [
        new QuizQuestion(1, 'What is the term for a unit of energy in food?', 'Calorie', 'A calorie is a measurement of energy produced by food when metabolized by the body.'),
        new QuizQuestion(1, 'Which nutrient is important for building and repairing tissues?', 'Protein', 'Proteins are essential for the growth, repair, and maintenance of body tissues and organs.'),
        new QuizQuestion(1, 'What is the main function of Vitamin C in the body?', 'Immune support', 'Vitamin C is important for the proper functioning of the immune system and helps in the repair and growth of tissues.'),
        new QuizQuestion(1, 'What is the recommended daily intake of water for adults?', '8 cups', 'It is generally recommended that adults drink at least 8 cups of water per day to stay hydrated and maintain proper bodily functions.'),
        new QuizQuestion(1, 'Which type of fat is considered the healthiest for the heart?', 'Monounsaturated fat', 'Monounsaturated fats are good for heart health as they can help lower bad cholesterol levels in the blood.'),
    ]
);

export const sampleQuizString: string = `
{
    "title": "ACID Databases Quiz",
    "questions": [
        {
            "id": 1,
            "question": "What does the 'I' stand for in ACID databases?",
            "answer": "Isolation",
            "explanation": "Isolation ensures that transactions are independent of each other, preventing interference."
        },
        {
            "id": 2,
            "question": "What principle does the 'A' represent in ACID databases?",
            "answer": "Atomicity",
            "explanation": "Atomicity ensures that each transaction is treated as a single unit, either fully completed or fully rolled back."
        },
        {
            "id": 3,
            "question": "What is guaranteed by the 'C' in ACID databases?",
            "answer": "Consistency",
            "explanation": "Consistency ensures that the database remains in a valid state before and after a transaction."
        },
        {
            "id": 4,
            "question": "What does the 'D' signify in ACID databases?",
            "answer": "Durability",
            "explanation": "Durability ensures that once a transaction is committed, it will persist even in the face of failures."
        },
        {
            "id": 5,
            "question": "Why are ACID properties crucial in database transactions?",
            "answer": "To maintain data integrity and reliability.",
            "explanation": "ACID properties help ensure that database transactions are executed reliably and consistently, preventing data corruption or loss."
        }
    ]
}
`;

export default Quiz;