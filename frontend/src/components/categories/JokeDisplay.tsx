import React, { useState, useEffect } from 'react';
import Joke from '../../../../shared/classes/joke';
import './JokeDisplay.css';

const JokeDisplay: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);

    useEffect(() => {
        const fetchJoke = async () => {
            const response = await fetch('/api/joke');
            const data = await response.json();
            setJoke(data);
        };
    
        fetchJoke();  
    }, []);

    if (!joke) { return <p>Loading...</p>}
    return (
        <div className="joke-container">
            <h3 className="joke-title">Joke of the Day</h3>
            <p className="joke-question">{joke.question}</p>
            <p className="joke-punchline">{joke.punchline}</p>
        </div>
    );
};

export default JokeDisplay;
