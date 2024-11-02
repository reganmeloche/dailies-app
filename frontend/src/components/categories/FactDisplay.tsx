import React, { useState, useEffect } from 'react';
import Fact from '../../../../shared/classes/fact';

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
        <div>
            <h3>Fact</h3>
            <p>{fact.title}</p>
            <p>{fact.text}</p>
        </div>
    );
};

export default FactDisplay;
