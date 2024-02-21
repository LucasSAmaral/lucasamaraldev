import styled from 'styled-components';
import Image from 'next/image';
import LinkeInLogo from '../../assets/linkedin_logo_icon.svg';
import InstagramLogo from '../../assets/instagram_logo_icon.svg';
import config from '../../../generated-config.json';

const { appConfig, locale } = config;

const FooterComponent: React.FC = () => {
  const footerLocale = locale['pt-br'].footer;

  const {
    socialNetworks: {
      text: socialNetworksText,
      instagram: { alt: instagramAlt, title: instagramTitle },
      linkedIn: { alt: linkedInAlt, title: linkedInTitle },
    },
  } = footerLocale;

  return (
    <Footer>
      {socialNetworksText}{' '}
      <a href={appConfig.linkedInProfileUrl} target="_blank">
        <Image
          src={LinkeInLogo}
          priority={true}
          width={25}
          alt={linkedInAlt}
          title={linkedInTitle}
        />{' '}
      </a>
      <a href={appConfig.instagramProfileUrl} target="_blank">
        <Image
          src={InstagramLogo}
          priority={true}
          width={25}
          alt={instagramAlt}
          title={instagramTitle}
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
