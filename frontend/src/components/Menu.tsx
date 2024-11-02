import React from 'react';
import { Category } from '../../../shared/classes/category';

interface MenuProps {
    items: Category[];
    selectedId: number | null;
    onItemClick: (itemId: number) => void;
}


const Menu: React.FC<MenuProps> = ({ items, selectedId, onItemClick }) => {
    return (
        <div className="list-group">
            {items.map(item => (
            <button
                key={item.id}
                className={`list-group-item list-group-item-action ${selectedId === item.id ? 'active' : ''}`}
                onClick={() => onItemClick(item.id)}
            >
                {item.name}
            </button>
            ))}
        </div>
    );
};

export default Menu;
