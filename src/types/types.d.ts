import { AxiosError } from 'axios';

export interface BackendError extends AxiosError {
  response: {
    data: {
      error: string;
    };
  };
}

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: any;
}

export interface CountryPopulation {
  year: number;
  value: number;
}
