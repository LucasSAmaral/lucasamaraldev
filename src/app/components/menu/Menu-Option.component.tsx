import { TransitionStateType } from "@/app/template";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const exitingObject = { exiting: true };

type MenuOptionComponentProps = {
  children: React.ReactNode;
  nextRoute: string;
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const MenuOptionComponent: React.FC<MenuOptionComponentProps> = ({
  children,
  nextRoute,
  setTransitionState,
}) => {
  const actualRoute = usePathname();
  return (
    <MenuOption
      className={inter.className}
      $isActualRoute={actualRoute === nextRoute}
      onClick={() => {
        if (actualRoute != nextRoute) {
          setTransitionState({ ...exitingObject, nextRoute });
        }
      }}
    >
      {children}
    </MenuOption>
  );
};

const MenuOption = styled.button.attrs<{ $isActualRoute: boolean }>(
  (props) => ({ $isActualRoute: props.$isActualRoute })
)`
  text-decoration: none;
  color: #fffffe;
  font-size: 16px;
  font-weight: 600;
  transition: 200ms;
  background-color: transparent;
  border: none;
  border-top: 1px solid transparent;
  border-bottom: ${({ $isActualRoute }) =>
    $isActualRoute ? "1px solid #fffffe" : "1px solid transparent"};
  cursor: pointer;

  &:hover {
    scale: 1.02;
  }
  &:active {
    scale: 0.98;
  }
`;

export default MenuOptionComponent;
