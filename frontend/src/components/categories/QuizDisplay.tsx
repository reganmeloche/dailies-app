import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from '@shared/quiz';

const QuizDisplay: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [visibleAnswers, setVisibleAnswers] = useState<boolean[]>([]);
    const [visibleExplanations, setVisibleExplanations] = useState<boolean[]>([]);

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const toggleExplanation = (index: number) => {
    setVisibleExplanations((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        const fetchQuiz = async () => {
            const response = await axios.get('/api/quiz', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const newQuiz: Quiz = response.data;
            setQuiz(newQuiz);
            setVisibleAnswers(Array(newQuiz.questions.length).fill(false));
            setVisibleExplanations(Array(newQuiz.questions.length).fill(false));
        };
    
        fetchQuiz();  
    }, []);

    if (!quiz) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Quiz: {quiz.title}</h3>
            <div className="list-group">
            {quiz.questions.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p className="fw-bold">{item.question}</p>
                    <div>
                        {visibleAnswers[index] ? (<p className="text-success">Answer: {item.answer}</p>) : 
                            <button className="btn btn-link" onClick={() => toggleAnswer(index)}>Answer</button> }
                    </div>
                    <div>
                        {visibleExplanations[index] ? (<p className="text-muted">Explanation: {item.explanation}</p>) :
                            <button className="btn btn-link" onClick={() => toggleExplanation(index)}>Explanation</button> }
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default QuizDisplay;
