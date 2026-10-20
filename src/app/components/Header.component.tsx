import { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { breakpoints, colors, fonts, radii } from '@/app/styles/theme';
import { TransitionStateType } from '../template';
import NavigationMenuComponent from './navigation-menu/NavigationMenu.component';
import NavigationMenuMobileToggle from './navigation-menu/NavigationMenuMobileToggle.component';
import { NavigationMenuContext } from './navigation-menu/NavigationMenu.context';
import LanguageOptionsComponent from './language-options/LanguageOptions.component';
import config from '../../../generated-config.json';

const { locale } = config;

type HeaderComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ setTransitionState }) => {
  const actualRoute = usePathname();

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  return (
    <Header>
      <Logo
        href="/"
        data-cy="logo"
        onClick={event => {
          event.preventDefault();
          if (actualRoute !== '/') {
            setTransitionState({ exiting: true, nextRoute: '/' });
          }
          if (navigationMenuMobileStatus === 'OPENED') {
            updateNavigationMenuMobileStatus('CLOSING');
          }
        }}
      >
        <LogoMark aria-hidden="true">LA</LogoMark>
        <LogoName>{locale.commonLocale.name}</LogoName>
      </Logo>
      <NavigationMenuComponent setTransitionState={setTransitionState} />
      <Actions>
        <LanguageOptionsComponent />
        <NavigationMenuMobileToggle />
      </Actions>
    </Header>
  );
};

const Header = styled.header`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 48px;
  border-bottom: 1px solid ${colors.border};

  @media (max-width: ${breakpoints.navigationMenu}px) {
    padding: 14px 20px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${colors.text};
  text-decoration: none;
  border-radius: ${radii.md};

  @media (max-width: ${breakpoints.navigationMenu}px) {
    gap: 10px;
  }
`;

const LogoMark = styled.span`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${colors.accent};
  border-radius: 10px;
  color: ${colors.accent};
  font-family: ${fonts.heading};
  font-size: 15px;
  font-weight: 700;

  @media (max-width: ${breakpoints.navigationMenu}px) {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    font-size: 13px;
  }
`;

const LogoName = styled.span`
  font-family: ${fonts.heading};
  font-size: 17px;
  font-weight: 600;

  @media (max-width: ${breakpoints.navigationMenu}px) {
    font-size: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export default HeaderComponent;
