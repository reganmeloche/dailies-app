import { Category } from '../classes/category';

export enum CategoryEnum {
    JOKE = "joke",
    FACT = "fact",
    RIDDLE = "riddle",
    QUOTE = "quote", 
    POEM = "poem",
    PICTURE = "picture",
    COMIC = "comic",
    TROPE = "trope",
    QUIZ = "quiz",
    TIP = "tip",
    ART = "art",
    MUSIC = "music",    
    RECIPE = "recipe",
    // ...
}

// Likely don't need the ids...
export const initialCategories: Category[] = [
    // Daily
    { id: 1, name: CategoryEnum.JOKE, frequency: 'daily' },
    { id: 2, name: CategoryEnum.FACT, frequency: 'daily' },
    { id: 3, name: CategoryEnum.RIDDLE, frequency: 'daily' },
    { id: 4, name: CategoryEnum.QUOTE, frequency: 'daily' },
    { id: 5, name: CategoryEnum.PICTURE, frequency: 'daily' },
    { id: 6, name: CategoryEnum.QUIZ, frequency: 'daily' },
    { id: 7, name: CategoryEnum.TIP, frequency: 'daily' },
    { id: 8, name: CategoryEnum.COMIC, frequency: 'daily' },

    // Weekly
    { id: 12, name: CategoryEnum.POEM, frequency: 'weekly' },
    { id: 13, name: CategoryEnum.ART, frequency: 'weekly' },
    { id: 14, name: CategoryEnum.TROPE, frequency: 'weekly' },
    { id: 15, name: CategoryEnum.MUSIC, frequency: 'weekly' },
    { id: 16, name: CategoryEnum.RECIPE, frequency: 'weekly' },
];
