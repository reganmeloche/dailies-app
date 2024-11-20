import axios from 'axios';
import * as cheerio from 'cheerio';
import Trope from '../../shared/classes/trope';

export interface ITropeApi {
    getTrope(): Promise<Trope>;
} 

export default class TropeApi implements ITropeApi {
    private readonly _url: string;

    public constructor() {
        this._url = "https://tvtropes.org";
    }

    public async getTrope(): Promise<Trope> {
        // Step 1: Get the content from the first website
        const response = await axios.get(this._url);

        // Step 2: Load HTML into cheerio and find the specific link tag
        const $ = cheerio.load(response.data);
        const selector = '#main-article #featured-tropes .featured-trope .entry-title a';
        const secondLink = $(selector).attr('href');


        // Step 3: Get the main content
        const link = `${this._url}${secondLink}`
        const secondResponse = await axios.get(link);

        // Load cheerio and find the targets
        const $$ = cheerio.load(secondResponse.data);
        const titleSelector = '#main-content .entry-title';
        const title = $$(titleSelector).text();

        const text = this.extractText($$);

        const pictureSelector = '#main-content #main-article .embeddedimage';
        const pictureUrl = $$(pictureSelector).attr('src') || '';

        return new Trope(title, text, pictureUrl, link);
    }

    private extractText($: cheerio.CheerioAPI): string[] {
        const textSelector = '#main-content #main-article';
        const container = $(textSelector);

        // Initialize an array to store the text of <p> tags
        const paragraphs: string[] = [];
    
        // Iterate through the children of the container
        container.children().each((index, element) => {
            const tagName = $(element).prop('tagName')?.toLowerCase();
    
            // Stop iteration if <hr> is encountered
            if (tagName === "hr") {
                return false; // Break out of the loop
            }
    
            // If it's a <p> tag, extract the text
            if (tagName === "p") {
                paragraphs.push($(element).text().trim());
            }
        });

        return paragraphs.filter(x => x != '');
    }
}