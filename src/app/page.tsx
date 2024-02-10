import Image from 'next/image';
import Photo from '../assets/selfie.jpg';
import { Subtitle, Title } from './styles/styles';
import config from '../../generated-config.json';

const { locale } = config;

export default function Home() {
  const homeLocale = locale['pt-br'].home;

  return (
    <>
      <Image src={Photo} alt={homeLocale.alt} priority={true} />
      <Title>{homeLocale.name}</Title>
      <Subtitle>{homeLocale.profission}</Subtitle>
    </>
  );
}
