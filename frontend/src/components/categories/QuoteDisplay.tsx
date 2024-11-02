import React, { useState, useEffect } from 'react';
import Quote from '../../../../shared/classes/quote';

const QuoteDisplay: React.FC = () => {
    const [quote, setQuote] = useState<Quote | null>(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const response = await fetch('/api/quote');
            const data = await response.json();
            setQuote(data);
        };
    
        fetchQuote();  
    }, []);

    if (!quote) { return <p>Loading...</p>}
    return (
        <div>
            <h3>Quote</h3>
            <p>{quote.text}</p>
            <p> - {quote.author}</p>
        </div>
    );
};

export default QuoteDisplay;
