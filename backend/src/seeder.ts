import { Category } from "./classes/category";
import { PrismaClient } from "@prisma/client";
import { CategoryEnum } from "./helpers/initialCategories";
import Utilities from "./helpers/utilities";
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
    };

    public async trySeed(forceSeed = false) {
        const dayKey = Utilities.getFormattedDay();

        for (const x of this.categories) {
            const category = x.name as CategoryEnum;
            
            const check = await this.dbClient.entry.findFirst({
                where: { day: dayKey, category: category }
            });

            if (check && !forceSeed) {
                continue;
            }

            const result = await this.fetchFunctions[category]();

            const newEntry = await this.dbClient.entry.create({
                data: {
                    datetime: new Date(),
                    day: dayKey,
                    category: category,
                    content: JSON.stringify(result)
                }
            });
        }
    }
}

export default Seeder;