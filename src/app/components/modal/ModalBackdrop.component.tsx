'use client';

import styled, { keyframes } from 'styled-components';
import { breakpoints, colors, transitions } from '@/app/styles/theme';

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
      onAnimationEnd={event => {
        // Ignora o animationend do conteúdo, que sobe até aqui por bubbling.
        if (event.target === event.currentTarget) {
          onAnimationEnd();
        }
      }}
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
  }
`;

const ModalFadeInBottom = keyframes`
  0% {
    transform: translateY(16px);
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
    transform: translateY(16px);
    opacity: 0;
  }
`;

// Abrindo: fundo em 200ms e conteúdo em 250ms, juntos. Fechando: conteúdo some em 200ms e o
// fundo termina em 250ms (o fim da animação do fundo é o que fecha o modal).
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.overlay};
  position: fixed;
  z-index: 1000;
  display: flex;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;

  @media (max-width: ${breakpoints.columns}px) {
    padding: 16px;
  }

  &.--opening {
    animation: ${BackdropFadeIn} ${transitions.fast} ease-out both;
    > .modal-content {
      animation: ${ModalFadeInBottom} 250ms ${transitions.easing} both;
    }
  }

  &.--closing {
    animation: ${BackdropFadeOut} 250ms ease-in both;

    > .modal-content {
      animation: ${ModalFadeOutBottom} ${transitions.fast} ease-in both;
    }
  }
`;
