class Art {
    public name: string;
    public artist: string;
    public type: string; // e.g., "painting", "sculpture"
    public url: string;
    public year: string;
    public description: string;

    constructor(name: string, artist: string, type: string, url: string, year: string, description: string) {
        this.name = name;
        this.artist = artist;
        this.type = type;
        this.url = url;
        this.year = year;
        this.description = description;
    }
}


export const sampleArt: Art = new Art(
    "Starry Night",
    "Vincent van Gogh",
    "painting",
    "https://en.wikipedia.org/wiki/The_Starry_Night",
    "1889",
    "A depiction of a swirling night sky over a quiet town."
);

export default Art;