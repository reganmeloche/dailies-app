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
            {fact.title && <p className="my-label">{fact.title}</p>}
            {fact.text && <p className="my-description">{fact.text}</p>}
        </div>
    );
};

export default FactDisplay;
