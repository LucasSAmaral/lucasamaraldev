"use client";
import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
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
`;

export const Subtitle = styled.p`
  font-size: 20px;
`;

export const MainSection = styled(Section)``;

export const MainSectionContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;

export const Menu = styled.menu`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  padding: 20px;

  a {
    text-decoration: none;
    color: #fffffe;
    font-weight: 600;
    transition: 200ms;

    &:hover {
      scale: 1.02;
    }
    &:active {
      scale: 0.85;
    }
  }
`;

export const Container = styled.div`
  height: 549px;
  img {
    border-radius: 50%;
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  background-color: #363b3f;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AboutMeWrapper = styled.div`
  text-align: center;
  p {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: justify;
    margin-top: 10px;
  }
`;
