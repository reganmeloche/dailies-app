import React, { useState, useEffect } from 'react';
import Riddle from '../../../../shared/classes/riddle';

const RiddleDisplay: React.FC = () => {
    const [riddle, setRiddle] = useState<Riddle | null>(null);

    useEffect(() => {
        const fetchRiddle = async () => {
            const response = await fetch('/api/riddle');
            const data = await response.json();
            setRiddle(data);
        };
    
        fetchRiddle();  
    }, []);

    if (!riddle) { return <p>Loading...</p>}
    return (
        <div>
            <h3>Riddle</h3>
            <p>{riddle.question}</p>
            <p>{riddle.answer}</p>
        </div>
    );
};

export default RiddleDisplay;
