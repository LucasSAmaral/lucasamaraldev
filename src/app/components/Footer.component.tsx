import styled from 'styled-components';
import Image from 'next/image';
import LinkeInLogo from '../../assets/linkedin_logo_icon.svg';
import InstagramLogo from '../../assets/instagram_logo_icon.svg';
import config from '../../../generated-config.json';

const appConfig = config.appConfig;

const FooterComponent: React.FC = () => {
  const footerLocale = config.locale['pt-br'].footer;

  return (
    <Footer>
      {footerLocale.socialNetworks.text}{' '}
      <a href={appConfig.linkedInProfileUrl} target="_blank">
        <Image
          src={LinkeInLogo}
          priority={true}
          width={25}
          {...footerLocale.socialNetworks.linkedIn}
        />{' '}
      </a>
      <a href={appConfig.linkedInProfileUrl} target="_blank">
        <Image
          src={InstagramLogo}
          priority={true}
          width={25}
          {...footerLocale.socialNetworks.instagram}
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
