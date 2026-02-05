import { IBM_Plex_Sans_Thai, Inter, Roboto } from 'next/font/google';

export const ibmPlexSansThaiFont = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const interFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
