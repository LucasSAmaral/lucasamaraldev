import styled from 'styled-components';
import Image from 'next/image';
import BrFlag from '../../../assets/br-flag.svg';
import UsaFlag from '../../../assets/usa-flag.svg';
import { useContext } from 'react';
import { LanguageOptionsContext } from './LanguageOptions.context';

const LanguageOptionsComponent = () => {
  const { languageOptionsState, updateLanguageOptionsState } = useContext(LanguageOptionsContext);

  const { selectedLanguage } = languageOptionsState;

  return (
    <LanguageOptionsWrapper>
      Selecione o idioma:
      <LanguageButton
        $shouldSelectImage={selectedLanguage === 'pt-br'}
        onClick={() => updateLanguageOptionsState({ selectedLanguage: 'pt-br' })}
      >
        <Image
          src={BrFlag}
          width={20}
          alt="ícone da Bandeira do Brasil"
          title="Bandeira do Brasil"
        />
      </LanguageButton>
      <LanguageButton
        $shouldSelectImage={selectedLanguage === 'en-us'}
        onClick={() => updateLanguageOptionsState({ selectedLanguage: 'en-us' })}
      >
        <Image
          src={UsaFlag}
          width={20}
          alt="ícone da Bandeira dos Estados Unidos"
          title="Bandeira dos Estados Unidos"
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
  }
`;

export default LanguageOptionsComponent;
