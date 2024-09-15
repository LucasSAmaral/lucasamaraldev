import styled from 'styled-components';
import Image from 'next/image';
import LinkeInLogo from '../../assets/linkedin_logo_icon.svg';
import InstagramLogo from '../../assets/instagram_logo_icon.svg';
import GitHubLogo from '../../assets/github_logo_icon.svg';
import config from '../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './language-options/LanguageOptions.context';

type SocialNetworkName = 'LinkedIn' | 'GitHub' | 'Instagram';

const {
  appConfig: { linkedInProfileUrl, gitHubProfileUrl, instagramProfileUrl },
  locale,
} = config;

const FooterComponent: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const socialNetworkObj = {
    LinkedIn: { logo: LinkeInLogo, url: `${linkedInProfileUrl}${selectedLanguage === 'en' ? '?locale=en_US' : ''}` },
    GitHub: { logo: GitHubLogo, url: gitHubProfileUrl },
    Instagram: { logo: InstagramLogo, url: instagramProfileUrl },
  };
  
  const footerLocale = locale[selectedLanguage].footer;

  const {
    socialNetworks: { text: socialNetworksText, list: socialNetworksList },
  } = footerLocale;

  return (
    <Footer>
      {socialNetworksText}{' '}
      {socialNetworksList.map((socialNetwork, index) => {
        const socialNetworkName = socialNetwork.socialNetworkName as SocialNetworkName;
        return (
          <a
            key={`${socialNetworkName}_${index}`}
            href={socialNetworkObj[socialNetworkName].url}
            target="_blank"
          >
            <Image
              src={socialNetworkObj[socialNetworkName].logo}
              priority={true}
              width={25}
              alt={socialNetwork.alt}
              title={socialNetwork.title}
            />{' '}
          </a>
        );
      })}
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

    img {
      background-color: #ffffff;
      border-radius: 50%;
      border: 1px solid #ffffff;
    }
  }
`;

export default FooterComponent;
