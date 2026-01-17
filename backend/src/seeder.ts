import { Category } from "./classes/category";
import { PrismaClient } from "@prisma/client";
import { CategoryEnum } from "./helpers/initialCategories";
import IMainLib, { CacheKey } from "./interfaces/IMainLib";


type FetchFunction<CacheKey> = () => Promise<CacheKey>;

class Seeder {
    private mainLib: IMainLib; 
    private categories: Category[];
    private dbClient: PrismaClient;

    constructor(mainLib: IMainLib, categories: Category[], dbClient: PrismaClient) {
        this.mainLib = mainLib;
        this.categories = categories;
        this.dbClient = dbClient;
    }

    private fetchFunctions: { [key in CategoryEnum]: FetchFunction<CacheKey> } = {
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
            const category = x.name as CategoryEnum;

            const result = await this.fetchFunctions[category]();

            const newEntry = await this.dbClient.entry.create({
                data: {
                    datetime: new Date(),
                    day: "", // Deprecated
                    category: category,
                    content: JSON.stringify(result)
                }
            });
        }
    }
}

export default Seeder;