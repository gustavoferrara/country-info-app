import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import axiosFetch from '../../axiosFetch';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const availableCountries = await axiosFetch(
      'https://date.nager.at/api/v3/AvailableCountries',
    );

    res.status(200).json({ availableCountries });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
