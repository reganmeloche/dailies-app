export interface Config {
    ninjasApiKey: string;
}
  
const config: Config = {
    ninjasApiKey: process.env.NINJAS_API_KEY || '',
};
  
export default config;