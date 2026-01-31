import { CategoryEnum } from './helpers/initialCategories';
import { PrismaClient } from '@prisma/client';

import { MyCategory } from './interfaces/IFetchContent';
import { sampleArt } from './classes/art';
import { sampleJokes } from './classes/joke';
import { sampleComic } from './classes/calvinAndHobbes';
import { sampleFacts } from './classes/fact';
import { sampleQuotes } from './classes/quote';
import { samplePoems } from './classes/poem';
import { sampleRiddles } from './classes/riddle';
import { samplePicture } from './classes/picture';
import { sampleTrope } from './classes/trope';
import { sampleQuiz } from './classes/quiz';
import { sampleTip } from './classes/tip';
import { sampleRecipe } from './classes/recipe';
import { sampleMusic } from './classes/music';


// For retrieving stored content
class ContentStorage {
    private dbClient: PrismaClient;
    private sampleData: { [key in CategoryEnum]: MyCategory };
    
    constructor(dbClient:PrismaClient) {
        this.dbClient = dbClient;

        this.sampleData = {
            [CategoryEnum.ART]: sampleArt,
            [CategoryEnum.JOKE]: sampleJokes[0],
            [CategoryEnum.COMIC]: sampleComic,  
            [CategoryEnum.FACT]: sampleFacts[0],
            [CategoryEnum.QUOTE]: sampleQuotes[0],
            [CategoryEnum.POEM]: samplePoems[0],
            [CategoryEnum.RIDDLE]: sampleRiddles[0],
            [CategoryEnum.PICTURE]: samplePicture,
            [CategoryEnum.TROPE]: sampleTrope,
            [CategoryEnum.QUIZ]: sampleQuiz,
            [CategoryEnum.TIP]: sampleTip,
            [CategoryEnum.RECIPE]: sampleRecipe,
            [CategoryEnum.MUSIC]: sampleMusic,
        };
    }

    public async get(category:CategoryEnum): Promise<MyCategory> {
        const categoryKey: string = category; 

        const record = await this.dbClient.entry.findFirst({
            where: { category: categoryKey },
            orderBy: { datetime: 'desc' },
        });

        if (record && record.content) {
            return JSON.parse(record.content as string);
        } else {
            // Maybe we just want to send error...?
            return JSON.parse(JSON.stringify(this.sampleData[category]));
        }
    }
}
  
export default ContentStorage;
  