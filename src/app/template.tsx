'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import HeaderComponent from './components/Header.component';
import SkipLinkComponent, { MAIN_CONTENT_ID } from './components/SkipLink.component';
import { Container, Main, Page } from './styles/styles';
import styled, { keyframes } from 'styled-components';
import { transitions } from './styles/theme';
import FooterComponent from './components/Footer.component';
import { useModal } from './components/modal/Modal.context';

export type TransitionStateType = {
  exiting: boolean;
  nextRoute: string;
};

// Home e Contato já mostram as redes sociais no conteúdo da página, então não repetem no footer.
const ROUTES_WITHOUT_FOOTER = ['/', '/contact'];

const initialTransitionState = {
  exiting: false,
  nextRoute: '',
};

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    modalState: { modalStatus },
    closeModal,
  } = useModal();
  const [transitionState, setTransitionState] =
    useState<TransitionStateType>(initialTransitionState);

  useEffect(() => {
    if (modalStatus === 'OPENED') {
      closeModal();
    }
    setTransitionState({ ...transitionState, exiting: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { exiting, nextRoute } = transitionState;

  return (
    <Page>
      <SkipLinkComponent />
      <HeaderComponent setTransitionState={setTransitionState} />
      <MainContent
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        $exiting={exiting}
        onAnimationEnd={() => {
          if (exiting) {
            router.push(nextRoute);
            return;
          }
        }}
      >
        <PageContent>
          <Container>{children}</Container>
        </PageContent>
      </MainContent>
      {!ROUTES_WITHOUT_FOOTER.includes(pathname) && <FooterComponent />}
    </Page>
  );
}

// Entrada: aparece subindo 8px. Saída: some subindo 8px; o fim dela dispara a navegação.
const FadeIn = keyframes`
  0% {
    transform: translateY(8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-8px);
    opacity: 0;
  }
`;

const MainContent = styled(Main).attrs<{ $exiting: boolean }>(props => ({
  $exiting: props.$exiting,
}))`
  animation: ${({ $exiting }) => ($exiting ? FadeOut : FadeIn)} ${transitions.fast}
    ${transitions.easing} both;
`;

const PageContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;
