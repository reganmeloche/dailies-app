import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Display from './Display';
import { Category } from '../../../backend/src/classes/category';

const Content: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number>(1);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        };
    
        fetchItems();  
    }, []);

    const handleCategoryClick = (id: number) => {
        setSelectedId(id);
    };

    return (
        <div className="row" style={{ margin: 0, height:'100%' }}>
            <div className="col-3" style={{ padding: 20 }}>
                <Menu items={categories} selectedId={selectedId} onItemClick={handleCategoryClick} />
            </div>
            <div className="col-9" style={{ padding: 20, borderLeft: '2px solid #dee2e6' }}>
                <Display selectedId={selectedId} />
            </div>
        </div>
    );
};

export default Content;
