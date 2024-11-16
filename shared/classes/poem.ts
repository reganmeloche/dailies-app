export class Stanza {
    public lines: string[]

    constructor(lines: string[]) {
        this.lines = lines;
      }
}

class Poem {
    public author: string;
    public title: string;
    public stanzas: Stanza[];
  
    constructor(author: string, title: string, stanzas: Stanza[]) {
      this.author = author;
      this.title = title;
      this.stanzas = stanzas;
    }
}

export const samplePoems: Poem[] = [
    { 
        author: "Robert Frost", 
        title: "Stopping by Woods on a Snowy Evening",
        stanzas: [
            new Stanza([
                "Whose woods these are I think I know.",
                "His house is in the village though;",
                "He will not see me stopping here",
                "To watch his woods fill up with snow."
            ]),
            new Stanza([
                "My little horse must think it queer",
                "To stop without a farmhouse near",
                "Between the woods and frozen lake",
                "The darkest evening of the year."
            ])
        ] 
    }
];

export default Poem;