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
            
            <figure className="art-figure">
                <img
                    src={art.url}
                    alt={`${art.name} by ${art.artist}`}
                    className="art-image"
                />

                <figcaption className="art-caption">
                    <h4 className="art-name">{art.name}</h4>
                    <p><strong>Artist:</strong> {art.artist}</p>
                    <p><strong>Type:</strong> {art.type}</p>
                    <p><strong>Year:</strong> {art.year}</p>

                    <p className="art-description">
                        {art.description}
                    </p>
                </figcaption>
            </figure> 
        </div>
    );
};

export default ArtDisplay;
