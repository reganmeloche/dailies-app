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
    { name: CategoryEnum.JOKE, frequency: 'daily', title: 'Joke' },
    { name: CategoryEnum.FACT, frequency: 'daily', title: 'Fact' },
    { name: CategoryEnum.RIDDLE, frequency: 'daily', title: 'Riddle' },
    { name: CategoryEnum.QUOTE, frequency: 'daily', title: 'Quote' },
    { name: CategoryEnum.PICTURE, frequency: 'daily', title: 'Picture' },
    { name: CategoryEnum.QUIZ, frequency: 'daily', title: 'Quiz' },
    { name: CategoryEnum.TIP, frequency: 'daily', title: 'Tip' },
    { name: CategoryEnum.COMIC, frequency: 'daily', title: 'Comic' },

    // Weekly
    { name: CategoryEnum.POEM, frequency: 'weekly', title: 'Poem' },
    { name: CategoryEnum.ART, frequency: 'weekly', title: 'Art' },
    { name: CategoryEnum.TROPE, frequency: 'weekly', title: 'Trope' },
    { name: CategoryEnum.MUSIC, frequency: 'weekly', title: 'Music' },
    { name: CategoryEnum.RECIPE, frequency: 'weekly', title: 'Recipe' },
];
