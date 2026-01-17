export class SingleRec {
    public album: string
    public artist: string;
    public genre: string;
    public year: number;
    public description: string;

    constructor(album: string, artist: string, genre: string, year: number, description: string) {
        this.album = album;
        this.artist = artist;
        this.genre = genre;
        this.year = year;
        this.description = description;
    }
}

class Music {
    public recs: SingleRec[];

    constructor(recs: SingleRec[]) {
      this.recs = recs;
    }
}


export const sampleMusic: Music = new Music(
    [
        new SingleRec(
            "Abbey Road",
            "The Beatles",
            "Rock",
            1969,
            "The Beatles' iconic album featuring a blend of rock and pop, known for its innovative production and timeless songs."
        ),
        new SingleRec(
            "Kind of Blue",
            "Miles Davis",
            "Jazz",
            1959,
            "A landmark jazz album that showcases Miles Davis's mastery and features some of the most influential jazz musicians of the time."
        ),
    ]
);

export const sampleMusicString: string = `
{
    "recs": [
        {
            "album": "Abbey Road",
            "artist": "The Beatles",
            "genre": "Rock",
            "year": 1969,
            "description": "The Beatles' iconic album featuring a blend of rock and pop, known for its innovative production and timeless songs."
        },
        {
            "album": "Kind of Blue",
            "artist": "Miles Davis",
            "genre": "Jazz",
            "year": 1959,
            "description": "A landmark jazz album that showcases Miles Davis's mastery and features some of the most influential jazz musicians of the time."
        }
    ]
}
`;

export default Music;