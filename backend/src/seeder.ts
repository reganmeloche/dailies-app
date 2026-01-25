import { Category } from "./classes/category";
import { PrismaClient } from "@prisma/client";
import { CategoryEnum } from "./helpers/initialCategories";
import IFetchContent, { CacheKey } from "./interfaces/IFetchContent";

type FetchFunction<CacheKey> = () => Promise<CacheKey>;

class Seeder {
    private mainLib: IFetchContent; 
    private categories: Category[];
    private dbClient: PrismaClient;

    constructor(mainLib: IFetchContent, categories: Category[], dbClient: PrismaClient) {
        this.mainLib = mainLib;
        this.categories = categories;
        this.dbClient = dbClient;
    }

    private fetchFunctions: { [key in CategoryEnum]: FetchFunction<CacheKey | null> } = {
        [CategoryEnum.JOKE]: () => this.mainLib.getJoke(),
        [CategoryEnum.COMIC]: () => this.mainLib.getCalvinAndHobbes(),
        [CategoryEnum.FACT]: () => this.mainLib.getFact(),
        [CategoryEnum.QUOTE]: () => this.mainLib.getQuote(),
        [CategoryEnum.POEM]: () => this.mainLib.getPoem(),
        [CategoryEnum.RIDDLE]: () => this.mainLib.getRiddle(),
        [CategoryEnum.PICTURE]: () => this.mainLib.getPicture(),
        [CategoryEnum.TROPE]: () => this.mainLib.getTrope(),
        [CategoryEnum.QUIZ]: () => this.mainLib.getQuiz(),
        [CategoryEnum.TIP]: () => this.mainLib.getTip(),
        [CategoryEnum.RECIPE]: () => this.mainLib.getRecipe(),
        [CategoryEnum.ART]: () => this.mainLib.getArt(),
        [CategoryEnum.MUSIC]: () => this.mainLib.getMusic(),
    };

    // Fetch only a single category without seeding
    public async fetchOnly(category: CategoryEnum): Promise<CacheKey | null> {
        const result = await this.fetchFunctions[category]();
        return result;
    }

    public async clearBefore(earliestDate: Date) {
        await this.dbClient.entry.deleteMany({
            where: {
                datetime: { lt: earliestDate }
            }
        });
    }

    public async seed(freq: string = 'daily') {
        const seedCategories = this.categories.filter(x => x.frequency === freq);
        
        for (const x of seedCategories) {
            await this.seedSingleCategory(x.name as CategoryEnum);
        }
    }
            
    public async seedSingleCategory(category: CategoryEnum) {
        const result = await this.fetchFunctions[category]();

        if (result) {
            const newEntry = await this.dbClient.entry.create({
                data: {
                    datetime: new Date(),
                    day: "", // Deprecated
                    category: category,
                    content: JSON.stringify(result)
                }
            });
        } else {
            console.warn(`No content fetched for category ${category}, skipping DB insert.`);
        }
    } 

}

export default Seeder;