"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuComponent from "./components/Menu.component";
import { Container, Main, Section } from "./styles/styles";
import styled from "styled-components";
import FooterComponent from "./components/Footer.component";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <MenuComponent />
      <AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(40px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0)" }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
        >
          <MainSection>
            <MainSectionContent>
              <Container>{children}</Container>
            </MainSectionContent>
          </MainSection>
        </motion.div>
      </AnimatePresence>
      <FooterComponent />
    </Main>
  );
}

const MainSection = styled(Section)``;

const MainSectionContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;
