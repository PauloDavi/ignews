import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <NextNprogress
        color="#EBA417"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
