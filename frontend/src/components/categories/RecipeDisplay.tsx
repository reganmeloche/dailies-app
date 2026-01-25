import React, { useState, useEffect } from 'react';
import Recipe from '@shared/recipe';

const RecipeDisplay: React.FC = () => {
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
            <h3 className="component-title">Recipe Ideas</h3>
            <div className="list-group">
            {recipe.recipes.map((item, index) => (
                <div key={index} className="list-group-item">
                    <p className="my-label">{item.name}</p>
                    <p className="my-description">{item.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default RecipeDisplay;
