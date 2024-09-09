import '@/styles/globals.scss';

import { AppProps } from 'next/app';

import Layout from '@/components/Layout';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </>
  );
};

export default MyApp;
