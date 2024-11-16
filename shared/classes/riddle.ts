class Riddle {
    public title: string;
    public question: string;
    public answer: string;
  
    constructor(title: string, question: string, answer: string) {
      this.title = title;
      this.question = question;
      this.answer = answer;
    }
}

export const sampleRiddles: Riddle[] = [
    { 
        title: "What is it?", 
        question: "what is naked in the winter and dressed at summer and keeps on repeating this pattern?",
        answer: "a tree" 
    }
];

export default Riddle;