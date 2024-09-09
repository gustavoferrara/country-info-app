import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
      <div></div>
    </>
  );
};

export default CountryPage;
