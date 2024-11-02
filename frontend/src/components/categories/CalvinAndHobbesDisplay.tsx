import React, { useState, useEffect } from 'react';
import CalvinAndHobbes from '../../../../shared/classes/calvinAndHobbes';

const CalvinAndHobbesDisplay: React.FC = () => {
    const [comic, setComic] = useState<CalvinAndHobbes | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const response = await fetch('/api/calvin');
            const data = await response.json();
            console.log(data)
            setComic(data);
        };
    
        fetchQuote();  
    }, []);

    if (!comic) { return <p>Loading...</p>}
    return (
        <div>
            <h3>Calvin and Hobbes</h3>
            <img src={comic.urlString}/>
        </div>
    );
};

export default CalvinAndHobbesDisplay;
