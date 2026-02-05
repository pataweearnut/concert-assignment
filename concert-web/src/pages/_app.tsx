import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import '../styles/global.css';
import { robotoFont } from '../lib/font';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={robotoFont.className}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
