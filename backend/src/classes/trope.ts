class Trope {
    public title: string;
    public text: string[];
    public pictureUrl: string;
    public link: string;
  
    constructor(title: string, text: string[], pictureUrl: string, link:string) {
      this.title = title;
      this.text = text;
      this.pictureUrl = pictureUrl;
      this.link = link;
    }
}

export const sampleTrope: Trope = 
{ 
    title: "Muzzle Flashlight", 
    text: ["Sometimes, games feature incredibly dark areas for you to traverse. Sometimes, the developers haven't given you an adequate flashlight, or perhaps you had one, but the batteries died a long time ago. How do you find your way now? Start blindly firing your weapons, of course! Your muzzle flash, glowing magic, or energy weapons are all you need to light the way, and can do so fairly well. Never mind that it could give away your position, since your enemies can probably all see in the dark anyway."],
    pictureUrl: "https://static.tvtropes.org/pmwiki/pub/images/MightMakesLight.jpg",
    link: 'https://tvtropes.org/pmwiki/pmwiki.php/Main/MuzzleFlashlight'
};

export default Trope;