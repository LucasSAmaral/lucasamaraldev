import styled from "styled-components";

const FooterComponent: React.FC = () => {
  return <Footer>O rodape</Footer>;
};

const Footer = styled.footer`
  width: 100%;
  background-color: #363b3f;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FooterComponent;
