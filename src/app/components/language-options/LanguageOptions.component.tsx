import styled from 'styled-components';
import { Inter } from 'next/font/google';
import CONFIG from '../../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './LanguageOptions.context';
import { MenuTooltipStyle } from '../commons/styles';
import { MenuStatus, UpdateMenuStatus } from '@/app/template';

const inter = Inter({ subsets: ['latin'] });

const { locale } = CONFIG;

type LanguageOptionComponentProps = {
  menuMobileStatus: MenuStatus;
  languageMenuStatus: MenuStatus;
  updateMenuMobileStatus: UpdateMenuStatus;
  updateLanguageMenuStatus: UpdateMenuStatus;
};

const LanguageOptionsComponent: React.FC<LanguageOptionComponentProps> = ({
  menuMobileStatus,
  languageMenuStatus,
  updateMenuMobileStatus,
  updateLanguageMenuStatus,
}) => {
  const { languageOptionsState, updateLanguageOptionsState } = useContext(LanguageOptionsContext);

  const { selectedLanguage } = languageOptionsState;

  const languageOptionsLocale = locale[selectedLanguage].languageOptions;

  return (
    <LanguageOptionsWrapper className={inter.className}>
      <LanguageButton
        className={inter.className}
        data-cy="language-button"
        onClick={() => {
          if (menuMobileStatus === 'OPENED') {
            updateMenuMobileStatus('CLOSING');
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

const LanguageMenu = styled.menu.attrs<{ $menuStatus: MenuStatus }>(props => ({
  $menuStatus: props.$menuStatus,
}))`
  top: 70px;
  padding: 20px;
  ${({ $menuStatus }) => MenuTooltipStyle($menuStatus)};
  gap: 24px;
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
