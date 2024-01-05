"use client";
// import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useModal } from "./components/Modal.context";

export default function Home() {
  const { openModal } = useModal();
  return (
    <>
      <Title>Teste</Title>
      <button
        onClick={() => {
          openModal(<p>Toga gato</p>);
        }}
      >
        MODAL TESTE
      </button>
      <Link href="/contact">Contato</Link>
    </>
  );
}

const Title = styled.h1`
  color: blue;
`;
