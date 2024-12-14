import axios, { AxiosResponse } from 'axios';

export interface INinjaApi {
    fetch(category: string): Promise<any>;
} 

class NinjaApi implements INinjaApi {
    private baseUrl: string;
    private apiKey: string;

    constructor(apiKey: string) {
        this.baseUrl = `https://api.api-ninjas.com/v1`;
        this.apiKey = apiKey;
    }

    public async fetch(category: string): Promise<any> {
        const response: AxiosResponse = await axios.get(`${this.baseUrl}/${category}`, {
            headers: {
              'X-Api-Key': this.apiKey,
            }
        });
        // May add error handling...
        return response.data;
  }

}

export default NinjaApi;