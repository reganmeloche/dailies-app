import React, { useState, useEffect } from 'react';
import Art from '@shared/art';

const ArtDisplay: React.FC = () => {
    const [art, setArt] = useState<Art | null>(null);

    useEffect(() => {
        const fetchArt = async () => {
            const response = await fetch('/api/art');
            const data = await response.json();
            setArt(data);
        };
    
        fetchArt();  
    }, []);

    if (!art) { return <p>Loading...</p>}
    return (
        <div className="component-container">
            <h3 className="component-title">Artwork</h3>
            <p className="my-label">{art.name} by {art.artist} ({art.year})</p>
            <div className="my-frame">
                <img src={art.url} alt={art.name} />
            </div>
            <p className="my-description">{art.description}</p>
        </div>
    );
};

export default ArtDisplay;
