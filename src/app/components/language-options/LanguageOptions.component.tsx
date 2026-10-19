import styled from 'styled-components';
import CONFIG from '../../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext, SelectedLanguage } from './LanguageOptions.context';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';

const { locale } = CONFIG;

const languageList: SelectedLanguage[] = ['pt', 'en'];

const LanguageOptionsComponent = () => {
  const {
    languageOptionsState: { selectedLanguage },
    updateLanguageOptionsState,
  } = useContext(LanguageOptionsContext);

  return (
    <LanguageOptionsWrapper
      role="group"
      aria-label={locale[selectedLanguage].languageOptions.groupLabel}
      data-cy="language-button"
    >
      {languageList.map(language => (
        <LanguageOption
          key={language}
          type="button"
          data-cy={language}
          lang={language === 'en' ? 'en' : 'pt-BR'}
          aria-label={`${locale.commonLocale.languageOptions[language]} (${language.toUpperCase()})`}
          aria-pressed={selectedLanguage === language}
          onClick={() => updateLanguageOptionsState({ selectedLanguage: language })}
        >
          {language.toUpperCase()}
        </LanguageOption>
      ))}
    </LanguageOptionsWrapper>
  );
};

const LanguageOptionsWrapper = styled.div`
  display: flex;
  padding: 3px;
  border: 1px solid ${colors.border};
  border-radius: ${radii.pill};
`;

const LanguageOption = styled.button`
  min-height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: ${radii.pill};
  background-color: transparent;
  color: ${colors.textMuted};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    color ${transitions.fast},
    background-color ${transitions.fast};

  &:hover {
    color: ${colors.text};
  }

  &[aria-pressed='true'] {
    background-color: ${colors.surfaceRaised};
    color: ${colors.text};
  }

  @media (max-width: ${breakpoints.navigationMenu}px) {
    min-height: 36px;
  }
`;

export default LanguageOptionsComponent;
