import React, { useState, useEffect } from 'react';
import Tip from '@shared/tip';

const TipDisplay: React.FC = () => {
    const [tip, setTip] = useState<Tip | null>(null);

    useEffect(() => {
        const fetchTip = async () => {
            const response = await fetch('/api/tip');
            const data = await response.json();
            setTip(data);
        };
    
        fetchTip();  
    }, []);

    if (!tip) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Daily Tips</h3>
            <div className="list-group">
            {tip.tips.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p className="my-label">{item.theme}</p>
                    <div>
                        <p className="my-description">{item.text}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default TipDisplay;
