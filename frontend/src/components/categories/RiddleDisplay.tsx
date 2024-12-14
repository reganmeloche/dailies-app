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
        <div className="component-container">
            <h3 className="component-title">Riddle of the Day</h3>
            {riddle.title && <p className="riddle-title">{riddle.title}</p>}
            {riddle.question && <p className="riddle-question">{riddle.question}</p>}
            {riddle.answer && <p className="riddle-question">{riddle.answer}</p>}
        </div>
    );
};

export default RiddleDisplay;
