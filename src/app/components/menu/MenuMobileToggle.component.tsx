import { MenuStatus } from '../hooks/menu.hook';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const shouldCheckMenuMobile = (menuMobileStatus: MenuStatus) =>
  menuMobileStatus === 'OPENED' || menuMobileStatus === 'OPENING';

const MenuMobileToggle: React.FC<{
  menuMobileStatus: MenuStatus;
  updateMenuMobileStatus: Dispatch<SetStateAction<MenuStatus>>;
}> = ({ menuMobileStatus, updateMenuMobileStatus }) => {
  return (
    <MenuMobileLabel htmlFor="menu-mobile">
      <MenuMobileCheckbox
        type="checkbox"
        id="menu-mobile"
        checked={shouldCheckMenuMobile(menuMobileStatus)}
        onClick={() => {
          switch (menuMobileStatus) {
            case 'CLOSED':
              return updateMenuMobileStatus('OPENING');
            case 'OPENED':
              return updateMenuMobileStatus('CLOSING');
            default:
              return;
          }
        }}
      />
      <FirstLine />
      <SecondLine />
      <ThirdLine />
    </MenuMobileLabel>
  );
};

const FirstLine = styled.div`
  width: 30px;
  height: 5px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 5px;
  transition: 200ms;
  transform: rotate(0deg);
  position: absolute;
  right: calc(50% - 15px);
  top: -12px;
`;

const SecondLine = styled(FirstLine)`
  opacity: 1;
  top: -3px;
`;

const ThirdLine = styled(FirstLine)`
  margin: 0;
  top: 6px;
`;

const MenuMobileCheckbox = styled.input`
  opacity: 0;
  position: absolute;
`;

const MenuMobileLabel = styled.label`
  display: none;
  position: relative;
  input[type='checkbox']:checked ~ ${FirstLine} {
    transform: rotate(-45deg);
    top: 0;
  }

  input[type='checkbox']:checked ~ ${SecondLine} {
    opacity: 0;
    top: 0;
  }

  input[type='checkbox']:checked ~ ${ThirdLine} {
    transform: rotate(45deg);
    top: 0;
  }

  @media (max-width: 672px) {
    display: block;
  }
`;

export default MenuMobileToggle;
