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
            <h3 className="component-title">Music Recommendations</h3>
            <div className="music-list">
                {music.recs.map((item, index) => (
                    <div key={index} className="music-item">
                        <p className="my-label">{item.album} - {item.artist}</p>
                        <p className="my-description">{item.genre} • {item.year}</p>
                        {item.description && <p className="my-description">{item.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicDisplay;
