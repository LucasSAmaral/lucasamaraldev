import styled from 'styled-components';
import { Inter } from 'next/font/google';
import CONFIG from '../../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './LanguageOptions.context';
import { Menu, MenuTooltipStyle } from '../commons/styles';
import { NavigationMenuContext } from '../navigation-menu/NavigationMenu.context';

const inter = Inter({ subsets: ['latin'] });

const { locale } = CONFIG;

const LanguageOptionsComponent = () => {
  const {
    languageOptionsState: { selectedLanguage },
    languageMenuStatus,
    updateLanguageOptionsState,
    updateLanguageMenuStatus,
  } = useContext(LanguageOptionsContext);

  const { navigationMenuMobileStatus, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  const languageOptionsLocale = locale[selectedLanguage].languageOptions;

  return (
    <LanguageOptionsWrapper className={inter.className}>
      <LanguageButton
        className={inter.className}
        data-cy="language-button"
        onClick={() => {
          if (navigationMenuMobileStatus === 'OPENED') {
            updateNavigationMenuMobileStatus('CLOSING');
          }
          switch (languageMenuStatus) {
            case 'CLOSED':
              return updateLanguageMenuStatus('OPENING');
            case 'OPENED':
              return updateLanguageMenuStatus('CLOSING');
            default:
              return;
          }
        }}
      >
        {languageOptionsLocale.language}
        {languageOptionsLocale.selectedLanguage}
      </LanguageButton>
      <LanguageMenu
        $menuStatus={languageMenuStatus}
        onAnimationEnd={() => {
          switch (languageMenuStatus) {
            case 'OPENING':
              return updateLanguageMenuStatus('OPENED');
            case 'CLOSING':
              return updateLanguageMenuStatus('CLOSED');
            default:
              return;
          }
        }}
      >
        <LanguageOption
          className={inter.className}
          data-cy="pt"
          onClick={() => {
            updateLanguageOptionsState({ selectedLanguage: 'pt' });
            updateLanguageMenuStatus('CLOSING');
          }}
        >
          {languageOptionsLocale.portugueseOption}
        </LanguageOption>
        <LanguageOption
          className={inter.className}
          data-cy="en"
          onClick={() => {
            updateLanguageOptionsState({ selectedLanguage: 'en' });
            updateLanguageMenuStatus('CLOSING');
          }}
        >
          {languageOptionsLocale.englishOption}
        </LanguageOption>
      </LanguageMenu>
    </LanguageOptionsWrapper>
  );
};

const LanguageOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  gap: 5px;
  padding: 10px 0;
  border-top: 1px solid #fffffe;
  border-bottom: 1px solid #fffffe;

  @media (max-width: 672px) {
    align-items: center;
  }
`;

const LanguageButton = styled.button`
  cursor: pointer;
  padding: 10px 25px;
  border: 1px solid #fffffe;
  border-radius: 5px;
  background-color: #363b3f;
  font-size: 16px;
  color: #fffffe;
  font-weight: 600;
`;

const LanguageMenu = styled(Menu)`
  top: 70px;
  ${({ $menuStatus }) => MenuTooltipStyle($menuStatus)};
`;

const LanguageOption = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
  color: #fffffe;
  font-weight: 600;
`;

export default LanguageOptionsComponent;
