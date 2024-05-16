import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { TransitionStateType } from '../../template';
import NavigationMenuOption from './NavigationMenuOption.component';
import { ActualRoute, NavigationMenuContext } from './NavigationMenu.context';
import config from '../../../../generated-config.json';
import NavigationMenuMobileToggle from './NavigationMenuMobileToggle.component';
import {
  LanguageOptionsContext,
  SelectedLanguage,
} from '../language-options/LanguageOptions.context';
import { Menu, MenuTooltipStyle } from '../commons/styles';
import useMenuStatus, { MenuStatus } from '../hooks/menu.hook';

type NavigationMenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const NavigationMenuComponent: React.FC<NavigationMenuComponentProps> = ({
  setTransitionState,
}) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const {
    navigationMenuMobileStatus,
    updateNavigationMenuMobileStatus,
    languageMenuStatus,
    updateLanguageMenuStatus,
  } = useMenuStatus();

  const {
    navigationMenuState: { actualRouteState },
    updateNavigationMenuState,
  } = useContext(NavigationMenuContext);

  return (
    <NavigationMenuWrapper>
      <NavigationMenuMobileToggle
        navigationMenuMobileStatus={navigationMenuMobileStatus}
        updateNavigationMenuMobileStatus={updateNavigationMenuMobileStatus}
      />
      <NavigationMenu
        $menuStatus={navigationMenuMobileStatus}
        onAnimationEnd={() => {
          if (languageMenuStatus === 'OPENED') {
            updateLanguageMenuStatus('CLOSING');
          }
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
        {config.navigationMenu.navigationMenuOptionList.map((navigationMenuOption, index) => (
          <NavigationMenuOption
            key={`${navigationMenuOption.optionName[selectedLanguage]}-${index}`}
            nextRoute={navigationMenuOption.nextRoute}
            updateNavigationMenuState={updateNavigationMenuState}
            setTransitionState={setTransitionState}
          >
            {navigationMenuOption.optionName[selectedLanguage]}
          </NavigationMenuOption>
        ))}
      </NavigationMenu>
      <ActiveBarWrapper $selectedLanguage={selectedLanguage}>
        <ActiveBar $actualRoute={actualRouteState} $selectedLanguage={selectedLanguage} />
      </ActiveBarWrapper>
    </NavigationMenuWrapper>
  );
};

const NavigationMenuWrapper = styled.div`
  background-color: #363b3f;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  @media (max-width: 672px) {
    padding: 0;
    height: 62px;
    position: relative;
    justify-content: center;
  }
`;

const NavigationMenu = styled(Menu)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 0;

  @media (max-width: 672px) {
    top: 80px;
    ${({ $menuStatus }) => MenuTooltipStyle($menuStatus)}
  }
`;

const ActiveBarWrapper = styled.div.attrs<{ $selectedLanguage: SelectedLanguage }>(props => ({
  $selectedLanguage: props.$selectedLanguage,
}))`
  height: 2px;
  width: 100%;
  max-width: ${({ $selectedLanguage }) => ($selectedLanguage === 'pt' ? '443px' : '385.69px')};
  position: relative;

  @media (max-width: 672px) {
    display: none;
  }
`;

const ActiveBar = styled.div.attrs<{
  $actualRoute: ActualRoute;
  $selectedLanguage: SelectedLanguage;
}>(props => ({
  $actualRoute: props.$actualRoute,
  $selectedLanguage: props.$selectedLanguage,
}))`
  background-color: #fffffe;
  height: 100%;
  transition: 0.3s;
  position: absolute;
  ${({ $actualRoute, $selectedLanguage }) => TransformActiveBar($actualRoute, $selectedLanguage)}
`;

const TransformActiveBar = (actualRoute: ActualRoute, selectedLanguage: SelectedLanguage) => {
  switch (actualRoute) {
    case '/': {
      if (selectedLanguage === 'pt') {
        return css`
          width: 41.47px;
          transform: translateX(0);
        `;
      }
      return css`
        width: 45.48px;
        transform: translateX(0);
      `;
    }

    case '/about-me':
      {
        if (selectedLanguage === 'pt') {
          return css`
            width: 82.87px;
            transform: translateX(65px);
          `;
        }
      }
      return css`
        width: 75.17px;
        transform: translateX(69px);
      `;

    case '/work-experience':
      {
        if (selectedLanguage === 'pt') {
          return css`
            width: 185.33px;
            transform: translateX(173px);
          `;
        }
      }
      return css`
        width: 131px;
        transform: translateX(168px);
      `;

    case '/contact': {
      if (selectedLanguage === 'pt') {
        return css`
          width: 62.38px;
          transform: translateX(382px);
        `;
      }
      return css`
        width: 62.38px;
        transform: translateX(323px);
      `;
    }
  }
};

export default NavigationMenuComponent;
