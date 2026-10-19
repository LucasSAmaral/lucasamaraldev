'use client';
import styled from 'styled-components';

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
