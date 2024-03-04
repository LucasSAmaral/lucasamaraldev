import { useContext, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { TransitionStateType } from '../../template';
import MenuOption from './MenuOption.component';
import { ActualRoute, MenuContext } from './Menu.context';
import config from '../../../../generated-config.json';
import MenuMobileToggle from './MenuMobileToggle.component';

type MenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

export type MenuMobileStatus = 'CLOSED' | 'CLOSING' | 'OPENED' | 'OPENING';

const MenuComponent: React.FC<MenuComponentProps> = ({ setTransitionState }) => {
  const {
    menuState: { actualRouteState },
    updateMenuState,
  } = useContext(MenuContext);

  const [menuMobileStatus, updateMenuMobileStatus] = useState<MenuMobileStatus>('CLOSED');

  return (
    <MenuWrapper>
      <MenuMobileToggle
        menuMobileStatus={menuMobileStatus}
        updateMenuMobileStatus={updateMenuMobileStatus}
      />
      <Menu
        $menuMobileStatus={menuMobileStatus}
        onAnimationEnd={() => {
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
            key={`${menuOption.optionName['pt-br']}-${index}`}
            nextRoute={menuOption.nextRoute}
            updateMenuState={updateMenuState}
            setTransitionState={setTransitionState}
            updateMenuMobileStatus={updateMenuMobileStatus}
          >
            {menuOption.optionName['pt-br']}
          </MenuOption>
        ))}
      </Menu>
      <ActiveBarWrapper>
        <ActiveBar $actualRoute={actualRouteState} />
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

const FadeInAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const FadeOutAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
`;

const Menu = styled.menu.attrs<{ $menuMobileStatus: MenuMobileStatus }>(props => ({
  $menuMobileStatus: props.$menuMobileStatus,
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  padding-bottom: 0;

  @media (max-width: 672px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #363b3f;
    padding-bottom: 20px;
    top: 80px;
    border-radius: 4px;
    z-index: 10000;
    border: 1px solid #fffffe;
    ${({ $menuMobileStatus }) => MenuMobileAnimation($menuMobileStatus)}

    &:before {
      content: ' ';
      width: 20px;
      height: 20px;
      background-color: #363b3f;
      position: absolute;
      display: block;
      top: -11px;
      right: calc(50% - 10px);
      transform: rotate(45deg);
      border-top: 1px solid #fffffe;
      border-left: 1px solid #fffffe;
    }
  }
`;

const ActiveBarWrapper = styled.div`
  height: 2px;
  width: 100%;
  max-width: 357.47px;
  position: relative;

  @media (max-width: 672px) {
    display: none;
  }
`;

const ActiveBar = styled.div.attrs<{ $actualRoute: ActualRoute }>(props => ({
  $actualRoute: props.$actualRoute,
}))`
  background-color: #fffffe;
  height: 100%;
  transition: 0.3s;
  position: absolute;
  width: 41.47px;
  transform: translateX(0);
  ${({ $actualRoute }) => TransformActiveBar($actualRoute)}
`;

const TransformActiveBar = (actualRoute: ActualRoute) => {
  switch (actualRoute) {
    case '/':
      return css`
        width: 41.47px;
        transform: translateX(0);
      `;
    case '/about-me':
      return css`
        width: 82.87px;
        transform: translateX(65px);
      `;
    case '/work-experience':
      return css`
        width: 185.33px;
        transform: translateX(173px);
      `;
    case '/contact':
      return css`
        width: 62.38px;
        transform: translateX(571px);
      `;
  }
};

const MenuMobileAnimation = (menuMobileStatus: MenuMobileStatus) => {
  switch (menuMobileStatus) {
    case 'OPENING':
      return css`
        animation: ${FadeInAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      `;
    case 'CLOSING':
      return css`
        animation: ${FadeOutAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      `;
    case 'OPENED':
      return css`
        display: flex;
      `;
    case 'CLOSED':
      return css`
        display: NONE;
      `;
  }
};

export default MenuComponent;
