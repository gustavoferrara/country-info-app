import 'dotenv-safe/config';

import express, { NextFunction, Request, Response } from 'express';
import next from 'next';

import getCountriesRoute from './routes/api/getCountries';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.disable('x-powered-by');

    server.use(express.json());

    server.use('/api/getCountries', getCountriesRoute);

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    console.error(err.stack);
    process.exit(1);
  });
