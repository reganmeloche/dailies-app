import React from 'react';
import { Category } from '@shared/category';

interface MenuProps {
    dailyItems: Category[];
    weeklyItems: Category[];
    selected: string | null;
    onItemClick: (itemId: string) => void;
}

const Menu: React.FC<MenuProps> = ({ dailyItems, weeklyItems, selected, onItemClick }) => {
    return (
        <>
        <div className="list-group">
            {dailyItems.map(item => (
            <button
                key={item.id}
                className={`list-group-item list-group-item-action ${selected === item.name ? 'active' : ''}`}
                onClick={() => onItemClick(item.name)}
            >
                {item.name}
            </button>
            ))}
        </div>
        
        <br/>
        
        <div className="list-group">
            {weeklyItems.map(item => (
            <button
                key={item.id}
                className={`list-group-item list-group-item-action ${selected === item.name ? 'active' : ''}`}
                onClick={() => onItemClick(item.name)}
            >
                {item.name}
            </button>
            ))}
        </div>
        </>
    );
};

export default Menu;
