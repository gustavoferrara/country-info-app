declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      TESTURL: string;
    }
  }
}

export {};
