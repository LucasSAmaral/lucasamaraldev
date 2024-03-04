import { TransitionStateType } from '@/app/template';
import { Inter } from 'next/font/google';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { ActualRoute, MenuState } from './Menu.context';
import { useEffect } from 'react';
import { MenuMobileStatus } from './Menu.component';

const inter = Inter({ subsets: ['latin'] });

const exitingObject = { exiting: true };

type MenuOptionComponentProps = {
  children: React.ReactNode;
  nextRoute: string;
  updateMenuState: (value: React.SetStateAction<MenuState>) => void;
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
  updateMenuMobileStatus: React.Dispatch<React.SetStateAction<MenuMobileStatus>>;
};

const MenuOptionComponent: React.FC<MenuOptionComponentProps> = ({
  children,
  nextRoute,
  updateMenuState,
  setTransitionState,
  updateMenuMobileStatus,
}) => {
  const actualRoute = usePathname();

  useEffect(() => {
    updateMenuState({ actualRouteState: actualRoute as ActualRoute });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuOption
      className={inter.className}
      onClick={() => {
        if (actualRoute != nextRoute) {
          setTransitionState({ ...exitingObject, nextRoute });
        }
        if (window.innerWidth <= 672) {
          updateMenuMobileStatus('CLOSING');
        }
      }}
    >
      {children}
    </MenuOption>
  );
};

const MenuOption = styled.button`
  text-decoration: none;
  color: #fffffe;
  font-size: 16px;
  font-weight: 600;
  transition: 200ms;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    scale: 1.02;
  }
  &:active {
    scale: 0.98;
  }
`;

export default MenuOptionComponent;
