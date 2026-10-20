import { useContext } from 'react';
import styled from 'styled-components';
import { colors, radii } from '@/app/styles/theme';
import { LanguageOptionsContext } from './language-options/LanguageOptions.context';
import config from '../../../generated-config.json';

const { locale } = config;

export const MAIN_CONTENT_ID = 'conteudo';

// Link "Pular para o conteúdo": escondido até receber o foco do teclado (primeiro Tab da página).
const SkipLinkComponent: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  return (
    <SkipLink
      data-cy="skip-link"
      href={`#${MAIN_CONTENT_ID}`}
      onClick={event => {
        event.preventDefault();
        document.getElementById(MAIN_CONTENT_ID)?.focus();
      }}
    >
      {locale[selectedLanguage].header.skipToContent}
    </SkipLink>
  );
};

const SkipLink = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1100;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: ${radii.md};
  background-color: ${colors.accent};
  color: ${colors.onAccent};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
`;

export default SkipLinkComponent;
