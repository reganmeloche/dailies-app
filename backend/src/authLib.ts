import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';


class AuthLib {
    private googleClient: OAuth2Client; 

    constructor(googleClient: OAuth2Client) {
        this.googleClient = googleClient;
    }

    public async authSetup(authCode: string) {
        const { tokens } = await this.googleClient.getToken(authCode);
        
        this.googleClient.setCredentials(tokens);
        
        const userInfo = await this.getUserInfo();

        return {
            accessToken: tokens.access_token,
            user: userInfo,
        };
    }

    public async validateAccessToken(accessToken: string) {
        const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`);
        const data = response.data;

        if (data) {
            const user = await this.getUserInfo();
            return { user };
        } else {
            console.error('Invalid payload');
            // TODO: Handle this case 
        }
    }

    public getGoogleClient(): OAuth2Client {
        return this.googleClient;
    }

    private async getUserInfo() {
        const oauth2 = google.oauth2({ version: "v2", auth: this.googleClient });
        const { data: userInfo } = await oauth2.userinfo.get();
        return userInfo;
    }
}

export default AuthLib;