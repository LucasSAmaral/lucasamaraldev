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

export const Column = styled.div`
  padding: 40px 20px;
  position: relative;

  @media (max-width: 864px) {
    padding: 20px;
  }
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
