import { Category } from '../../shared/classes/category';

export enum CategoryEnum {
    JOKE = "joke",
    FACT = "fact",
    RIDDLE = "riddle",
    QUOTE = "quote", 
    POEM = "poem",
    PICTURE = "picture",
    COMIC = "comic",
    TROPE = "trope",
    QUIZ = "quiz"
}

export const initialCategories: Category[] = [
    { id: 1, name: "Joke" },
    { id: 2, name: "Fact" },
    { id: 3, name: "Riddle" },
    { id: 4, name: "Quote" },
    { id: 5, name: "Poem" },
    { id: 6, name: "Photograph" },
    { id: 7, name: "Calvin and Hobbes" },
    { id: 8, name: "TV Trope" },
    { id: 9, name: "Quiz" }
];
