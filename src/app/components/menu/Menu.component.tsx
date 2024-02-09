import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { TransitionStateType } from '../../template';
import MenuOption from './Menu-Option.component';
import { ActualRoute, MenuContext } from './Menu.context';
import config from '../../../../generated-config.json';

type MenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const MenuComponent: React.FC<MenuComponentProps> = ({ setTransitionState }) => {
  const {
    menuState: { actualRouteState },
    updateMenuState,
  } = useContext(MenuContext);

  return (
    <MenuWrapper>
      <Menu>
        {config.menu.menuOptionList.map((menuOption, index) => (
          <MenuOption
            key={`${menuOption.optionName['pt-br']}-${index}`}
            updateMenuState={updateMenuState}
            setTransitionState={setTransitionState}
            nextRoute={menuOption.nextRoute}
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
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  padding-bottom: 0;
`;

const ActiveBarWrapper = styled.div`
  height: 2px;
  width: 100%;
  max-width: 633px;
  position: relative;
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
    case '/technical-skills':
      return css`
        width: 164.45px;
        transform: translateX(173px);
      `;

    case '/work-experience':
      return css`
        width: 185.33px;
        transform: translateX(361px);
      `;

    case '/contact':
      return css`
        width: 62.38px;
        transform: translateX(571px);
      `;
  }
};

export default MenuComponent;
