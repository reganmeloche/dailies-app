class Joke {
    public question: string;
    public punchline: string;
  
    constructor(question: string, punchline: string) {
      this.question = question;
      this.punchline = punchline;
    }
}

export const sampleJokes: Joke[] = [
    { question: "Why did the scarecrow get a medal?", punchline: "He was outstanding in his field!" },
];

export default Joke;