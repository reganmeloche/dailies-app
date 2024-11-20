import React, { useState, useEffect } from 'react';
import Trope from '../../../../shared/classes/trope';
//import './TropeDisplay.css';

const TropeDisplay: React.FC = () => {
    const [trope, setTrope] = useState<Trope | null>(null);

    useEffect(() => {
        const fetchTrope = async () => {
            const response = await fetch('/api/trope');
            const data = await response.json();
            setTrope(data);
        };
    
        fetchTrope();  
    }, []);

    if (!trope) { return <p>Loading...</p>}
    return (
        <div className="trope-container">
            <h3 className="trope-title">{trope.title}</h3>
            <div>
                {trope.text.map((p, i) => (
                    <p key={i} className="trope-line">{p}</p>
                ))}
            </div>

            <p className="trope-link">{trope.link}</p>
            <img src={trope.pictureUrl} />
        </div>
    );
};

export default TropeDisplay;
