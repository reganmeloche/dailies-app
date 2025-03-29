import axios from 'axios';

export interface ILlmApi {
    query(prompt:string): Promise<string>;
} 

export class OpenAiOptions {
    readonly apiKey: string;
    readonly url: string;
    readonly model: string;
    readonly max_tokens: number;
    readonly temperature: number;

    constructor(apiKey:string, url:string, model:string, max_tokens:number = 500, temperature:number = 0.7) {
        this.apiKey = apiKey;
        this.url = url;
        this.model = model;
        this.max_tokens = max_tokens;
        this.temperature = temperature
    }
}

export default class OpenAiApi implements ILlmApi {
    private readonly _options: OpenAiOptions;

    public constructor(options: OpenAiOptions) {
        this._options = options;
    }

    public async query(prompt: string): Promise<string> {
        const response = await axios.post(
            this._options.url,
            {
            model: this._options.model,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: this._options.max_tokens,
            temperature: this._options.temperature,
            },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._options.apiKey}`,
            },
            }
        );
    
        return response.data.choices[0].message.content;
    }
}
