import type { AppProps } from 'next/app';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <main>
        <Component {...pageProps} />
      </main>
  );
}