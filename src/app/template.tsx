"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuComponent from "./components/menu/Menu.component";
import { Container, Main, Section } from "./styles/styles";
import styled, { keyframes, css } from "styled-components";
import FooterComponent from "./components/Footer.component";

export type TransitionStateType = {
  exiting: boolean;
  nextRoute: string;
};

const initialTransitionState = {
  exiting: false,
  nextRoute: "",
};

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [transitionState, setTransitionState] = useState<TransitionStateType>(
    initialTransitionState
  );

  useEffect(() => {
    setTransitionState({ ...transitionState, exiting: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { exiting, nextRoute } = transitionState;

  return (
    <Main>
      <MenuComponent setTransitionState={setTransitionState} />
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
          <Container>{children}</Container>
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

const MainSection = styled(Section).attrs<{ $exiting: boolean }>((props) => ({
  $exiting: props.$exiting,
}))`
  animation: ${({ $exiting }) => (!$exiting ? SlideInRight : SlideOutLeft)}
    300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const MainSectionContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;
