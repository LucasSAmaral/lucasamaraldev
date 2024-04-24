import styled from 'styled-components';
import Image from 'next/image';
import BrFlag from '../../../assets/br-flag.svg';
import UsaFlag from '../../../assets/usa-flag.svg';
import CONFIG from '../../../../generated-config.json';
import { useContext } from 'react';
import { LanguageOptionsContext } from './LanguageOptions.context';

const { locale } = CONFIG;

const LanguageOptionsComponent = () => {
  const { languageOptionsState, updateLanguageOptionsState } = useContext(LanguageOptionsContext);

  const { selectedLanguage } = languageOptionsState;

  const languageOptionsLocale = locale[selectedLanguage].languageOptions;

  return (
    <LanguageOptionsWrapper>
      {languageOptionsLocale.selectLanguage}
      <LanguageButton
        data-cy="pt-br"
        $shouldSelectImage={selectedLanguage === 'pt-br'}
        onClick={() => updateLanguageOptionsState({ selectedLanguage: 'pt-br' })}
      >
        <Image
          src={BrFlag}
          width={20}
          alt={languageOptionsLocale.brFlag.alt}
          title={languageOptionsLocale.brFlag.title}
        />
      </LanguageButton>
      <LanguageButton
        data-cy="en-us"
        $shouldSelectImage={selectedLanguage === 'en-us'}
        onClick={() => updateLanguageOptionsState({ selectedLanguage: 'en-us' })}
      >
        <Image
          src={UsaFlag}
          width={20}
          alt={languageOptionsLocale.usaFlag.alt}
          title={languageOptionsLocale.usaFlag.title}
        />
      </LanguageButton>
    </LanguageOptionsWrapper>
  );
};

const LanguageOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 10px 0;
  border-top: 1px solid #fffffe;
  border-bottom: 1px solid #fffffe;

  @media (max-width: 672px) {
    align-items: center;
  }
`;

const LanguageButton = styled.button.attrs<{ $shouldSelectImage: boolean }>(props => ({
  $shouldSelectImage: props.$shouldSelectImage,
}))`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    border: ${({ $shouldSelectImage }) => ($shouldSelectImage ? '1px solid #fffffe' : 'none')};

    @media (max-width: 672px) {
      width: 48px;
      height: 35px;
    }
  }
`;

export default LanguageOptionsComponent;
