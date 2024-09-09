import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';

import axiosFetch from '@/helpers/axiosFetch';
import { BorderCountry, CountryPopulation } from '@/types/types';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const countryInfo = await axiosFetch(
    `http://localhost:3000/api/getCountries/info/${id}`,
  );

  return {
    props: { countryInfo },
  };
};

interface CountryPageProps {
  countryInfo: {
    borderCountries: BorderCountry[];
    countryPopulation: CountryPopulation[];
    passedCountryFlag: string;
    countryName: string;
  };
}

const CountryPage: React.FC<CountryPageProps> = ({ countryInfo }) => {
  useEffect(() => {
    console.log(countryInfo);
  }, []);

  return (
    <>
      {countryInfo && (
        <>
          <h1>{countryInfo.countryName}</h1>
          <img
            src={countryInfo.passedCountryFlag}
            alt={`Flag of ${countryInfo.countryName}`}
          />
          {countryInfo.borderCountries && countryInfo.borderCountries.length && (
            <>
              <h2>Countries that border {countryInfo.countryName}:</h2>
              <ul>
                {countryInfo.borderCountries.map(borderingCountry => (
                  <li key={borderingCountry.countryCode}>
                    <Link href={`/country/${borderingCountry.countryCode}`}>
                      <a>{borderingCountry.commonName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CountryPage;
