import styled from "styled-components";
import Image from "next/image";
import LinkeInLogo from "../../assets/linkedin_logo_icon.svg";
import InstagramLogo from "../../assets/instagram_logo_icon.svg";

const FooterComponent: React.FC = () => {
  return (
    <Footer>
      Redes sociais:{" "}
      <a
        href="https://www.linkedin.com/in/lucas-amaral-193a459b/"
        target="_blank"
      >
        <Image
          src={LinkeInLogo}
          priority={true}
          width={25}
          alt="Logo do LinkedIn"
          title="Me encontre no LinkedIn"
        />{" "}
      </a>
      <a href="https://www.instagram.com/lucass.amaral/" target="_blank">
        <Image
          src={InstagramLogo}
          priority={true}
          width={25}
          alt="Logo do Instagram"
          title="Me siga no Instagram"
        />
      </a>
    </Footer>
  );
};

const Footer = styled.footer`
  width: 100%;
  background-color: #363b3f;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  a {
    height: 25px;
  }
`;

export default FooterComponent;
