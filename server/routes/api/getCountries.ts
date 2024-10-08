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

    const passedCountryInfo = await fetchJson(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    );
    const borderCountries = passedCountryInfo.borders;
    const passedCountryName = passedCountryInfo.commonName.toLowerCase();

    let countryPopulation = await fetchJson(
      'https://countriesnow.space/api/v0.1/countries/population',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: passedCountryName }),
      },
    );

    if (countryPopulation.error)
      countryPopulation = await fetchJson(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: passedCountryInfo.officialName }),
        },
      );

    const allCountryFlags = await fetchJson(
      `https://countriesnow.space/api/v0.1/countries/flag/images`,
    );

    let passedCountryFlag = '';

    allCountryFlags.data.forEach(
      (country: { name: string; flag: string; iso2: string }) => {
        if (country.iso2 === countryCode) passedCountryFlag = country.flag;
      },
    );

    res.status(200).json({
      borderCountries,
      countryPopulation: countryPopulation.data.populationCounts,
      passedCountryFlag,
      countryName: passedCountryInfo.commonName,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
