"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Footer,
  Main,
  MainSection,
  MainSectionContent,
  Menu,
} from "./styles/styles";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <Menu>
        <Link href="/">Home</Link>
        <Link href="/about-me">Sobre Mim</Link>
        <Link href="/technical-skills">Habilidades Técnicas</Link>
        <Link href="/work-experience">Experiência Profissional</Link>
        <Link href="/contact">Contato</Link>
      </Menu>
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
      <Footer>O rodape</Footer>
    </Main>
  );
}
