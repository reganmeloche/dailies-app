import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Display from './Display';
import { Category } from '@shared/category';

const Content: React.FC = () => {
    const [selected, setSelected] = useState<string>("joke");
    const [dailies, setDailies] = useState<Category[]>([]);
    const [weeklies, setWeeklies] = useState<Category[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/categories');
            const data = await response.json();

            const dailiesCat = data.filter((cat: Category) => cat.frequency === 'daily');
            const weekliesCat = data.filter((cat: Category) => cat.frequency === 'weekly');
            
            setDailies(dailiesCat);
            setWeeklies(weekliesCat);
        };
    
        fetchItems();  
    }, []);

    const handleCategoryClick = (category: string) => {
        setSelected(category);
    };

    return (
        <div className="row" style={{ margin: 0, height:'100%' }}>
            <div className="col-3" style={{ padding: 20, backgroundColor: '#1F2933'}}>
                <Menu dailyItems={dailies} weeklyItems={weeklies} selected={selected} onItemClick={handleCategoryClick} />
            </div>
            <div className="col-9" style={{ padding: 20, borderLeft: '2px solid #dee2e6', overflowY: 'auto', height:'100%' }}>
                <Display selected={selected} />
            </div>
        </div>
    );
};

export default Content;
