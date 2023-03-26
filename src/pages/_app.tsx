import Layout from '@/components/layout/Layout';
import { wrapper } from '@/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
