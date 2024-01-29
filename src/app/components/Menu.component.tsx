import Link from "next/link";
import styled from "styled-components";

const MenuComponent: React.FC = () => {
  return (
    <Menu>
      <Link href="/">Home</Link>
      <Link href="/about-me">Sobre Mim</Link>
      <Link href="/technical-skills">Habilidades Técnicas</Link>
      <Link href="/work-experience">Experiência Profissional</Link>
      <Link href="/contact">Contato</Link>
    </Menu>
  );
};

const Menu = styled.menu`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  background-color: #363b3f;

  a {
    text-decoration: none;
    color: #fffffe;
    font-weight: 600;
    transition: 200ms;

    &:hover {
      scale: 1.02;
    }
    &:active {
      scale: 0.98;
    }
  }
`;

export default MenuComponent;
