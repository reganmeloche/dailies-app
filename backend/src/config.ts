export interface Config {
    ninjasApiKey: string;
    unsplashAccessKey: string;
    googleClientId: string; 
    googleClientSecret: string,
    googleRedirectURI: string,
    openAIApiKey: string,
    seedPassword: string,
}
  
const config: Config = {
    ninjasApiKey: process.env.NINJAS_API_KEY || '',
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    googleRedirectURI: process.env.GOOGLE_REDIRECT_URI || '',
    openAIApiKey: process.env.OPENAI_API_KEY || '',
    seedPassword: process.env.SEED_PASSWORD || '',
};
  
export default config;