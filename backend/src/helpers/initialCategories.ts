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
}

export const initialCategories: Category[] = [
    { id: 1, name: CategoryEnum.JOKE },
    { id: 2, name: CategoryEnum.FACT },
    { id: 3, name: CategoryEnum.RIDDLE },
    { id: 4, name: CategoryEnum.QUOTE },
    { id: 5, name: CategoryEnum.POEM },
    { id: 6, name: CategoryEnum.PICTURE },
    { id: 7, name: CategoryEnum.COMIC },
    { id: 8, name: CategoryEnum.TROPE },
    { id: 9, name: CategoryEnum.QUIZ },
];
