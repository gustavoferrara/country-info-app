import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

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
  useEffect(() => {
    console.log(countryList);
  }, []);

  return (
    <>
      <div>Hello world!</div>
    </>
  );
};

export default Home;
