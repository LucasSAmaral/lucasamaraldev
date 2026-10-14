import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StyledComponentsRegistry from './lib/registry';
import ModalContainer from './components/modal/Modal.container';
import Providers from './Providers';
import { inter, spaceGrotesk } from './styles/fonts';

export const metadata: Metadata = {
  title: 'Lucas Amaral | Dev Front End',
  description: 'Meu Site Pessoal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
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
