export class SingleTip {
    public theme: string
    public text: string;

    constructor(theme:string, text: string) {
        this.theme = theme;
        this.text = text;
    }
}

class Tip {
    public tips: SingleTip[];

    constructor(tips: SingleTip[]) {
      this.tips = tips;
    }
}


export const sampleTip: Tip = new Tip(
    [
        new SingleTip("health", "Eat a balanced diet rich in fruits and vegetables to maintain good health."),
        new SingleTip("tech", "Regularly update your software to protect against security vulnerabilities."),
        new SingleTip("random", "Take short breaks during work to improve focus and productivity."),
    ]
);

export const sampleTipString: string = `
{
    "tips": [
        {
            "theme": "health",
            "text": "Eat a balanced diet rich in fruits and vegetables to maintain good health."
        },
        {
            "theme": "tech",
            "text": "Regularly update your software to protect against security vulnerabilities."
        },
        {
            "theme": "random",
            "text": "Take short breaks during work to improve focus and productivity."
        }
    ]
}
`;

export default Tip;