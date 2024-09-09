import 'dotenv-safe/config';

import express, { Request, Response } from 'express';

import fetchJson from '../../helpers/fetcher';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const availableCountries = await fetchJson(
      'https://date.nager.at/api/v3/AvailableCountries',
    );

    res.status(200).json({ availableCountries });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/info/:countryCode', async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.params;

    const countryInfo = await fetchJson(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    );

    const borderCountries = countryInfo.borders;
    const countryName = countryInfo.commonName.toLowerCase();

    const countryPopulation = await fetchJson(
      'https://countriesnow.space/api/v0.1/countries/population',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      },
    );

    res.status(200).json({ borderCountries, countryPopulation });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
