import styled from "styled-components";
import { TransitionStateType } from "../../template";
import MenuOption from "./Menu-Option.component";

type MenuComponentProps = {
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const menuOptionList = [
  { nextRoute: "/", optionName: "Início" },
  { nextRoute: "/about-me", optionName: "Sobre Mim" },
  { nextRoute: "/technical-skills", optionName: "Habilidades Técnicas" },
  { nextRoute: "/work-experience", optionName: "Experiência Profissional" },
  { nextRoute: "/contact", optionName: "Contato" },
];

const MenuComponent: React.FC<MenuComponentProps> = ({
  setTransitionState,
}) => {
  return (
    <Menu>
      {menuOptionList.map((menuOption, index) => (
        <MenuOption
          key={`${menuOption.optionName}-${index}`}
          setTransitionState={setTransitionState}
          nextRoute={menuOption.nextRoute}
        >
          {menuOption.optionName}
        </MenuOption>
      ))}
    </Menu>
  );
};

const Menu = styled.menu`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  background-color: #363b3f;
`;

export default MenuComponent;
