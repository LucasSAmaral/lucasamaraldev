import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { TransitionStateType } from '../../template';
import MenuOption from './MenuOption.component';
import { ActualRoute, MenuContext } from './Menu.context';
import config from '../../../../generated-config.json';
import MenuMobileToggle from './MenuMobileToggle.component';
import {
  LanguageOptionsContext,
  SelectedLanguage,
} from '../language-options/LanguageOptions.context';
import { MenuTooltipStyle } from '../commons/styles';
import useMenuStatus, { MenuStatus } from '../hooks/menu.hook';

type MenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const MenuComponent: React.FC<MenuComponentProps> = ({ setTransitionState }) => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { menuMobileStatus, updateMenuMobileStatus, languageMenuStatus, updateLanguageMenuStatus } =
    useMenuStatus();

  const {
    menuState: { actualRouteState },
    updateMenuState,
  } = useContext(MenuContext);

  return (
    <MenuWrapper>
      <MenuMobileToggle
        menuMobileStatus={menuMobileStatus}
        updateMenuMobileStatus={updateMenuMobileStatus}
      />
      <Menu
        $menuStatus={menuMobileStatus}
        onAnimationEnd={() => {
          if (languageMenuStatus === 'OPENED') {
            updateLanguageMenuStatus('CLOSING');
          }
          switch (menuMobileStatus) {
            case 'OPENING':
              return updateMenuMobileStatus('OPENED');
            case 'CLOSING':
              return updateMenuMobileStatus('CLOSED');
            default:
              return;
          }
        }}
      >
        {config.menu.menuOptionList.map((menuOption, index) => (
          <MenuOption
            key={`${menuOption.optionName[selectedLanguage]}-${index}`}
            nextRoute={menuOption.nextRoute}
            updateMenuState={updateMenuState}
            setTransitionState={setTransitionState}
          >
            {menuOption.optionName[selectedLanguage]}
          </MenuOption>
        ))}
      </Menu>
      <ActiveBarWrapper $selectedLanguage={selectedLanguage}>
        <ActiveBar $actualRoute={actualRouteState} $selectedLanguage={selectedLanguage} />
      </ActiveBarWrapper>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
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

const Menu = styled.menu.attrs<{ $menuStatus: MenuStatus }>(props => ({
  $menuStatus: props.$menuStatus,
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 20px;
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
  max-width: ${({ $selectedLanguage }) => ($selectedLanguage === 'pt' ? '357.47px' : '299.7px')};
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
  width: ${({ $selectedLanguage }) => ($selectedLanguage === 'pt' ? '41.47px' : '45.48px')};
  transform: translateX(0);
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

    case '/contact':
      return css`
        width: 62.38px;
        transform: translateX(571px);
      `;
  }
};

export default MenuComponent;
