"use client";
import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Section = styled.section`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 20px;
`;

export const Container = styled.div`
  height: auto;

  img {
    border-radius: 50%;
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
`;
