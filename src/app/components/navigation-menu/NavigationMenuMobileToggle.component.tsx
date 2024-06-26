import React, { useContext } from 'react';
import styled from 'styled-components';
import { MenuStatus } from './NavigationMenu.component';
import { LanguageOptionsContext } from '../language-options/LanguageOptions.context';
import { NavigationMenuContext } from './NavigationMenu.context';

const shouldCheckNavigationMenuMobile = (navigationMenuMobileStatus: MenuStatus) =>
  navigationMenuMobileStatus === 'OPENED' || navigationMenuMobileStatus === 'OPENING';

const NavigationMenuMobileToggle: React.FC = () => {
  const { languageMenuStatus, updateLanguageMenuStatus } = useContext(LanguageOptionsContext);

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  return (
    <Label htmlFor="menu-mobile">
      <Input
        type="checkbox"
        id="menu-mobile"
        checked={shouldCheckNavigationMenuMobile(navigationMenuMobileStatus)}
        onClick={() => {
          if (languageMenuStatus === 'OPENED') {
            updateLanguageMenuStatus('CLOSING');
          }
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

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Label = styled.label`
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

export default NavigationMenuMobileToggle;
