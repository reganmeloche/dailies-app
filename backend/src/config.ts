export interface Config {
    ninjasApiKey: string;
    unsplashAccessKey:string;
}
  
const config: Config = {
    ninjasApiKey: process.env.NINJAS_API_KEY || '',
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || '',
};
  
export default config;