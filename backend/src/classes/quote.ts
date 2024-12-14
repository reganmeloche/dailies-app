class Quote {
    public author: string;
    public text: string;
  
    constructor(author: string, text: string) {
      this.author= author;
      this.text = text;
    }
}

export const sampleQuotes: Quote[] = [
    { 
        author: "Steve Jobs", 
        text: "The only way to do great work is to love what you do." 
    },
    { 
        author: "Lewis Carroll", 
        text: "In the end, we only regret the chances we didn’t take." 
    },
];

export default Quote;