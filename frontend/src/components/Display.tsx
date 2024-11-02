import React from 'react';
import JokeDisplay from './categories/JokeDisplay';
import FactDisplay from './categories/FactDisplay';
import QuoteDisplay from './categories/QuoteDisplay';
import CalvinAndHobbesDisplay from './categories/CalvinAndHobbesDisplay';

interface DisplayProps {
    selectedId: number;
}

const Display: React.FC<DisplayProps> = ({ selectedId }) => {
    let content;

    switch (selectedId) {
        case 1:
          content = <JokeDisplay />;
          break;
        case 2:
          content = <FactDisplay />;
          break;
        case 4:
          content = <QuoteDisplay />;
          break;  
        case 7:
          content = <CalvinAndHobbesDisplay />;
          break;
        default:
          content = <div>Select a valid ID</div>;
      }
    
    return (
        <div>
            {content}
        </div>
    );
};

export default Display;
