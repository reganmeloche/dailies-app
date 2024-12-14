import React, { useState, useEffect } from 'react';
import Trope from '../../../../backend/src/classes/trope';
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
        <div className="component-container">
            <h3 className="component-title">Trope of the Day</h3>
            <a className="trope-title" href={trope.link} target="_blank">{trope.title}</a>
            <div>
                {trope.text.map((p, i) => (
                    <p key={i} className="trope-line">{p}</p>
                ))}
            </div>
            <img src={trope.pictureUrl} />
        </div>

    );
};

export default TropeDisplay;
