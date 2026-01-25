import React, { useState, useEffect } from 'react';
import Picture from '@shared/picture';

const PictureDisplay: React.FC = () => {
    const [picture, setPicture] = useState<Picture | null>(null);

    useEffect(() => {
        const fetchPicture = async () => {
            const response = await fetch('/api/picture');
            const data = await response.json();
            setPicture(data);
        };
    
        fetchPicture();  
    }, []);

    if (!picture) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Picture of the Day</h3>
            <p className="my-label">{picture.title}</p>
            <div className="my-frame">
                <img src={picture.url} alt={picture.title} />
            </div>
        </div>
    );
};

export default PictureDisplay;
