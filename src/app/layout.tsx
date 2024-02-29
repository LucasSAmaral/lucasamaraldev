import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StyledComponentsRegistry from './lib/registry';
import ModalContainer from './components/modal/Modal.container';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lucas Amaral | Dev Front End',
  description: 'Meu Site Pessoal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            {children}
            <ModalContainer />
            <SpeedInsights />
          </Providers>
          <div id="modal"></div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
