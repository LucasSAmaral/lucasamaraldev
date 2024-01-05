"use client";

import styled, { keyframes } from "styled-components";

export default function ModalBackdropComponent({
  children,
  className,
  onAnimationEnd,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onAnimationEnd: () => void;
  onClick: () => void;
}) {
  return (
    <Backdrop
      onAnimationEnd={onAnimationEnd}
      className={className}
      onClick={onClick}
    >
      {children}
    </Backdrop>
  );
}

const BackdropFadeIn = keyframes`
0% {
      opacity: 0;
    }
100% {
      opacity: 1;
    }`;

const ModalFadeInBottom = keyframes`
0% {
      transform: translateY(50px);
      opacity: 0;
    }
100% {
      transform: translateY(0);
      opacity: 1;
    }
`;

const BackdropFadeOut = keyframes`
0% {
      opacity: 1;
    }
100% {
      opacity: 0;
    }
`;

const ModalFadeOutBottom = keyframes`
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(50px);
      opacity: 0;
    }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  position: fixed;
  z-index: 1000;
  display: flex;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.--opening {
    animation: ${BackdropFadeIn} 500ms ease-in both;
    > .modal-content {
      animation: ${ModalFadeInBottom} 500ms ease-out both 500ms;
    }
  }

  &.--closing {
    animation: ${BackdropFadeOut} 500ms ease-out both 500ms;

    > .modal-content {
      animation: ${ModalFadeOutBottom} 500ms ease-in both;
    }
  }
`;
