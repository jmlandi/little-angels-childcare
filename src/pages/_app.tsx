import type { AppProps } from 'next/app';
import Layout from 'src/pages/components/Layout'
import '@interfaces/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
