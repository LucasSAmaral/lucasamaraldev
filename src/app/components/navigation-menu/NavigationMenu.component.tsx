import { Dispatch, SetStateAction, useContext } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '@/app/styles/theme';
import { TransitionStateType } from '../../template';
import NavigationMenuOption from './NavigationMenuOption.component';
import { NavigationMenuContext } from './NavigationMenu.context';
import config from '../../../../generated-config.json';
import { LanguageOptionsContext } from '../language-options/LanguageOptions.context';
import { Menu, MenuTooltipStyle } from '../commons/styles';

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
    languageMenuStatus,
    updateLanguageMenuStatus,
  } = useContext(LanguageOptionsContext);

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  return (
    <NavigationMenuWrapper>
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
            setTransitionState={setTransitionState}
          >
            {navigationMenuOption.optionName[selectedLanguage]}
          </NavigationMenuOption>
        ))}
      </NavigationMenu>
    </NavigationMenuWrapper>
  );
};

const NavigationMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigationMenu = styled(Menu)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  padding: 0;

  @media (max-width: ${breakpoints.navigationMenu}px) {
    top: calc(100% + 12px);
    right: 20px;
    padding: 20px;
    ${({ $menuStatus }) => MenuTooltipStyle($menuStatus)}
  }
`;

export default NavigationMenuComponent;
