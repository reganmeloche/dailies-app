import React, { useState, useEffect } from 'react';
import Picture from '../../../../backend/src/classes/picture';

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
            <p className="picture-title">{picture.title}</p>
            <img src={picture.url} width="400px"/>
        </div>
    );
};

export default PictureDisplay;
