"use client";
import styled from "styled-components";

const AboutMe: React.FC = () => {
  return (
    <AboutMeWrapper>
      <p>
        Meu nome é Lucas Amaral. Tenho 32 anos. Moro no Rio de Janeiro e sou
        desenvolvedor front-end.
      </p>
      <p>
        Gosto de conversar sobre a cultura pop, mas especificamente sobre
        cinema. Gosto de assistir filmes e séries, jogar video game e ler livros
        e quadrinhos no meu tempo livre.
      </p>
      <p>
        Me formei em Sistemas de Informação em 2014 e trabalho como
        desenvolvedor front-end desde 2015.
      </p>
    </AboutMeWrapper>
  );
};

const AboutMeWrapper = styled.div`
  text-align: center;
  p {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: justify;
    margin-top: 10px;
  }
`;

export default AboutMe;
