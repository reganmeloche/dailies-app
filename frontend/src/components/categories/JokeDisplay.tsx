import React, { useState, useEffect } from 'react';
import Joke from '@shared/joke';

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
        <div className="component-container">
            <h3 className="component-title">Joke of the Day</h3>
            <p className="my-label">{joke.question}</p>
            {joke.punchline && <p className="my-description">{joke.punchline}</p>}
        </div>
    );
};

export default JokeDisplay;
