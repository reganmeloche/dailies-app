import React from 'react';
import './Display.css';
import JokeDisplay from './categories/JokeDisplay';
import FactDisplay from './categories/FactDisplay';
import QuoteDisplay from './categories/QuoteDisplay';
import CalvinAndHobbesDisplay from './categories/CalvinAndHobbesDisplay';
import TropeDisplay from './categories/TropeDisplay';
import RiddleDisplay from './categories/RiddleDisplay';
import PoemDisplay from './categories/PoemDisplay';
import PictureDisplay from './categories/PictureDisplay';
import QuizDisplay from './categories/QuizDisplay';
import TipDisplay from './categories/TipDisplay';
import RecipeDisplay from './categories/RecipeDisplay';
import MusicDisplay from './categories/MusicDisplay';
import ArtDisplay from './categories/ArtDisplay';
//... import other category components as needed

interface DisplayProps {
    selected: string;
}

const displayMap: Record<string, JSX.Element> = {
    joke: <JokeDisplay />,
    fact: <FactDisplay />,
    riddle: <RiddleDisplay />,
    quote: <QuoteDisplay />,
    poem: <PoemDisplay />,
    picture: <PictureDisplay />,
    comic: <CalvinAndHobbesDisplay />,
    trope: <TropeDisplay />,
    quiz: <QuizDisplay/>,
    tip: <TipDisplay/>,
    recipe: <RecipeDisplay/>,
    music: <MusicDisplay/>,
    art: <ArtDisplay/>,
    //...
};

const Display: React.FC<DisplayProps> = ({ selected }) => {
    let content = displayMap[selected] || null;

    if (!content) {
        content = <div>Select a valid category</div>;
    }

    return (
        <div>{content}</div>
    );
};

export default Display;
