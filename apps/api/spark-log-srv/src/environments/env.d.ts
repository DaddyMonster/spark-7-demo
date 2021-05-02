declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // SERVER ENV
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      CORS_ORIGINS: string; // CORS_ORIGIN2 : string and so on

      // MONGO DB
      MONGO_URI: string;
      GLOBAL_PREFIX: string;
      COOKIE_NAME: string;
      SESSION_SECRET: string;

      PG_DATABASE: string;
      PG_USERNAME: string;
      PG_PASSWORD: string;
      PG_HOST: string;
      PG_PORT: number;
    }
  }
}

export {};
