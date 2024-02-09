import Image from 'next/image';
import Photo from '../assets/selfie.jpg';
import { Subtitle, Title } from './styles/styles';
import config from '../../generated-config.json';

export default function Home() {
  const homeLocale = config.locale['pt-br'].home;

  return (
    <>
      <Image src={Photo} alt={homeLocale.alt} priority={true} />
      <Title>{homeLocale.name}</Title>
      <Subtitle>{homeLocale.profission}</Subtitle>
    </>
  );
}
