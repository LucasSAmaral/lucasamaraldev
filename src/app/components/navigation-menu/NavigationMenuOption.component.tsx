import { TransitionStateType } from '@/app/template';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { ActualRoute, NavigationMenuContext } from './NavigationMenu.context';
import { useContext, useEffect } from 'react';
import { colors } from '@/app/styles/theme';

const exitingObject = { exiting: true };

type NavigationMenuOptionComponentProps = {
  children: React.ReactNode;
  nextRoute: string;
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const NavigationMenuOptionComponent: React.FC<NavigationMenuOptionComponentProps> = ({
  children,
  nextRoute,
  setTransitionState,
}) => {
  const actualRoute = usePathname();

  const { updateNavigationMenuState, updateNavigationMenuMobileStatus } =
    useContext(NavigationMenuContext);

  const nextRouteDataCy =
    nextRoute.split('/')[1] === '' ? 'home-option' : `${nextRoute.split('/')[1]}-option`;

  useEffect(() => {
    updateNavigationMenuState({ actualRouteState: actualRoute as ActualRoute });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationMenuOption
      data-cy={nextRouteDataCy}
      onClick={() => {
        if (actualRoute != nextRoute) {
          setTransitionState({ ...exitingObject, nextRoute });
        }
        if (window.innerWidth <= 672) {
          updateNavigationMenuMobileStatus('CLOSING');
        }
      }}
    >
      {children}
    </NavigationMenuOption>
  );
};

const NavigationMenuOption = styled.button`
  text-decoration: none;
  color: ${colors.text};
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

export default NavigationMenuOptionComponent;
