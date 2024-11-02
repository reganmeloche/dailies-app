class Fact {
    public title: string;
    public text: string;
  
    constructor(title: string, text: string) {
      this.title = title;
      this.text = text;
    }
}

export const sampleFacts: Fact[] = [
    { 
        title: "Bananas are berries, but strawberries aren't", 
        text: "Botanically speaking, bananas qualify as berries because they develop from a single ovary and have multiple seeds. In contrast, strawberries are considered \"aggregate fruits\" because they form from multiple ovaries." 
    },
    { 
        title: "Octopuses have three hearts", 
        text: "Two of their hearts pump blood to the gills, where it gets oxygenated, and the third heart pumps it to the rest of the body. Interestingly, the heart that delivers blood to the body actually stops beating when the octopus swims, which is why they prefer crawling over swimming!" 
    },
];

export default Fact;