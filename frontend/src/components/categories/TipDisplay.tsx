import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tip from '@shared/tip';

const TipDisplay: React.FC = () => {
    const [tip, setTip] = useState<Tip | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        const fetchTip = async () => {
            const response = await axios.get('/api/tip', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const newTip: Tip = response.data;
            setTip(newTip);
        };
    
        fetchTip();  
    }, []);

    if (!tip) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Tips</h3>
            <div className="list-group">
            {tip.tips.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p className="fw-bold">{item.theme}</p>
                    <div>
                        <p className="text-success">{item.text}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default TipDisplay;
