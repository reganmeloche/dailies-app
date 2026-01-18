import React, { useState, useEffect } from 'react';
import Recipe from '@shared/recipe';

const MusicDisplay: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
            const fetchRecipe = async () => {
                const response = await fetch('/api/recipe');
                const data = await response.json();
                setRecipe(data);
            };
        
            fetchRecipe();  
        }, []);

    if (!recipe) { return <p>Loading...</p>}

    return (
        <div className="component-container">
            <h3 className="component-title">Recipes</h3>
            <div className="list-group">
            {recipe.recipes.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default MusicDisplay;
