import '@/styles/globals.scss';

import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Component {...pageProps} key={router.route} />
    </>
  );
};

export default MyApp;
