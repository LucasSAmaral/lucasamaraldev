'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationMenuComponent from './components/navigation-menu/NavigationMenu.component';
import { Container, Main, Section } from './styles/styles';
import styled, { keyframes } from 'styled-components';
import FooterComponent from './components/Footer.component';
import { Inter } from 'next/font/google';
import { useModal } from './components/modal/Modal.context';
import LanguageOptionsComponent from './components/language-options/LanguageOptions.component';
import Loading from './loading';

export type TransitionStateType = {
  exiting: boolean;
  nextRoute: string;
};

const inter = Inter({ subsets: ['latin'] });

const initialTransitionState = {
  exiting: false,
  nextRoute: '',
};

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
    <Main className={inter.className}>
      <div>
        <NavigationMenuComponent setTransitionState={setTransitionState} />
        <LanguageOptionsComponent />
      </div>
      <MainSection
        $exiting={exiting}
        onAnimationEnd={() => {
          if (exiting) {
            router.push(nextRoute);
            return;
          }
        }}
      >
        <MainSectionContent>
          <Suspense fallback={<Loading />}>
            <Container>{children}</Container>
          </Suspense>
        </MainSectionContent>
      </MainSection>
      <FooterComponent />
    </Main>
  );
}

const SlideInRight = keyframes`
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SlideOutLeft = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
`;

const MainSection = styled(Section).attrs<{ $exiting: boolean }>(props => ({
  $exiting: props.$exiting,
}))`
  animation: ${({ $exiting }) => (!$exiting ? SlideInRight : SlideOutLeft)} 300ms
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const MainSectionContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;
