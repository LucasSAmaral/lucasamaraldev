'use client';
import styled from 'styled-components';
import { breakpoints, colors } from './theme';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Section = styled.section`
  width: 100%;
`;

export const Container = styled.div`
  height: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// Rótulo curto na cor de destaque acima dos títulos ("Olá, eu sou", "Sobre mim"...).
export const Eyebrow = styled.span`
  color: ${colors.accent};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.04em;

  @media (max-width: ${breakpoints.columns}px) {
    font-size: 14px;
  }
`;

// Texto só para leitores de tela (ex.: "abre em nova aba").
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;
