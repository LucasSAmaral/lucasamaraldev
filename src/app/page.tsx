import Image from "next/image";
import Photo from "../assets/selfie.jpg";
import { Subtitle, Title } from "./styles/styles";
// import { useModal } from "./components/modal/Modal.context";

export default function Home() {
  // const { openModal } = useModal();
  return (
    <>
      <Image
        src={Photo}
        alt="Minha selfie no pé da torre Eifell"
        priority={true}
      />
      <Title>Lucas Amaral</Title>
      <Subtitle>Desenvolvedor Front-End</Subtitle>
    </>
  );
}
