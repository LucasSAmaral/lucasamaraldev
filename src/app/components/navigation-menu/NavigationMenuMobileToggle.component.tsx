import React, { useContext } from 'react';
import styled from 'styled-components';
import { breakpoints } from '@/app/styles/theme';
import { MenuStatus } from './NavigationMenu.component';
import { NavigationMenuContext } from './NavigationMenu.context';

const shouldCheckNavigationMenuMobile = (navigationMenuMobileStatus: MenuStatus) =>
  navigationMenuMobileStatus === 'OPENED' || navigationMenuMobileStatus === 'OPENING';

const NavigationMenuMobileToggle: React.FC = () => {
  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  return (
    <Label htmlFor="menu-mobile">
      <Input
        type="checkbox"
        id="menu-mobile"
        defaultChecked={shouldCheckNavigationMenuMobile(navigationMenuMobileStatus)}
        onClick={() => {
          switch (navigationMenuMobileStatus) {
            case 'CLOSED':
              return updateNavigationMenuMobileStatus('OPENING');
            case 'OPENED':
              return updateNavigationMenuMobileStatus('CLOSING');
            default:
              return;
          }
        }}
      />
      <FirstLine />
      <SecondLine />
      <ThirdLine />
    </Label>
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
  top: 10px;
`;

const SecondLine = styled(FirstLine)`
  opacity: 1;
  top: 19px;
`;

const ThirdLine = styled(FirstLine)`
  margin: 0;
  top: 28px;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Label = styled.label`
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  input[type='checkbox']:checked ~ ${FirstLine} {
    transform: rotate(-45deg);
    top: 19px;
  }

  input[type='checkbox']:checked ~ ${SecondLine} {
    opacity: 0;
    top: 19px;
  }

  input[type='checkbox']:checked ~ ${ThirdLine} {
    transform: rotate(45deg);
    top: 19px;
  }

  @media (max-width: ${breakpoints.navigationMenu}px) {
    display: block;
  }
`;

export default NavigationMenuMobileToggle;
