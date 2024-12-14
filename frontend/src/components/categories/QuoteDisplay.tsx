import React, { useState, useEffect } from 'react';
import Quote from '../../../../backend/src/classes/quote';

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
        <div className="component-container">
            <h3 className="component-title">Quote of the Day</h3>
            {quote.text && <p className="quote-text">{quote.text}</p>}
            {quote.author && <p className="quote-author">- {quote.author}</p>}
        </div>
    );
};

export default QuoteDisplay;
