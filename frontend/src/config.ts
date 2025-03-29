export interface Config {
    googleClientId: string;
    redirectUri: string;
    authScope: string;
}
  
const config: Config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID || '713027425012-4uash17qdi229fnpvrj329k31i0lii3h.apps.googleusercontent.com',
    redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000',
    authScope: process.env.AUTH_SCOPE || 'https://www.googleapis.com/auth/drive.readonly',
};
  
export default config;