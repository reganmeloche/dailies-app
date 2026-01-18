class Picture {
    public title: string;
    public url: string;
  
    constructor(title: string, url: string) {
      this.title = title;
      this.url = url;
    }
}

export const samplePicture = new Picture(
    "Sample Picture",
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg"
);

export default Picture;