import React, { useState, useEffect } from 'react';
import Fact from '@shared/fact';

const FactDisplay: React.FC = () => {
    const [fact, setFact] = useState<Fact | null>(null);

    useEffect(() => {
        const fetchFact = async () => {
            const response = await fetch('/api/fact');
            const data = await response.json();
            setFact(data);
        };
    
        fetchFact();  
    }, []);

    if (!fact) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Fact of the Day</h3>
            {fact.title && <p className="fact-title">{fact.title}</p>}
            {fact.text && <p className="fact-text">{fact.text}</p>}
        </div>
    );
};

export default FactDisplay;
