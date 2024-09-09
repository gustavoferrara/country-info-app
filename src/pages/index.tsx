import { GetServerSideProps } from 'next';
import Link from 'next/link';

import axiosFetch from '@/helpers/axiosFetch';

export const getServerSideProps: GetServerSideProps = async () => {
  const countryList = await axiosFetch(
    'http://localhost:3000/api/getCountries/',
  );

  return {
    props: { countryList },
    // revalidate: 60,
  };
};

interface HomeProps {
  countryList: {
    availableCountries: Array<{ countryCode: string; name: string }>;
  };
}

const Home: React.FC<HomeProps> = ({ countryList }) => {
  return (
    <>
      <ul>
        {countryList &&
          countryList.availableCountries.map(country => (
            <li key={country.countryCode}>
              <Link href={`/country/${country.countryCode}`}>
                <a>{country.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
