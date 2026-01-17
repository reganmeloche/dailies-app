import React, { useState, useEffect } from 'react';
import Music from '@shared/music';

const MusicDisplay: React.FC = () => {
    const [music, setMusic] = useState<Music | null>(null);

    useEffect(() => {
            const fetchMusic = async () => {
                const response = await fetch('/api/music');
                const data = await response.json();
                setMusic(data);
            };
        
            fetchMusic();  
        }, []);

    if (!music) { return <p>Loading...</p>}

    return (
        <div className="component-container">
            <h3 className="component-title">Tips</h3>
            <div className="list-group">
            {music.recs.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p>{item.album}</p>
                    <p>{item.artist}</p>
                    <p>{item.genre}</p>
                    <p>{item.year}</p>
                    <p>{item.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default MusicDisplay;
