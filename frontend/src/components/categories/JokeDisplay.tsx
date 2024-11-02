import React, { useState, useEffect } from 'react';
import Joke from '../../../../shared/classes/joke';

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
        <div>
            <h3>Joke</h3>
            <p>{joke.question}</p>
            <p>{joke.punchline}</p>
        </div>
    );
};

export default JokeDisplay;
