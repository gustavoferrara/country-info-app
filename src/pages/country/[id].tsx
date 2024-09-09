import { GetServerSideProps } from 'next';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import axiosFetch from '@/helpers/axiosFetch';
import styles from '@/styles/CountryPage.module.scss';
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
  const getFormattedChartData = () => {
    return countryInfo.countryPopulation.map(dataPoint => {
      return {
        population: dataPoint.value,
        name: dataPoint.year,
      };
    });
  };

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

          {countryInfo.countryPopulation &&
            countryInfo.countryPopulation.length && (
              <>
                <h2>Population over time:</h2>
                <div className={styles.chart_wrapper}>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                      width={500}
                      height={300}
                      data={getFormattedChartData()}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey='population'
                        fill='#8884d8'
                        activeBar={<Rectangle fill='pink' stroke='blue' />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
        </>
      )}
    </>
  );
};

export default CountryPage;
