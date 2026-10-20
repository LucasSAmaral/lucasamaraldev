import React, { useContext } from 'react';
import styled from 'styled-components';
import { breakpoints, colors, radii } from '@/app/styles/theme';
import { NavigationMenuContext } from './NavigationMenu.context';
import { LanguageOptionsContext } from '../language-options/LanguageOptions.context';
import config from '../../../../generated-config.json';

const { locale } = config;

export const NAVIGATION_MENU_ID = 'navigation-menu';

const NavigationMenuMobileToggle: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  const isOpen =
    navigationMenuMobileStatus === 'OPENED' || navigationMenuMobileStatus === 'OPENING';
  const headerLocale = locale[selectedLanguage].header;

  return (
    <ToggleButton
      type="button"
      data-cy="navigation-menu-toggle"
      aria-label={isOpen ? headerLocale.closeMenu : headerLocale.openMenu}
      aria-expanded={isOpen}
      aria-controls={NAVIGATION_MENU_ID}
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
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOpen ? (
          <>
            <line x1="6" x2="18" y1="6" y2="18" />
            <line x1="18" x2="6" y1="6" y2="18" />
          </>
        ) : (
          <>
            <line x1="4" x2="20" y1="7" y2="7" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="14" y1="17" y2="17" />
          </>
        )}
      </svg>
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${radii.md};
  background-color: transparent;
  color: ${colors.text};
  cursor: pointer;

  @media (max-width: ${breakpoints.navigationMenu}px) {
    display: flex;
  }
`;

export default NavigationMenuMobileToggle;
