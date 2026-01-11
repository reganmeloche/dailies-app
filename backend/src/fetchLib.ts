import { CategoryEnum } from './helpers/initialCategories';
import { PrismaClient } from '@prisma/client';
import Utilities from './helpers/utilities';

class FetchLib {
    private dbClient: PrismaClient;
    
    constructor(dbClient:PrismaClient) {
        this.dbClient = dbClient;
    }

    public async get(category:CategoryEnum): Promise<any> {
        const categoryKey: string = category; 
        const dayKey: string = Utilities.getFormattedDay();

        const record = await this.dbClient.entry.findFirst({
            where: { day: dayKey, category: categoryKey },
            orderBy: { datetime: 'desc' },
        });

        if (record) {
            return JSON.parse(record?.content! as string);
        }

        return null;
    }
}
  
export default FetchLib;
  