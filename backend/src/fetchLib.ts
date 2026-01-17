import { CategoryEnum } from './helpers/initialCategories';
import { PrismaClient } from '@prisma/client';

class FetchLib {
    private dbClient: PrismaClient;
    
    constructor(dbClient:PrismaClient) {
        this.dbClient = dbClient;
    }

    public async get(category:CategoryEnum): Promise<any> {
        const categoryKey: string = category; 

        const record = await this.dbClient.entry.findFirst({
            where: { category: categoryKey },
            orderBy: { datetime: 'desc' },
        });

        if (record) {
            return JSON.parse(record?.content! as string);
        }

        return null;
    }
}
  
export default FetchLib;
  