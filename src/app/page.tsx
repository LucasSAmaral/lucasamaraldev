import Image from 'next/image';
import Photo from '../assets/selfie.jpg';
import { Subtitle, Title } from './styles/styles';

export default function Home() {
  return (
    <>
      <Image src={Photo} alt="Minha selfie no pé da torre Eifell" priority={true} />
      <Title>Lucas Amaral</Title>
      <Subtitle>Desenvolvedor Front-End</Subtitle>
    </>
  );
}
