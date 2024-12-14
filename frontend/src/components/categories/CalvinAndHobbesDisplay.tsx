import React, { useState, useEffect } from 'react';
import CalvinAndHobbes from '../../../../backend/src/classes/calvinAndHobbes';

const CalvinAndHobbesDisplay: React.FC = () => {
    const [comic, setComic] = useState<CalvinAndHobbes | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const response = await fetch('/api/comic');
            const data = await response.json();
            console.log(data)
            setComic(data);
        };
    
        fetchQuote();  
    }, []);

    if (!comic) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Calvin and Hobbes</h3>
            <img src={comic.urlString}/>
        </div>
    );
};

export default CalvinAndHobbesDisplay;
