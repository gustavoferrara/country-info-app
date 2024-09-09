declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGOURI: string;
      JWTSECRET: string;
      NODEMAILERACCOUNT: string;
      NODEMAILERPASSWORD: string;
      NEXT_PUBLIC_CAPTCHASITEKEY: string;
      CAPTCHASECRETKEY: string;
      PLAYERWEBHOOK: string;
      CONTENTCREATORWEBHOOK: string;
      EDITORWEBHOOK: string;
      SOCIALMEDIAWEBHOOK: string;
      DESIGNERWEBHOOK: string;
      MODERATORWEBHOOK: string;
      CONTACTWEBHOOK: string;
      YOUTUBEAPIKEY: string;
      TWITCHCLIENTID: string;
      TWITCHTOKEN: string;
      NEXT_PUBLIC_TWITCHCLIENTID: string;
      NEXT_PUBLIC_TWITCHPUBLICTOKEN: string;
      TWITCH_CLIENT_SECRET: string;
      TWITCH_REFRESH_TOKEN: string;
      ERROR_ENDPOINT: string;
      TWITCH_APP_TOKEN: string;
    }
  }
}

export {};
