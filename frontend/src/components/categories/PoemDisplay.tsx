import React, { useState, useEffect } from 'react';
import Poem from '../../../../shared/classes/poem';
import './PoemDisplay.css';

const PoemDisplay: React.FC = () => {
    const [poem, setPoem] = useState<Poem | null>(null);

    useEffect(() => {
        const fetchPoem = async () => {
            const response = await fetch('/api/poem');
            const data = await response.json();
            setPoem(data);
        };
    
        fetchPoem();  
    }, []);

    if (!poem) { return <p>Loading...</p>}
    return (
        <div className="poem-container">
            <h3 className="poem-title">Poem</h3>
            
            <div className="poem-meta">
                <p className="poem-meta-item"><strong>Title:</strong> {poem.title}</p>
                <p className="poem-meta-item"><strong>Author:</strong> {poem.author}</p>
            </div>
            
            <div className="poem-stanzas">
                {poem.stanzas.map((stanza, stanza_i) => (
                <div key={stanza_i} className="stanza">
                    {stanza.lines.map((line, line_i) => (
                    <p key={`${stanza_i}-${line_i}`} className="stanza-line">{line}</p>
                    ))}
                    <br />
                </div>
                ))}
            </div>
        </div>
    );
};

export default PoemDisplay;
