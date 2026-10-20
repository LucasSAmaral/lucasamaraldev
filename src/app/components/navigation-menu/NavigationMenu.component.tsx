import { Dispatch, SetStateAction, useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { breakpoints, colors, transitions } from '@/app/styles/theme';
import { TransitionStateType } from '../../template';
import NavigationMenuOption from './NavigationMenuOption.component';
import { NavigationMenuContext } from './NavigationMenu.context';
import { NAVIGATION_MENU_ID } from './NavigationMenuMobileToggle.component';
import config from '../../../../generated-config.json';
import { LanguageOptionsContext } from '../language-options/LanguageOptions.context';

const { locale } = config;

type NavigationMenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

export type MenuStatus = 'CLOSED' | 'CLOSING' | 'OPENED' | 'OPENING';

export type UpdateMenuStatus = Dispatch<SetStateAction<MenuStatus>>;

const NavigationMenuComponent: React.FC<NavigationMenuComponentProps> = ({
  setTransitionState,
}) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  return (
    <NavigationMenu
      id={NAVIGATION_MENU_ID}
      aria-label={locale[selectedLanguage].header.navigationLabel}
      $menuStatus={navigationMenuMobileStatus}
      onAnimationEnd={() => {
        switch (navigationMenuMobileStatus) {
          case 'OPENING':
            return updateNavigationMenuMobileStatus('OPENED');
          case 'CLOSING':
            return updateNavigationMenuMobileStatus('CLOSED');
          default:
            return;
        }
      }}
    >
      <NavigationMenuList>
        {config.navigationMenu.navigationMenuOptionList.map((navigationMenuOption, index) => (
          <li key={`${navigationMenuOption.optionName[selectedLanguage]}-${index}`}>
            <NavigationMenuOption
              nextRoute={navigationMenuOption.nextRoute}
              setTransitionState={setTransitionState}
            >
              {navigationMenuOption.optionName[selectedLanguage]}
            </NavigationMenuOption>
          </li>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MobileMenuIn = keyframes`
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MobileMenuOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-8px);
    opacity: 0;
  }
`;

const MobileMenuStatusStyle = (menuStatus: MenuStatus) => {
  switch (menuStatus) {
    case 'OPENING':
      return css`
        animation: ${MobileMenuIn} ${transitions.fast} ${transitions.easing} both;
      `;
    case 'CLOSING':
      return css`
        animation: ${MobileMenuOut} ${transitions.fast} ${transitions.easing} both;
      `;
    case 'OPENED':
      return css`
        display: block;
      `;
    case 'CLOSED':
      return css`
        display: none;
      `;
  }
};

const NavigationMenu = styled.nav.attrs<{ $menuStatus: MenuStatus }>(props => ({
  $menuStatus: props.$menuStatus,
}))`
  @media (max-width: ${breakpoints.navigationMenu}px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 12px 20px 20px;
    background-color: ${colors.background};
    border-bottom: 1px solid ${colors.border};
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
    ${({ $menuStatus }) => MobileMenuStatusStyle($menuStatus)}
  }
`;

const NavigationMenuList = styled.ul`
  display: flex;
  gap: 4px;
  list-style: none;

  @media (max-width: ${breakpoints.navigationMenu}px) {
    flex-direction: column;
  }
`;

export default NavigationMenuComponent;
