"use client";
// import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useModal } from "./components/modal/Modal.context";

export default function Home() {
  const { openModal } = useModal();
  return (
    <Main>
      <MainSection>
        <MainSectionContent>
          <Title>Teste</Title>
          <button
            onClick={() => {
              openModal(<p>Toga gato</p>);
            }}
          >
            MODAL TESTE
          </button>
          <Link href="/">Home</Link>
          <Link href="/about">Sobre</Link>
          <Link href="/technical-skills">Habilidades Técnicas</Link>
          <Link href="/work-experience">Experiência Profissional</Link>
          <Link href="/contact">Contato</Link>
        </MainSectionContent>
      </MainSection>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  width: 100%;
`;

const MainSection = styled(Section)``;

const MainSectionContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: blue;
`;
